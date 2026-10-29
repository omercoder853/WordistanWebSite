import { useTranslation } from "react-i18next";
import "./AboutHero.css";

export default function AboutHero() {
  const { t } = useTranslation();

  const stats = [
    {
      key: "dicts",
      label: t("about_stat_dicts"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      ),
    },
    {
      key: "games",
      label: t("about_stat_games"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="6" y1="12" x2="10" y2="12" />
          <line x1="8" y1="10" x2="8" y2="14" />
          <line x1="15" y1="13" x2="15.01" y2="13" strokeWidth="3" />
          <line x1="18" y1="11" x2="18.01" y2="11" strokeWidth="3" />
          <rect x="2" y="6" width="20" height="12" rx="2" />
        </svg>
      ),
    },
    {
      key: "offline",
      label: t("about_stat_offline"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
        </svg>
      ),
    },
    {
      key: "free",
      label: t("about_stat_free"),
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <section className="about-hero" aria-label={t("about_hero_badge")}>
      <div className="about-hero__container">
        {/* Badge Pill */}
        <span className="about-hero__badge">
          <span className="about-hero__badge-dot" />
          {t("about_hero_badge")}
        </span>

        {/* Hero Title */}
        <h1 className="about-hero__title">
          {t("about_hero_title_1")}{" "}
          <span className="about-hero__highlight">
            {t("about_hero_title_highlight")}
          </span>
        </h1>

        {/* Hero Description */}
        <p className="about-hero__desc">
          {t("about_hero_desc")}
        </p>

        {/* Quick Features Row */}
        <div className="about-hero__stats" role="list">
          {stats.map((s) => (
            <div key={s.key} className="about-hero__stat-pill" role="listitem">
              <span className="about-hero__stat-icon" aria-hidden="true">
                {s.icon}
              </span>
              <span className="about-hero__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

