import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AboutCTA.css";

export default function AboutCTA() {
  const { t } = useTranslation();

  return (
    <section className="about-cta" aria-label={t("about_cta_title")}>
      <div className="about-cta__container">
        <div className="about-cta__card">
          {/* Ambient Inner Glow */}
          <div className="about-cta__glow" aria-hidden="true" />

          <span className="about-cta__badge">{t("about_cta_badge")}</span>

          <h2 className="about-cta__title">{t("about_cta_title")}</h2>

          <p className="about-cta__desc">{t("about_cta_desc")}</p>

          <div className="about-cta__actions">
            <Link to="#" className="about-cta__btn-primary">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3.609 1.814L13.793 12 3.61 22.186a2.036 2.036 0 0 1-.22-.924V2.738c0-.34.08-.655.22-.924zM15.207 13.414l2.586 2.586-11.45 6.44 8.864-9.026zM15.207 10.586L6.343 1.56l11.45 6.44-2.586 2.586zm1.414 1.414l3.14-1.767a1.5 1.5 0 0 1 0 2.534l-3.14 1.767V12z" />
              </svg>
              <span>{t("about_cta_btn_primary")}</span>
            </Link>

            <Link to="/contact" className="about-cta__btn-secondary">
              <span>{t("about_cta_btn_secondary")}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

