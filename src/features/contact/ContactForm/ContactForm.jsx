import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./ContactForm.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const LIMITS = {
    name: { min: 2, max: 50 },
    subject: { min: 3, max: 50 },
    message: { min: 20, max: 500 }
};

export default function ContactForm() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        subject: false,
        message: false
    });

    // Validations
    const isNameValid = formData.name.trim().length >= LIMITS.name.min && formData.name.trim().length <= LIMITS.name.max;
    const isEmailValid = EMAIL_REGEX.test(formData.email.trim().toLowerCase());
    const isSubjectValid = formData.subject.trim().length >= LIMITS.subject.min && formData.subject.trim().length <= LIMITS.subject.max;
    const isMessageValid = formData.message.trim().length >= LIMITS.message.min && formData.message.trim().length <= LIMITS.message.max;

    const isFormValid = isNameValid && isEmailValid && isSubjectValid && isMessageValid;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBlur = (field) => {
        setTouched((prev) => ({
            ...prev,
            [field]: true
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark all fields touched to reveal validation errors if any
        setTouched({
            name: true,
            email: true,
            subject: true,
            message: true
        });

        if (!isFormValid || loading) return;

        setLoading(true);

        try {
            const requestBody = {
                name: formData.name.trim(),
                email: formData.email.trim().toLowerCase(),
                _subject: formData.subject.trim(),
                message: formData.message.trim(),
                app: "Wordistan Web"
            };

            const response = await fetch("https://formspree.io/f/xzezbgwv", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                setFormData({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                });
                setTouched({
                    name: false,
                    email: false,
                    subject: false,
                    message: false
                });
                toast.success(t("contact_success"));
            } else {
                console.error("❌ Email could not be sent:", response.status);
                toast.error(t("contact_error"));
            }
        } catch (error) {
            console.error("❌ Email send error:", error);
            toast.error(t("contact_error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="c-form-card">
            <form className="c-form" onSubmit={handleSubmit} noValidate>

                {/* ── Ad Soyad ── */}
                <div className="c-form__group">
                    <div className="c-form__label-row">
                        <label htmlFor="contact-name" className="c-form__label">
                            {t("contact_form_name")} <span className="c-form__required">*</span>
                        </label>
                        <span className="c-form__counter">
                            {formData.name.length}/{LIMITS.name.max}
                        </span>
                    </div>
                    <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={() => handleBlur("name")}
                        placeholder={t("contact_form_name_placeholder")}
                        maxLength={LIMITS.name.max}
                        className={`c-form__input ${touched.name && !isNameValid ? "c-form__input--error" : ""}`}
                        disabled={loading}
                    />
                    {touched.name && !isNameValid && (
                        <p className="c-form__error-msg" role="alert">
                            {t("contact_err_name")}
                        </p>
                    )}
                </div>

                {/* ── E-posta ── */}
                <div className="c-form__group">
                    <div className="c-form__label-row">
                        <label htmlFor="contact-email" className="c-form__label">
                            {t("contact_form_email")} <span className="c-form__required">*</span>
                        </label>
                    </div>
                    <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={() => handleBlur("email")}
                        placeholder={t("contact_form_email_placeholder")}
                        className={`c-form__input ${touched.email && !isEmailValid ? "c-form__input--error" : ""}`}
                        disabled={loading}
                    />
                    {touched.email && !isEmailValid && (
                        <p className="c-form__error-msg" role="alert">
                            {t("contact_err_email")}
                        </p>
                    )}
                </div>

                {/* ── Konu (Normal Text Input) ── */}
                <div className="c-form__group">
                    <div className="c-form__label-row">
                        <label htmlFor="contact-subject" className="c-form__label">
                            {t("contact_form_subject")} <span className="c-form__required">*</span>
                        </label>
                        <span className="c-form__counter">
                            {formData.subject.length}/{LIMITS.subject.max}
                        </span>
                    </div>
                    <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        onBlur={() => handleBlur("subject")}
                        placeholder={t("contact_form_subject_placeholder")}
                        maxLength={LIMITS.subject.max}
                        className={`c-form__input ${touched.subject && !isSubjectValid ? "c-form__input--error" : ""}`}
                        disabled={loading}
                    />
                    {touched.subject && !isSubjectValid && (
                        <p className="c-form__error-msg" role="alert">
                            {t("contact_err_subject")}
                        </p>
                    )}
                </div>

                {/* ── Mesaj ── */}
                <div className="c-form__group">
                    <div className="c-form__label-row">
                        <label htmlFor="contact-message" className="c-form__label">
                            {t("contact_form_message")} <span className="c-form__required">*</span>
                        </label>
                        <span className="c-form__counter">
                            {formData.message.length}/{LIMITS.message.max}
                        </span>
                    </div>
                    <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onBlur={() => handleBlur("message")}
                        placeholder={t("contact_form_message_placeholder")}
                        maxLength={LIMITS.message.max}
                        rows={5}
                        className={`c-form__textarea ${touched.message && !isMessageValid ? "c-form__input--error" : ""}`}
                        disabled={loading}
                    />
                    {touched.message && !isMessageValid && (
                        <p className="c-form__error-msg" role="alert">
                            {t("contact_err_message")}
                        </p>
                    )}
                </div>

                {/* ── Gönder Butonu ── */}
                <button
                    type="submit"
                    disabled={loading}
                    className="c-form__submit-btn"
                >
                    {loading ? (
                        <>
                            <span className="c-form__spinner" aria-hidden="true" />
                            <span>{t("contact_form_sending")}</span>
                        </>
                    ) : (
                        <>
                            <svg className="c-form__btn-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="22" y1="2" x2="11" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                            <span>{t("contact_form_submit")}</span>
                        </>
                    )}
                </button>

            </form>
        </div>
    );
}