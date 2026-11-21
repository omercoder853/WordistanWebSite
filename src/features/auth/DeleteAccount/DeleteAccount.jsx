import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "../ResetPassword/ResetPassword.css";
import "./DeleteAccount.css";

export default function DeleteAccount() {
    const { t } = useTranslation();

    // Step state: 1 (Login), 2 (Warning), 3 (Confirmation Input), "success" (Account Deleted)
    const [step, setStep] = useState(1);

    // Form states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Auth & confirmation states
    const [accessToken, setAccessToken] = useState("");
    const [confirmText, setConfirmText] = useState("");

    // Loading & error states
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [deleteError, setDeleteError] = useState("");

    // Touched states for user-friendly error display
    const [emailTouched, setEmailTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    // Validation rules
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email.trim());

    const passwordRequirements = {
        hasMinimumLength: password.length >= 6,
        hasLowercase: /[a-z]/.test(password),
        hasUppercase: /[A-Z]/.test(password),
        hasSpecialCharacter: /[^\w\s]/.test(password),
    };
    const isPasswordValid = Object.values(passwordRequirements).every(Boolean);

    const passwordsMatched = password.trim() === passwordConfirm.trim();
    const hasMismatch = passwordConfirm.trim().length > 0 && !passwordsMatched;

    const canSubmitLogin =
        isEmailValid &&
        isPasswordValid &&
        passwordConfirm.trim().length > 0 &&
        passwordsMatched &&
        !isLoggingIn;

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        setEmailTouched(true);
        setPasswordTouched(true);
        setLoginError("");

        if (!canSubmitLogin) return;

        setIsLoggingIn(true);
        try {
            const response = await fetch(
                "https://api.wordistan.com.tr/api/v1/auth/login",
                {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password.trim(),
                    }),
                }
            );

            if (response.ok) {
                const data = await response.json();
                setAccessToken(data.access_token);
                setStep(2);
            } else {
                const errMessage = t("deleteAccount_loginError");
                setLoginError(errMessage);
                toast.error(errMessage);
            }
        } catch {
            const errMessage = t("deleteAccount_loginError");
            setLoginError(errMessage);
            toast.error(errMessage);
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Confirmation text check
    const expectedConfirm = t("confirmText");
    const isDeleteConfirmed =
        confirmText.trim().toUpperCase() === expectedConfirm.trim().toUpperCase();

    // Handle user account deletion
    const handleDeleteUser = async (e) => {
        if (e) e.preventDefault();
        setDeleteError("");

        if (!isDeleteConfirmed || isDeleting) return;

        setIsDeleting(true);
        try {
            const response = await fetch(
                "https://api.wordistan.com.tr/api/v1/auth/delete-user",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    method: "DELETE",
                    body: JSON.stringify({
                        password: password.trim(),
                    }),
                }
            );

            if (response.ok) {
                setStep("success");
            } else {
                const errMessage = t("deleteAccount_step3_error");
                setDeleteError(errMessage);
                toast.error(errMessage);
            }
        } catch {
            const errMessage = t("deleteAccount_step3_error");
            setDeleteError(errMessage);
            toast.error(errMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    // ── Success Screen ──
    if (step === "success") {
        return (
            <main className="auth-page">
                <section
                    className="auth-card da-card da-success-card"
                    aria-labelledby="success-title"
                >
                    <div className="da-success-logo">
                        <img src="/logo.png" alt="Wordistan Logo" />
                    </div>
                    <h1 id="success-title" className="da-success-title">
                        {t("deleteAccount_success_title")}
                    </h1>
                    <p className="da-success-desc">
                        {t("deleteAccount_success_desc")}
                    </p>
                    <Link to="/" className="da-btn-home">
                        {t("deleteAccount_success_home")}
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <section className="auth-card da-card" aria-labelledby="da-main-title">
                {/* ── Brand Header (Same as ResetPassword) ── */}
                <header className="auth-card__header">
                    <img src="/logo.png" alt="Wordistan" className="auth-card__logo" />
                    <span className="auth-card__brand">Wordistan</span>
                </header>

                {/* ── STEP 1: Login Form ── */}
                {step === 1 && (
                    <>
                        <div className="auth-card__intro">
                            <h1 id="da-main-title">{t("deleteAccount_step1_title")}</h1>
                            <p>{t("deleteAccount_step1_desc")}</p>
                        </div>

                        {loginError && (
                            <div className="auth-form__alert-banner" role="alert">
                                <svg
                                    className="auth-form__alert-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{loginError}</span>
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleLogin} noValidate>
                            {/* Email Field */}
                            <div className="auth-form__field">
                                <label htmlFor="da-email">{t("deleteAccount_email")}</label>
                                <input
                                    className={`auth-form__input ${
                                        emailTouched && !isEmailValid ? "is-invalid" : ""
                                    }`}
                                    type="email"
                                    name="email"
                                    id="da-email"
                                    autoComplete="email"
                                    placeholder={t("deleteAccount_email_placeholder")}
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (loginError) setLoginError("");
                                    }}
                                    onBlur={() => setEmailTouched(true)}
                                    aria-invalid={emailTouched && !isEmailValid}
                                    required
                                />
                                {emailTouched && !isEmailValid && (
                                    <p className="auth-form__error" role="alert">
                                        {t("deleteAccount_emailInvalid")}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="auth-form__field">
                                <label htmlFor="da-password">
                                    {t("deleteAccount_password")}
                                </label>
                                <div className="auth-form__input-wrapper">
                                    <input
                                        className={`auth-form__input ${
                                            passwordTouched && !isPasswordValid ? "is-invalid" : ""
                                        }`}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="da-password"
                                        autoComplete="current-password"
                                        placeholder={t("deleteAccount_password_placeholder")}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (loginError) setLoginError("");
                                        }}
                                        onBlur={() => setPasswordTouched(true)}
                                        aria-describedby="da-password-requirements"
                                        aria-invalid={passwordTouched && !isPasswordValid}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="auth-form__toggle-pw"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        aria-label={
                                            showPassword
                                                ? t("deleteAccount_hidePassword")
                                                : t("deleteAccount_showPassword")
                                        }
                                        title={
                                            showPassword
                                                ? t("deleteAccount_hidePassword")
                                                : t("deleteAccount_showPassword")
                                        }
                                    >
                                        {showPassword ? (
                                            <svg
                                                width="19"
                                                height="19"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="19"
                                                height="19"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                <ul
                                    className="auth-form__requirements"
                                    id="da-password-requirements"
                                >
                                    <li
                                        className={
                                            passwordRequirements.hasMinimumLength
                                                ? "is-met"
                                                : ""
                                        }
                                    >
                                        {t("passwordMinimumLength")}
                                    </li>
                                    <li
                                        className={
                                            passwordRequirements.hasLowercase ? "is-met" : ""
                                        }
                                    >
                                        {t("passwordLowercase")}
                                    </li>
                                    <li
                                        className={
                                            passwordRequirements.hasUppercase ? "is-met" : ""
                                        }
                                    >
                                        {t("passwordUppercase")}
                                    </li>
                                    <li
                                        className={
                                            passwordRequirements.hasSpecialCharacter
                                                ? "is-met"
                                                : ""
                                        }
                                    >
                                        {t("passwordSpecialCharacter")}
                                    </li>
                                </ul>
                            </div>

                            {/* Password Confirm Field */}
                            <div className="auth-form__field">
                                <label htmlFor="da-passwordConfirm">
                                    {t("deleteAccount_passwordConfirm")}
                                </label>
                                <div className="auth-form__input-wrapper">
                                    <input
                                        className={`auth-form__input ${
                                            hasMismatch ? "is-invalid" : ""
                                        }`}
                                        type={showPasswordConfirm ? "text" : "password"}
                                        name="passwordConfirm"
                                        id="da-passwordConfirm"
                                        autoComplete="current-password"
                                        placeholder={t(
                                            "deleteAccount_passwordConfirm_placeholder"
                                        )}
                                        value={passwordConfirm}
                                        onChange={(e) => {
                                            setPasswordConfirm(e.target.value);
                                            if (loginError) setLoginError("");
                                        }}
                                        aria-describedby={
                                            hasMismatch ? "da-password-mismatch" : undefined
                                        }
                                        aria-invalid={hasMismatch}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="auth-form__toggle-pw"
                                        onClick={() =>
                                            setShowPasswordConfirm((prev) => !prev)
                                        }
                                        aria-label={
                                            showPasswordConfirm
                                                ? t("deleteAccount_hidePassword")
                                                : t("deleteAccount_showPassword")
                                        }
                                        title={
                                            showPasswordConfirm
                                                ? t("deleteAccount_hidePassword")
                                                : t("deleteAccount_showPassword")
                                        }
                                    >
                                        {showPasswordConfirm ? (
                                            <svg
                                                width="19"
                                                height="19"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                <line x1="1" y1="1" x2="23" y2="23" />
                                            </svg>
                                        ) : (
                                            <svg
                                                width="19"
                                                height="19"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {hasMismatch && (
                                    <p
                                        className="auth-form__error"
                                        id="da-password-mismatch"
                                        role="alert"
                                    >
                                        {t("deleteAccount_passwordMismatch")}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                className="auth-form__submit"
                                type="submit"
                                disabled={!canSubmitLogin}
                            >
                                {isLoggingIn
                                    ? t("deleteAccount_loginLoading")
                                    : t("deleteAccount_loginBtn")}
                            </button>
                        </form>
                    </>
                )}

                {/* ── STEP 2: Warning & Consequence Overview ── */}
                {step === 2 && (
                    <>
                        <div className="auth-card__intro">
                            <span className="da-badge-danger">
                                {t("deleteAccount_step2_badge")}
                            </span>
                            <h1 id="da-main-title">{t("deleteAccount_step2_title")}</h1>
                            <p>{t("deleteAccount_step2_desc")}</p>
                        </div>

                        <div className="da-warning-box">
                            <ul className="da-warning-list">
                                <li>
                                    <span className="da-warning-icon" aria-hidden="true">
                                        ✕
                                    </span>
                                    <span>{t("deleteAccount_step2_item1")}</span>
                                </li>
                                <li>
                                    <span className="da-warning-icon" aria-hidden="true">
                                        ✕
                                    </span>
                                    <span>{t("deleteAccount_step2_item2")}</span>
                                </li>
                                <li>
                                    <span className="da-warning-icon" aria-hidden="true">
                                        ✕
                                    </span>
                                    <span>{t("deleteAccount_step2_item3")}</span>
                                </li>
                                <li>
                                    <span className="da-warning-icon" aria-hidden="true">
                                        ✕
                                    </span>
                                    <span>{t("deleteAccount_step2_item4")}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="da-step2-actions">
                            <button
                                type="button"
                                className="da-btn-danger"
                                onClick={() => setStep(3)}
                            >
                                {t("deleteAccount_step2_confirmBtn")}
                            </button>
                            <button
                                type="button"
                                className="da-btn-ghost"
                                onClick={() => {
                                    setStep(1);
                                    setAccessToken("");
                                }}
                            >
                                {t("deleteAccount_step2_cancelBtn")}
                            </button>
                        </div>
                    </>
                )}

                {/* ── STEP 3: Final Confirmation Input ── */}
                {step === 3 && (
                    <>
                        <div className="auth-card__intro">
                            <span className="da-badge-danger">
                                {t("deleteAccount_step2_badge")}
                            </span>
                            <h1 id="da-main-title">{t("deleteAccount_step3_title")}</h1>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: t("deleteAccount_step3_desc", {
                                        confirmWord: expectedConfirm,
                                    }),
                                }}
                            />
                        </div>

                        {deleteError && (
                            <div className="auth-form__alert-banner" role="alert">
                                <svg
                                    className="auth-form__alert-icon"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                <span>{deleteError}</span>
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleDeleteUser} noValidate>
                            <div className="auth-form__field">
                                <label htmlFor="da-confirmText">
                                    {t("deleteAccount_step3_inputLabel")}
                                </label>
                                <input
                                    className={`auth-form__input da-confirm-input ${
                                        confirmText.length > 0 && !isDeleteConfirmed
                                            ? "is-invalid"
                                            : ""
                                    } ${isDeleteConfirmed ? "is-valid" : ""}`}
                                    type="text"
                                    name="confirmText"
                                    id="da-confirmText"
                                    autoComplete="off"
                                    spellCheck={false}
                                    placeholder={t("deleteAccount_step3_inputPlaceholder")}
                                    value={confirmText}
                                    onChange={(e) => {
                                        setConfirmText(e.target.value);
                                        if (deleteError) setDeleteError("");
                                    }}
                                    required
                                />
                                <p
                                    className={`da-confirm-hint ${
                                        isDeleteConfirmed ? "da-confirm-hint--ok" : ""
                                    }`}
                                >
                                    {isDeleteConfirmed ? "✓ " : ""}
                                    {t("deleteAccount_step3_inputHint", {
                                        confirmWord: expectedConfirm,
                                    })}
                                </p>
                            </div>

                            <button
                                className="da-btn-danger"
                                type="submit"
                                disabled={!isDeleteConfirmed || isDeleting}
                            >
                                {isDeleting
                                    ? t("deleteAccount_step3_deleteLoading")
                                    : t("deleteAccount_step3_deleteBtn")}
                            </button>

                            <button
                                type="button"
                                className="da-btn-ghost"
                                onClick={() => {
                                    setStep(2);
                                    setConfirmText("");
                                    setDeleteError("");
                                }}
                                disabled={isDeleting}
                            >
                                {t("deleteAccount_step2_cancelBtn")}
                            </button>
                        </form>
                    </>
                )}
            </section>
        </main>
    );
}
