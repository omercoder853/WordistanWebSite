import { NavLink, Outlet, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Legal.css";

export default function LegalLayout() {
  const { t } = useTranslation();

  const legalNavItems = [
    {
      to: "/legal/kvkk",
      label: t("legal_nav_kvkk"),
      desc: t("legal_nav_kvkk_desc"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
    },
    {
      to: "/legal/privacy-policy",
      label: t("legal_nav_privacy"),
      desc: t("legal_nav_privacy_desc"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
    {
      to: "/legal/terms-of-service",
      label: t("legal_nav_terms"),
      desc: t("legal_nav_terms_desc"),
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
  ];

  return (
    <main className="legal-page">
      {/* ── Top Header Hero Banner ── */}
      <header className="legal-hero">
        <div className="legal-hero__container">
          <span className="legal-hero__badge">{t("legal_badge")}</span>
          <h1 className="legal-hero__title">{t("legal_header_title")}</h1>
          <p className="legal-hero__desc">{t("legal_header_desc")}</p>
        </div>
      </header>

      {/* ── Main Layout: Sidebar & Content ── */}
      <div className="legal-container">
        {/* ── Sol: Dikey Navbar (Sidebar) ── */}
        <aside className="legal-sidebar" aria-label="Hukuki Belgeler Navigasyonu">
          <div className="legal-sidebar__sticky">
            <div className="legal-sidebar__head">
              <span className="legal-sidebar__label">{t("legal_nav_title")}</span>
              <p className="legal-sidebar__sub">{t("legal_nav_subtitle")}</p>
            </div>

            <nav className="legal-nav" role="navigation">
              <ul className="legal-nav__list" role="list">
                {legalNavItems.map((item) => (
                  <li key={item.to} className="legal-nav__item">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `legal-nav__link ${isActive ? "legal-nav__link--active" : ""}`
                      }
                    >
                      <div className="legal-nav__link-indicator" aria-hidden="true" />
                      <div className="legal-nav__icon-box" aria-hidden="true">
                        {item.icon}
                      </div>
                      <div className="legal-nav__text-box">
                        <span className="legal-nav__title">{item.label}</span>
                        <span className="legal-nav__desc">{item.desc}</span>
                      </div>
                      <div className="legal-nav__arrow" aria-hidden="true">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Sidebar Destek / İletişim Kartı ── */}
            <div className="legal-help-card">
              <div className="legal-help-card__icon" aria-hidden="true">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
                </svg>
              </div>
              <div className="legal-help-card__body">
                <h2 className="legal-help-card__title">{t("legal_contact_box_title")}</h2>
                <p className="legal-help-card__desc">{t("legal_contact_box_desc")}</p>
                <Link to="/contact" className="legal-help-card__btn">
                  <span>{t("legal_contact_box_btn")}</span>
                  <svg
                    width="14"
                    height="14"
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
        </aside>

        {/* ── Sağ: Hukuki Sürecin Metin Alanı (Outlet) ── */}
        <section className="legal-content-wrapper" aria-label="Hukuki Metin İçeriği">
          <Outlet />
        </section>
      </div>
    </main>
  );
}
