import { useEffect } from "react";

const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "demo") {
            document
              .querySelector(".demo-text")
              .classList.add("typing-animation");
          }
          entry.target.classList.add("show");
        }
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
