import { useEffect } from "react";

export const useIntersectionObserver = (
  elementRef: React.RefObject<Element>,
  callback: IntersectionObserverCallback,
  options: IntersectionObserverInit = { threshold: 0 }
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const element = elementRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [elementRef, callback, options]);
};
