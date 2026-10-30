import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import "./ResetPassword.css";

function isExpiredToken(token) {
    const payload = token.split(".")[1];
    if (!payload) return false;

    try {
        const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decodedPayload = window.atob(normalizedPayload);
        const { exp } = JSON.parse(decodedPayload);
        return typeof exp === "number" && exp * 1000 <= Date.now();
    } catch {
        return false;
    }
}

export default function ResetPassword() {
    const { t } = useTranslation();
    const [{ accessToken: initialToken, linkExpired: initialLinkExpired }] = useState(() => {
        const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
        const token = params.get("access_token");
        const type = params.get("type");

        if (!token || type !== "recovery") {
            return { accessToken: null, linkExpired: false };
        }

        return isExpiredToken(token)
            ? { accessToken: null, linkExpired: true }
            : { accessToken: token, linkExpired: false };
    });
    const [accessToken, setAccessToken] = useState(initialToken);
    const [linkExpired, setLinkExpired] = useState(initialLinkExpired);
    const [newPassword, setNewPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const passwordRequirements = {
        hasMinimumLength: newPassword.length >= 6,
        hasLowercase: /[a-z]/.test(newPassword),
        hasUppercase: /[A-Z]/.test(newPassword),
        hasSpecialCharacter: /[^\w\s]/.test(newPassword),
    };
    const validPassword = Object.values(passwordRequirements).every(Boolean);
    const passwordsMatch = newPassword.trim() === passwordConfirm.trim();
    const hasMismatch = passwordConfirm.trim().length > 0 && !passwordsMatch;
    const validForm = validPassword && passwordConfirm.trim().length > 0 && passwordsMatch;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!validForm || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(
                "https://wordistan-backend.onrender.com/api/v1/auth/reset-password",
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        new_password: newPassword.trim(),
                        access_token: accessToken,
                    }),
                }
            );

            if (response.status === 401 || response.status === 403) {
                setLinkExpired(true);
                setAccessToken(null);
                return;
            }

            if (!response.ok) {
                toast.error(t("resetPasswordError"));
                return;
            }

            toast.success(t("resetPasswordSuccess"));
            setNewPassword("");
            setPasswordConfirm("");
        } catch {
            toast.error(t("resetPasswordError"));
        } finally {
            setIsSubmitting(false);
        }
    };

    if (linkExpired) {
        return <NotFoundPage messageKey="resetPasswordExpired" />;
    }

    if (!accessToken) {
        return <NotFoundPage />;
    }

    return (
        <main className="auth-page">
            <section className="auth-card" aria-labelledby="reset-password-title">
                <header className="auth-card__header">
                    <img src="/logo.png" alt="" className="auth-card__logo" />
                    <span className="auth-card__brand">Wordistan</span>
                </header>

                <div className="auth-card__intro">
                    <h1 id="reset-password-title">{t("resetPasswordTitle")}</h1>
                    <p>{t("resetPasswordDescription")}</p>
                </div>

                <form className="auth-form" onSubmit={handleFormSubmit} noValidate>
                    <div className="auth-form__field">
                        <label htmlFor="newPassword">{t("newPassword")}</label>
                        <input
                            className={`auth-form__input ${newPassword && !validPassword ? "is-invalid" : ""}`}
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            autoComplete="new-password"
                            value={newPassword}
                            onChange={(event) => setNewPassword(event.target.value)}
                            aria-describedby="password-requirements"
                            aria-invalid={Boolean(newPassword) && !validPassword}
                            required
                        />
                        <ul className="auth-form__requirements" id="password-requirements">
                            <li className={passwordRequirements.hasMinimumLength ? "is-met" : ""}>
                                {t("passwordMinimumLength")}
                            </li>
                            <li className={passwordRequirements.hasLowercase ? "is-met" : ""}>
                                {t("passwordLowercase")}
                            </li>
                            <li className={passwordRequirements.hasUppercase ? "is-met" : ""}>
                                {t("passwordUppercase")}
                            </li>
                            <li className={passwordRequirements.hasSpecialCharacter ? "is-met" : ""}>
                                {t("passwordSpecialCharacter")}
                            </li>
                        </ul>
                    </div>

                    <div className="auth-form__field">
                        <label htmlFor="passwordConfirm">{t("newPasswordAgain")}</label>
                        <input
                            className={`auth-form__input ${hasMismatch ? "is-invalid" : ""}`}
                            type="password"
                            name="passwordConfirm"
                            id="passwordConfirm"
                            autoComplete="new-password"
                            value={passwordConfirm}
                            onChange={(event) => setPasswordConfirm(event.target.value)}
                            aria-describedby={hasMismatch ? "password-mismatch" : undefined}
                            aria-invalid={hasMismatch}
                            required
                        />
                        {hasMismatch && (
                            <p className="auth-form__error" id="password-mismatch" role="alert">
                                {t("passwordMismatch")}
                            </p>
                        )}
                    </div>

                    <button
                        className="auth-form__submit"
                        type="submit"
                        disabled={!validForm || isSubmitting}
                    >
                        {isSubmitting ? t("resetPasswordSubmitting") : t("resetPassword")}
                    </button>
                </form>
            </section>
        </main>
    );
}
