import "./Navbar.css";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import i18n from "../../i18n";

const LANGUAGES = ["TR", "EN"];

function Navbar() {
    const { t } = useTranslation();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLang, setActiveLang] = useState(
        i18n.language?.toUpperCase().slice(0, 2) || "TR"
    );

    /* --- Scroll listener --- */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* --- Language switcher --- */
    const handleLangChange = (lang) => {
        setActiveLang(lang);
        i18n.changeLanguage(lang.toLowerCase());
    };

    /* --- Active lang index for sliding pill --- */
    const activeLangIndex = LANGUAGES.indexOf(activeLang);

    /* --- Nav links config --- */
    const navLinks = [
        { to:"/" , label:t("home")},
        { to: "/about",    label: t("nav_about") },
        { to: "/download", label: t("nav_download") },
        { to: "/legal", label: t("nav_legal") },
        { to: "/contact",  label: t("nav_contact") },
    ];

    return (
        <nav
            className={`nb ${scrolled ? "nb--scrolled" : ""}`}
            id="navbar"
            role="navigation"
            aria-label="Ana navigasyon"
        >
            <div className="nb__inner">

                {/* ── Logo ── */}
                <NavLink className="nb__brand" to="/" aria-label="Wordistan Ana Sayfa">
                    <img
                        src="/logo.png"
                        alt="Wordistan Logo"
                        className="nb__logo-img"
                    />
                    <span className="nb__brand-text">Wordistan</span>
                </NavLink>

                {/* ── Center nav links ── */}
                <ul className="nb__links" role="list">
                    {navLinks.map(({ to, label }) => (
                        <li key={to} className="nb__item">
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `nb__link ${isActive ? "nb__link--active" : ""}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                                <span className="nb__link-underline" aria-hidden="true" />
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* ── Right side ── */}
                <div className="nb__right">
                    {/* Apple-style sliding pill language switcher */}
                    <div className="nb__lang" role="group" aria-label="Dil seçimi">
                        {/* Sliding background pill */}
                        <span
                            className="nb__lang-pill"
                            style={{ transform: `translateX(${activeLangIndex * 100}%)` }}
                            aria-hidden="true"
                        />
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang}
                                className={`nb__lang-btn ${activeLang === lang ? "nb__lang-btn--active" : ""}`}
                                onClick={() => handleLangChange(lang)}
                                aria-pressed={activeLang === lang}
                                aria-label={`${lang} diline geç`}
                                id={`lang-btn-${lang.toLowerCase()}`}
                            >
                                {t(`lang_${lang.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>

                    {/* ── Hamburger (mobile only) ── */}
                    <button
                        className={`nb__hamburger ${menuOpen ? "nb__hamburger--open" : ""}`}
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-expanded={menuOpen}
                        aria-controls="navbar-mobile-menu"
                        aria-label="Menüyü aç/kapat"
                        id="navbar-hamburger-btn"
                    >
                        <span className="nb__ham-line nb__ham-line--top" />
                        <span className="nb__ham-line nb__ham-line--mid" />
                        <span className="nb__ham-line nb__ham-line--bot" />
                    </button>
                </div>
            </div>

            {/* ── Mobile dropdown menu ── */}
            <div
                className={`nb__mobile-menu ${menuOpen ? "nb__mobile-menu--open" : ""}`}
                id="navbar-mobile-menu"
                aria-hidden={!menuOpen}
            >
                <ul className="nb__mobile-links" role="list">
                    {navLinks.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `nb__mobile-link ${isActive ? "nb__mobile-link--active" : ""}`
                                }
                                onClick={() => setMenuOpen(false)}
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

                {/* Lang switcher inside mobile menu */}
                <div className="nb__mobile-lang">
                    <div className="nb__lang nb__lang--mobile" role="group" aria-label="Dil seçimi">
                        <span
                            className="nb__lang-pill"
                            style={{ transform: `translateX(${activeLangIndex * 100}%)` }}
                            aria-hidden="true"
                        />
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang}
                                className={`nb__lang-btn ${activeLang === lang ? "nb__lang-btn--active" : ""}`}
                                onClick={() => handleLangChange(lang)}
                                aria-pressed={activeLang === lang}
                            >
                                {t(`lang_${lang.toLowerCase()}`)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;