import { useTranslation } from "react-i18next";
import personalDictionariesMockup from "../../../assets/mockups/mockup-dicts-mkt.png";
import gamesMockup from "../../../assets/mockups/mockup-games-mkt.png";
import "./Marketing.css";

export default function Marketing() {
    const { t } = useTranslation();

    return (
        <section className="mkt" id="features" aria-label={t("mkt_badge")}>
            <div className="mkt__container">

                {/* ── Section Header ── */}
                <header className="mkt__header">
                    <h2 className="mkt__title">
                        {t("mkt_title_line1")}
                        <span className="mkt__title-highlight">
                            {t("mkt_title_highlight")}
                        </span>
                    </h2>
                    <p className="mkt__subtitle">{t("mkt_subtitle")}</p>
                </header>

                {/* ── Top Row: 2 Large Showcase Cards (2-column) ── */}
                <div className="mkt__showcase-grid">

                    {/* Card 1: Kişisel Sözlükler (Mockup on left, text on right) */}
                    <article className="mkt__card-large mkt__card-large--dict">
                        <div className="mkt__mockup-wrapper mkt__mockup-wrapper--dict">
                            <div className="mkt__mockup-glow mkt__mockup-glow--pink" aria-hidden="true" />
                            <img
                                src={personalDictionariesMockup}
                                alt={t("mkt_dict_title")}
                                className="mkt__mockup-img"
                                loading="lazy"
                            />
                        </div>
                        <div className="mkt__large-content">
                            <div className="mkt__icon-badge mkt__icon-badge--pink" aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                                    <path d="M8 7h8" />
                                    <path d="M8 11h6" />
                                </svg>
                            </div>
                            <h3 className="mkt__large-title">{t("mkt_dict_title")}</h3>
                            <p className="mkt__large-desc">{t("mkt_dict_desc")}</p>
                        </div>
                    </article>

                    {/* Card 2: Etkileşimli Oyunlar (Text on left, mockup on right) */}
                    <article className="mkt__card-large mkt__card-large--games">
                        <div className="mkt__large-content">
                            <div className="mkt__icon-badge mkt__icon-badge--amber" aria-hidden="true">
                                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="6" width="20" height="12" rx="6" />
                                    <path d="M6 12h4" />
                                    <path d="M8 10v4" />
                                    <circle cx="15" cy="11" r="1" fill="currentColor" />
                                    <circle cx="18" cy="13" r="1" fill="currentColor" />
                                </svg>
                            </div>
                            <h3 className="mkt__large-title">{t("mkt_games_title")}</h3>
                            <p className="mkt__large-desc">{t("mkt_games_desc")}</p>
                        </div>
                        <div className="mkt__mockup-wrapper mkt__mockup-wrapper--games">
                            <div className="mkt__mockup-glow mkt__mockup-glow--amber" aria-hidden="true" />
                            <img
                                src={gamesMockup}
                                alt={t("mkt_games_title")}
                                className="mkt__mockup-img"
                                loading="lazy"
                            />
                        </div>
                    </article>

                </div>

                {/* ── Bottom Row: 3 Feature Cards (3-column) ── */}
                <div className="mkt__features-grid">

                    {/* Card 1: Hızlı Kelime Çevirisi */}
                    <article className="mkt__card-feature mkt__card-feature--translate">
                        <div className="mkt__feature-icon mkt__feature-icon--indigo" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m5 8 6 6" />
                                <path d="m4 14 6-6 2-3" />
                                <path d="M2 5h12" />
                                <path d="M7 2h1" />
                                <path d="m22 22-5-10-5 10" />
                                <path d="M14 18h6" />
                            </svg>
                        </div>
                        <div className="mkt__feature-content">
                            <h3 className="mkt__feature-title">{t("mkt_translate_title")}</h3>
                            <p className="mkt__feature-desc">{t("mkt_translate_desc")}</p>
                        </div>
                    </article>

                    {/* Card 2: Hazır Koleksiyonlar */}
                    <article className="mkt__card-feature mkt__card-feature--collections">
                        <div className="mkt__feature-icon mkt__feature-icon--emerald" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <ellipse cx="12" cy="5" rx="9" ry="3" />
                                <path d="M3 5V12c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                                <path d="M3 12v7c0 1.66 4.03 3 9 3s9-1.34 9-3v-7" />
                            </svg>
                        </div>
                        <div className="mkt__feature-content">
                            <h3 className="mkt__feature-title">{t("mkt_collections_title")}</h3>
                            <p className="mkt__feature-desc">{t("mkt_collections_desc")}</p>
                        </div>
                    </article>

                    {/* Card 3: Online / Offline Kullanım */}
                    <article className="mkt__card-feature mkt__card-feature--offline">
                        <div className="mkt__feature-icon mkt__feature-icon--blue" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 13a10 10 0 0 1 14 0" />
                                <path d="M8.5 16.5a5 5 0 0 1 7 0" />
                                <path d="M2 8.82a15 15 0 0 1 20 0" />
                                <line x1="12" y1="20" x2="12.01" y2="20" strokeWidth="3" />
                            </svg>
                        </div>
                        <div className="mkt__feature-content">
                            <h3 className="mkt__feature-title">{t("mkt_offline_title")}</h3>
                            <p className="mkt__feature-desc">{t("mkt_offline_desc")}</p>
                        </div>
                    </article>

                </div>

            </div>
        </section>
    );
}
