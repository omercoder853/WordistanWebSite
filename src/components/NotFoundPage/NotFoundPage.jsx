import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./NotFoundPage.css";

export default function NotFoundPage({ messageKey = "notFoundDescription" }) {
    const { t } = useTranslation();

    return (
        <main className="not-found-page">
            <section className="not-found__content" aria-labelledby="not-found-title">
                <div className="not-found__brand">
                    <img src="/logo.png" alt="" className="not-found__logo" />
                    <span>Wordistan</span>
                </div>
                <div className="not-found__code" aria-hidden="true">404</div>
                <h1 id="not-found-title">{t("notFoundTitle")}</h1>
                <p>{t(messageKey)}</p>
                <Link className="not-found__home" to="/">
                    {t("notFoundHome")}
                </Link>
            </section>
        </main>
    );
}
