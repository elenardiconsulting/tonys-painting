export const Index = () => (
  <div style={{ whiteSpace: 'pre-wrap', padding: '20px' }}>
    {"'O site esta com tela branca. Dois problemas encontrados:\n\n1. Em src/main.tsx, remover completamente o bloco de registro do Service Worker:\n\n// Register Service Worker for PWA\n\nif (\\'serviceWorker\\' in navigator) {\n\n  window.addEventListener(\\'load\\', () => {\n\n    navigator.serviceWorker.register(\\'/sw.js\\')\n\n      .then(registration => {\n\n        console.log(\\'SW registered: \\', registration);\n\n      })\n\n      .catch(registrationError => {\n\n        console.log(\\'SW registration failed: \\', registrationError);\n\n      });\n\n  });\n\n}\n\n2. Verificar se o arquivo src/integrations/supabase/types.ts existe.\n\nSe nao existir, criar com este conteudo:\n\nexport type Database = any\n\n3. Garantir que o build passa e o site carrega normalmente.\n\nNao alterar mais nada.' (on element 'body' at '/src/routes/index.tsx:1')"}
  </div>
);
