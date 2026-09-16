import { useEffect, useState } from "react";

/**
 * Returns the masonry column count based on viewport width.
 * 1 column below 768px, 2 from 768px, 3 from 1024px.
 */
const getCount = (): number => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
};

export const useColumnCount = (): number => {
  const [count, setCount] = useState<number>(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
};

export default useColumnCount;
