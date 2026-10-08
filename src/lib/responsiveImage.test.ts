import { describe, expect, it } from "vitest";
import tonysLogo from "@/assets/tonys-logo.png";
import { responsive, responsiveSource } from "./responsiveImage";
import { responsiveMap } from "./responsiveMap";

describe("responsive images", () => {
  it("preserves unknown and external source URLs without adding attributes", () => {
    for (const src of ["/__l5e/assets-v1/example/photo.jpg", "https://example.com/images/project-01.jpg", "/unknown.jpg"]) {
      expect(responsive(src)).toEqual({ src });
    }
  });
  it("preserves original fallback and uses only generated widths", () => {
    const src = "/images/project-07.jpg";
    const metadata = responsiveMap["project-07"];
    expect(responsive(src)).toEqual({
      src,
      width: metadata.width,
      height: metadata.height,
      srcSet: metadata.widths.map((w) => `/images/r/project-07-${w}.webp ${w}w`).join(", "),
    });
  });
  it("recognizes imported logos even when filenames are hashed", () => {
    expect(responsive(tonysLogo).src).toBe(tonysLogo);
    expect(responsiveSource(tonysLogo).srcSet).toContain("/images/r/tonys-logo-240.webp 240w");
    expect(responsive(tonysLogo).srcSet).toBeUndefined();
  });
  it("does not add intrinsic attributes to fixed crops or lightboxes", () => {
    const source = responsiveSource("/images/project-01.jpg");
    expect(source).not.toHaveProperty("width");
    expect(source).not.toHaveProperty("height");
    expect(source.srcSet).toBeDefined();
  });
  it("lists no equal-width or upscaled variants", () => {
    for (const metadata of Object.values(responsiveMap)) {
      expect(metadata.widths.every((width) => width < metadata.width)).toBe(true);
    }
  });
});