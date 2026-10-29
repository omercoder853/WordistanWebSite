import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./ScrollToTopButton.css";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 300);

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "instant" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      className="scroll-to-top"
      type="button"
      onClick={scrollToTop}
      aria-label={t("back_to_top")}
      title={t("back_to_top")}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
    </button>
  );
}
