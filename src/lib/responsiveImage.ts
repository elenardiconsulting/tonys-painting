import founder from "@/assets/otoniel-santos-founder.png";
import tonysLogo from "@/assets/tonys-logo.png";
import elenardiLogo from "@/assets/elenardi-midia-logo.png";
import partnersLogo from "@/assets/partners-logos.png";
import { responsiveMap } from "./responsiveMap";

export interface ResponsiveImageAttributes {
  src: string;
  srcSet?: string;
  width?: number;
  height?: number;
}

// Exact imported URLs work in development and with Vite's production hashes.
const assetNames: Readonly<Record<string, string>> = {
  [founder]: "otoniel-santos-founder",
  [tonysLogo]: "tonys-logo",
  [elenardiLogo]: "elenardi-midia-logo",
  [partnersLogo]: "partners-logos",
};

function attributes(src: string): ResponsiveImageAttributes {
  const name = assetNames[src] ?? /^\/images\/([^/?]+)\.(?:jpg|jpeg|png|webp)(?:\?.*)?$/.exec(src)?.[1];
  const metadata = name ? responsiveMap[name] : undefined;
  if (!name || !metadata) return { src };
  const widths = metadata.widths;
  return {
    src,
    ...(widths.length > 0
      ? { srcSet: widths.map((width) => `/images/r/${name}-${width}.webp ${width}w`).join(", ") }
      : {}),
    width: metadata.width,
    height: metadata.height,
  };
}

export function responsive(src: string): ResponsiveImageAttributes {
  return attributes(src);
}

// Fixed crop containers and the lightbox retain their existing dimensions.
export function responsiveSource(src: string): Pick<ResponsiveImageAttributes, "src" | "srcSet"> {
  const { width: _width, height: _height, ...source } = attributes(src);
  return source;
}