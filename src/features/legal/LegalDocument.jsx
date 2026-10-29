import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Raw markdown imports with ?raw
import kvkk_tr from "../../assets/legal/kvkk_tr.md?raw";
import kvkk_en from "../../assets/legal/kvkk_en.md?raw";
import privacy_policy_tr from "../../assets/legal/privacy_policy_tr.md?raw";
import privacy_policy_en from "../../assets/legal/privacy_policy_en.md?raw";
import terms_of_service_tr from "../../assets/legal/terms_of_service_tr.md?raw";
import terms_of_service_en from "../../assets/legal/terms_of_service_en.md?raw";

const LEGAL_DOCUMENTS = {
  kvkk: {
    tr: kvkk_tr,
    en: kvkk_en,
    badgeKey: "legal_nav_kvkk",
  },
  privacy_policy: {
    tr: privacy_policy_tr,
    en: privacy_policy_en,
    badgeKey: "legal_nav_privacy",
  },
  terms_of_service: {
    tr: terms_of_service_tr,
    en: terms_of_service_en,
    badgeKey: "legal_nav_terms",
  },
};

export default function LegalDocument({ docKey }) {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Determine language suffix ('tr' or 'en')
  const currentLang = i18n.language?.toLowerCase().startsWith("en") ? "en" : "tr";

  const docData = LEGAL_DOCUMENTS[docKey] || LEGAL_DOCUMENTS.kvkk;
  const markdownText = docData[currentLang] || docData.tr;

  // Scroll to top smoothly when docKey or language changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [docKey, currentLang]);

  // Estimate reading time
  const wordCount = markdownText ? markdownText.split(/\s+/).filter(Boolean).length : 0;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 180));

  // Copy URL to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  // Print current legal page
  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="legal-doc" aria-label={t(docData.badgeKey)}>
      {/* ── Document Meta Toolbar ── */}
      <div className="legal-doc__toolbar">
        <div className="legal-doc__meta-left">
          <span className="legal-doc__badge">
            <span className="legal-doc__badge-dot" />
            {t(docData.badgeKey)}
          </span>
          <div className="legal-doc__time-wrap">
            <svg
              className="legal-doc__time-icon"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="legal-doc__meta-time">
              {readingMinutes} {t("legal_reading_time")}
            </span>
          </div>
        </div>

        <div className="legal-doc__actions">
          {/* Copy Link Button */}
          <button
            type="button"
            className={`legal-doc__action-btn ${copied ? "legal-doc__action-btn--copied" : ""}`}
            onClick={handleCopyLink}
            aria-label={t("legal_copy_link")}
            title={copied ? t("legal_link_copied") : t("legal_copy_link")}
          >
            {copied ? (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{t("legal_link_copied")}</span>
              </>
            ) : (
              <>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                <span>{t("legal_copy_link")}</span>
              </>
            )}
          </button>

          {/* Print Button */}
          <button
            type="button"
            className="legal-doc__action-btn"
            onClick={handlePrint}
            aria-label={t("legal_print")}
            title={t("legal_print")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            <span>{t("legal_print")}</span>
          </button>
        </div>
      </div>

      {/* ── Markdown Content Rendered with remarkGfm ── */}
      <div className="legal-doc__body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Render tables inside a responsive wrapper to avoid mobile horizontal break
            table: ({ ...props }) => (
              <div className="legal-table-container">
                <table className="legal-table" {...props} />
              </div>
            ),
            // Open external links safely in a new tab
            a: ({ href, children, ...props }) => {
              const isMailto = href?.startsWith("mailto:");
              return (
                <a
                  href={href}
                  className="legal-link"
                  target={isMailto ? "_self" : "_blank"}
                  rel={isMailto ? undefined : "noopener noreferrer"}
                  {...props}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {markdownText}
        </ReactMarkdown>
      </div>

      {/* ── Bottom Notice / Footer Signoff ── */}
      <footer className="legal-doc__footer">
        <div className="legal-doc__footer-left">
          <div className="legal-doc__footer-icon" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <p className="legal-doc__footer-title">Wordistan Legal Compliance</p>
            <p className="legal-doc__footer-sub">
              {t("legal_last_updated")}: <strong>{t("legal_last_updated_val")}</strong>
            </p>
          </div>
        </div>
        <div className="legal-doc__footer-right">
          <a
            href="mailto:omergulsen.ops@gmail.com"
            className="legal-doc__contact-link"
          >
            omergulsen.ops@gmail.com
          </a>
        </div>
      </footer>
    </article>
  );
}
