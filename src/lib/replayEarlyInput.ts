// Pré-renderização + hidratação: se o visitante digitar num formulário antes do JavaScript
// terminar de carregar, o texto fica na tela mas o React ainda não "sabe" dele (o estado continua vazio).
// Esta função guarda o que foi digitado e, assim que o React assume a página, repassa o texto
// para o formulário como se a pessoa tivesse acabado de digitar.

type Field = HTMLInputElement | HTMLTextAreaElement;

const isReactReady = (el: Element) => Object.keys(el).some((k) => k.startsWith("__reactProps"));

export function captureEarlyInput(container: HTMLElement) {
  const typed: { el: Field; value: string }[] = [];
  container.querySelectorAll<Field>("input, textarea").forEach((el) => {
    const type = (el as HTMLInputElement).type;
    if (type === "checkbox" || type === "radio" || type === "hidden" || type === "file") return;
    if (el.value && el.value !== el.defaultValue) typed.push({ el, value: el.value });
  });
  return typed;
}

export function replayEarlyInput(typed: { el: Field; value: string }[]) {
  if (!typed.length) return;
  let tries = 0;
  const tick = () => {
    const pending = typed.filter(({ el }) => el.isConnected && !isReactReady(el));
    if (pending.length && tries++ < 100) {
      setTimeout(tick, 50);
      return;
    }
    for (const { el, value } of typed) {
      if (!el.isConnected) continue;
      const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
      // Zera o "rastreador" interno do React para ele enxergar a mudança e disparar o onChange.
      (el as unknown as { _valueTracker?: { setValue: (v: string) => void } })._valueTracker?.setValue("");
      setter?.call(el, value);
      el.dispatchEvent(new Event("input", { bubbles: true }));
    }
  };
  setTimeout(tick, 0);
}
