import "./Hero.css";
import { useTranslation } from "react-i18next";
import mockupHero from "../../../assets/mockups/mockup_hero.png";
import { useNavigate } from "react-router-dom";

function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const goToAbout = ()=>{
    navigate("/about");
  }

  return (
    <section className="hero" id="hero">
      {/* Decorative SVG squiggles */}
      <svg
        className="hero__squiggle hero__squiggle--top"
        viewBox="0 0 120 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 50 C 20 10, 40 10, 50 40 S 80 70, 90 30 S 110 10, 120 20"
          stroke="#E91E8C"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </svg>

      <svg
        className="hero__squiggle hero__squiggle--right"
        viewBox="0 0 80 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 90 C 20 60, 50 80, 40 50 S 60 10, 70 30"
          stroke="#E91E8C"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.4"
        />
      </svg>

      <svg
        className="hero__squiggle hero__squiggle--bottom"
        viewBox="0 0 100 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M5 25 C 15 5, 30 45, 45 20 S 70 5, 85 25 S 95 40, 100 30"
          stroke="#C67AE8"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.35"
        />
      </svg>

      {/* Main content grid */}
      <div className="hero__container">
        {/* Left column — text content */}
        <div className="hero__content">
          <span className="hero__label">{t("hero_label")}</span>

          <h1 className="hero__title">
            {t("hero_title_line1")}
            <br />
            {t("hero_title_line2")}
            <span className="hero__title-highlight">
              {t("hero_title_highlight")}
            </span>
          </h1>

          <p className="hero__desc">{t("hero_description")}</p>

          <div className="hero__cta-row">
            <a href="#" className="hero__btn hero__btn--primary" id="hero-cta-download">
              {/* Google Play icon */}
              <svg
                className="hero__btn-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zM17.445 8.28l2.86 1.655a1 1 0 010 1.73l-2.86 1.656L14.91 12l2.536-3.72zM5.864 3.471l10.937 6.333-2.302 2.302-8.635-8.635z" />
              </svg>
              <div className="hero__btn-text">
                <span className="hero__btn-sub">{t("hero_cta_primary_sub")}</span>
                <span className="hero__btn-main">{t("hero_cta_primary")}</span>
              </div>
            </a>

            <button type="button" onClick={goToAbout} className="hero__btn hero__btn--secondary" id="hero-cta-explore">
              <svg
                className="hero__btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="5" y="2" width="14" height="20" rx="3" />
                <line x1="12" y1="18" x2="12" y2="18.01" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{t("hero_cta_secondary")}</span>
            </button>
          </div>

          <div className="hero__features">
            <div className="hero__feature">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2l2.09 6.26L20.18 9l-4.91 4.09L16.54 20 12 16.27 7.46 20l1.27-6.91L3.82 9l6.09-.74L12 2z"
                  fill="#F5A623"
                />
              </svg>
              <span>{t("hero_feature_1")}</span>
            </div>
            <div className="hero__feature">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M21 6H3a1 1 0 00-1 1v10a1 1 0 001 1h18a1 1 0 001-1V7a1 1 0 00-1-1zM7 15a3 3 0 110-6 3 3 0 010 6zm10 0a3 3 0 110-6 3 3 0 010 6z"
                  fill="#E91E8C"
                />
              </svg>
              <span>{t("hero_feature_2")}</span>
            </div>
            <div className="hero__feature">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 3v18h18"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 17l4-6 4 4 6-8"
                  stroke="#7C3AED"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{t("hero_feature_3")}</span>
            </div>
          </div>
        </div>

        {/* Right column — phone mockup visual */}
        <div className="hero__visual">
          <div className="hero__circle" aria-hidden="true"></div>
          <img
            src={mockupHero}
            alt="Wordistan App Screenshots"
            className="hero__phones"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;