import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("show", entry.isIntersecting);
      });
    });
    const hiddenElements = document.querySelectorAll(".hide");
    hiddenElements.forEach((element) => {
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
};
export default useScrollAnimation;
