import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./MockupCarousel3D.css";

export default function MockupCarousel3D({
  items = [],
  autoPlay = true,
  autoPlayInterval = 4500,
  stageTitle = "",
}) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const count = items.length;

  const goToNext = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const goToPrev = useCallback(() => {
    if (count <= 1) return;
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Autoplay timer
  useEffect(() => {
    if (!autoPlay || isPaused || count <= 1) return;
    const timer = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, count, autoPlayInterval, goToNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;
    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrev();
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      goToPrev();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div
      className="c3d"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={stageTitle || "3D Mockup Gallery"}
    >
      {/* ── 3D Stage / Viewport ── */}
      <div className="c3d__stage">
        {items.map((item, index) => {
          let diff = index - activeIndex;
          if (diff > count / 2) diff -= count;
          if (diff < -count / 2) diff += count;

          const isActive = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;

          let stateClass = "c3d__card--hidden";
          if (isActive) stateClass = "c3d__card--active";
          else if (isLeft) stateClass = "c3d__card--left";
          else if (isRight) stateClass = "c3d__card--right";

          return (
            <div
              key={item.src}
              className={`c3d__card ${stateClass}`}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
              role="button"
              tabIndex={isActive ? 0 : -1}
              aria-label={`${item.alt || "Mockup"} (${index + 1}/${count})`}
              aria-current={isActive ? "true" : undefined}
            >
              <div className="c3d__card-inner">
                <img
                  src={item.src}
                  alt={item.alt || "Wordistan App Screen"}
                  className="c3d__img"
                  loading="lazy"
                  draggable={false}
                />
              </div>

              {item.caption && isActive && (
                <div className="c3d__caption" aria-hidden="true">
                  <span>{item.caption}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Prev / Next Navigation Arrows ── */}
      {count > 1 && (
        <div className="c3d__controls" aria-label="Carousel kontrolleri">
          <button
            type="button"
            className="c3d__btn c3d__btn--prev"
            onClick={goToPrev}
            aria-label={t("about_carousel_prev")}
            title={t("about_carousel_prev")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <button
            type="button"
            className="c3d__btn c3d__btn--next"
            onClick={goToNext}
            aria-label={t("about_carousel_next")}
            title={t("about_carousel_next")}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      {/* ── Dot Indicators ── */}
      {count > 1 && (
        <div className="c3d__dots" role="tablist" aria-label="Sayfa seçimi">
          {items.map((item, idx) => (
            <button
              key={item.src}
              type="button"
              className={`c3d__dot ${idx === activeIndex ? "c3d__dot--active" : ""}`}
              onClick={() => setActiveIndex(idx)}
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`${t("about_carousel_slide")} ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
