import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Footer.css";

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="ft" role="contentinfo" aria-label="Sayfa alt bilgisi">
            <div className="ft__container">

                {/* ── Sol: Marka & Slogan ── */}
                <div className="ft__brand-wrapper">
                    <Link to="/" className="ft__brand" aria-label="Wordistan Ana Sayfa">
                        <img
                            src="/logo.png"
                            alt="Wordistan Logo"
                            className="ft__logo-img"
                        />
                        <span className="ft__brand-text">Wordistan</span>
                    </Link>
                    <span className="ft__brand-sep" aria-hidden="true" />
                    <p className="ft__slogan">{t("footer_slogan")}</p>
                </div>

                {/* ── Orta: Hızlı Linkler (Yasal & İletişim) ── */}
                <nav className="ft__nav" aria-label="Alt navigasyon">
                    <Link to="/legal" className="ft__link">
                        {t("footer_legal")}
                    </Link>
                    <span className="ft__nav-divider" aria-hidden="true">|</span>
                    <Link to="/contact" className="ft__link">
                        {t("footer_contact")}
                    </Link>
                </nav>

                {/* ── Sağ: Telif Hakkı ── */}
                <div className="ft__copyright-wrapper">
                    <p className="ft__copyright">
                        {t("footer_copyright", { year: currentYear })}
                    </p>
                </div>

            </div>
        </footer>
    );
}
