import MockupCarousel3D from "../MockupCarousel3D/MockupCarousel3D";
import "./AboutSection.css";

export default function AboutSection({
  badge,
  titleLine1,
  titleHighlight,
  description,
  checklist = [],
  mockupItems = [],
  isReversed = false,
  badgeTone = "purple", // "purple" | "pink" | "magenta"
}) {
  return (
    <section className={`about-sec ${isReversed ? "about-sec--reversed" : ""}`}>
      <div className="about-sec__container">
        {/* ── Content Column ── */}
        <div className="about-sec__info">
          {badge && (
            <span className={`about-sec__badge about-sec__badge--${badgeTone}`}>
              {badge}
            </span>
          )}

          <h2 className="about-sec__title">
            {titleLine1}{" "}
            {titleHighlight && (
              <span className="about-sec__highlight">{titleHighlight}</span>
            )}
          </h2>

          {description && <p className="about-sec__desc">{description}</p>}

          {checklist.length > 0 && (
            <ul className="about-sec__list" role="list">
              {checklist.map((item, idx) => (
                <li key={idx} className="about-sec__item">
                  <span className="about-sec__check-icon" aria-hidden="true">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="about-sec__item-text">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── 3D Carousel Column ── */}
        <div className="about-sec__carousel-col">
          <MockupCarousel3D
            items={mockupItems}
            stageTitle={`${titleLine1} ${titleHighlight || ""}`}
          />
        </div>
      </div>
    </section>
  );
}

