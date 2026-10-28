import React from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm/ContactForm";
import "./style.css";

export default function Contact() {
    const { t } = useTranslation();

    return (
        <main className="cnt">
            <div className="cnt__container">

                {/* ── Sol Sütun: Bilgi & Kanallar (Kart Yapısı) ── */}
                <div className="cnt__info">
                    <span className="cnt__badge">{t("contact_badge")}</span>
                    <h1 className="cnt__title">
                        {t("contact_title")}
                    </h1>
                    <p className="cnt__desc">
                        {t("contact_desc")}
                    </p>

                    <div className="cnt__channels">

                        {/* Kart 1: E-posta (Pembe Tonu) */}
                        <div className="cnt__card cnt__card--pink">
                            <div className="cnt__card-icon cnt__card-icon--pink" aria-hidden="true">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <div className="cnt__card-content">
                                <h2 className="cnt__card-title">{t("contact_info_email_title")}</h2>
                                <p className="cnt__card-desc">{t("contact_info_email_desc")}</p>
                            </div>
                        </div>

                        {/* Kart 2: Geri Bildirim (Mor Tonu) */}
                        <div className="cnt__card cnt__card--purple">
                            <div className="cnt__card-icon cnt__card-icon--purple" aria-hidden="true">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    <line x1="8" y1="10" x2="8.01" y2="10" strokeWidth="3" />
                                    <line x1="12" y1="10" x2="12.01" y2="10" strokeWidth="3" />
                                    <line x1="16" y1="10" x2="16.01" y2="10" strokeWidth="3" />
                                </svg>
                            </div>
                            <div className="cnt__card-content">
                                <h2 className="cnt__card-title">{t("contact_info_feedback_title")}</h2>
                                <p className="cnt__card-desc">{t("contact_info_feedback_desc")}</p>
                            </div>
                        </div>

                        {/* Kart 3: Genel Sorular (Macenta/Lila Tonu) */}
                        <div className="cnt__card cnt__card--magenta">
                            <div className="cnt__card-icon cnt__card-icon--magenta" aria-hidden="true">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
                                </svg>
                            </div>
                            <div className="cnt__card-content">
                                <h2 className="cnt__card-title">{t("contact_info_help_title")}</h2>
                                <p className="cnt__card-desc">{t("contact_info_help_desc")}</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* ── Sağ Sütun: Form Kartı ── */}
                <div className="cnt__form-col">
                    <ContactForm />
                </div>

            </div>
        </main>
    );
}