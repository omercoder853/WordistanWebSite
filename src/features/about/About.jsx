import { useTranslation } from "react-i18next";
import AboutHero from "./AboutHero/AboutHero";
import AboutSection from "./AboutSection/AboutSection";
import AboutCTA from "./AboutCTA/AboutCTA";
import "./About.css";

// Mockup image imports
import mockupHomepage from "../../assets/mockups/mockup-homepage.png";
import mockupTranslate from "../../assets/mockups/mockup-translate.png";
import mockupProfile from "../../assets/mockups/mockup-profile.png";

import mockupPersonalDicts from "../../assets/mockups/mockup-personal-dicts.png";
import mockupDictDetails from "../../assets/mockups/mockup-dict-details.png";
import mockupSaveToDict from "../../assets/mockups/mockup-save-to-dictionary.png";
import mockupDictSharing from "../../assets/mockups/mockup-dict-sharing.png";

import mockupGames from "../../assets/mockups/mockup-games.png";
import mockupGamesWc from "../../assets/mockups/mockup-games-wc.png";
import mockupGamesMcq from "../../assets/mockups/mockup-games-mcq.png";
import mockupGamesMp from "../../assets/mockups/mockup-games-mp.png";

import mockupStats1 from "../../assets/mockups/mockup-statistics-1.png";
import mockupStats2 from "../../assets/mockups/mockup-statistics-2.png";
import mockupGameSessions from "../../assets/mockups/mockup-game-sessions.png";

import mockupPreferences from "../../assets/mockups/mockup-preferences.png";
import mockupPreferencesDark from "../../assets/mockups/mockup-preferences-dark.png";
import mockupGameSettings from "../../assets/mockups/mockup-game-settings.png";

import mockupLevelup from "../../assets/mockups/mockup-levelup.png";
import mockupAchievements from "../../assets/mockups/mockup-achievements.png";
import mockupNewAchievement from "../../assets/mockups/mockup-new-achievement.png";

export default function About() {
  const { t } = useTranslation();

  // Section 1: Uygulama Hakkında / Giriş
  const introMockups = [
    { src: mockupHomepage, alt: "Wordistan Ana Sayfa Ekranı", caption: t("about_mockup_home") },
    { src: mockupTranslate, alt: "Wordistan Çeviri Ekranı", caption: t("about_mockup_translation") },
    { src: mockupProfile, alt: "Wordistan Profil Ekranı", caption: t("about_mockup_profile") },
    { src: mockupPersonalDicts, alt: "Kişisel Sözlükler Listesi", caption: t("about_mockup_dictionary_collection") },
  ];

  // Section 2: Kişisel Sözlükler
  const dictMockups = [
    { src: mockupPersonalDicts, alt: "Kişisel Sözlükler Listesi", caption: t("about_mockup_dictionary_collection") },
    { src: mockupDictDetails, alt: "Sözlük Detayı ve Kelimeler", caption: t("about_mockup_word_details") },
    { src: mockupSaveToDict, alt: "Sözlüğe Kelime Ekleme", caption: t("about_mockup_save_word") },
    { src: mockupDictSharing, alt: "Sözlük Paylaşımı", caption: t("about_mockup_dictionary_sharing") },
  ];

  // Section 3: Etkileşimli Oyunlar
  const gameMockups = [
    { src: mockupGames, alt: "Oyun Modları Merkezi", caption: t("about_mockup_game_modes") },
    { src: mockupGamesWc, alt: "Kelime Tamamlama Oyunu", caption: t("about_mockup_word_completion") },
    { src: mockupGamesMcq, alt: "Çoktan Seçmeli Quiz", caption: t("about_mockup_multiple_choice") },
    { src: mockupGamesMp, alt: "Eşleştirme Oyunu", caption: t("about_mockup_matching_game") },
  ];

  // Section 4: İlerleme & İstatistikler
  const statsMockups = [
    { src: mockupStats1, alt: "Genel İstatistikler ve Seri", caption: t("about_mockup_levels_accuracy") },
    { src: mockupStats2, alt: "Detaylı Analiz Grafikleri", caption: t("about_mockup_category_charts") },
    { src: mockupGameSessions, alt: "Oyun Oturumları Geçmişi", caption: t("about_mockup_session_analysis") },
  ];

  // Section 5: Kişiselleştirme & Ayarlar
  const prefMockups = [
    { src: mockupPreferences, alt: "Açık Tema Tercihler", caption: t("about_mockup_light_theme") },
    { src: mockupPreferencesDark, alt: "Koyu Tema Tercihler", caption: t("about_mockup_dark_theme") },
    { src: mockupGameSettings, alt: "Oyun Detay Ayarları", caption: t("about_mockup_game_settings") },
  ];

  // Section 6: Motivasyon & Başarılar
  const achieveMockups = [
    { src: mockupLevelup, alt: "Seviye Atlama Tebrik Kutlaması", caption: t("about_mockup_level_up") },
    { src: mockupAchievements, alt: "Başarılar ve Rozetler", caption: t("about_mockup_achievement_catalog") },
    { src: mockupNewAchievement, alt: "Yeni Başarı Kilidi Açıldı", caption: t("about_mockup_new_achievement") },
  ];

  return (
    <main className="about-page">
      {/* ── Üst Hero Karşılama Bölümü ── */}
      <AboutHero />

      {/* ── Bölüm 1: Wordistan Nedir? (Giriş) ── */}
      <AboutSection
        badge={t("about_sec_intro_badge")}
        titleLine1={t("about_sec_intro_title_1")}
        titleHighlight={t("about_sec_intro_title_hl")}
        description={t("about_sec_intro_desc")}
        checklist={[
          t("about_sec_intro_item_1"),
          t("about_sec_intro_item_2"),
          t("about_sec_intro_item_3"),
          t("about_sec_intro_item_4"),
        ]}
        mockupItems={introMockups}
        isReversed={false}
        badgeTone="purple"
      />

      {/* ── Bölüm 2: Kişisel Sözlükler ── */}
      <AboutSection
        badge={t("about_sec_dicts_badge")}
        titleLine1={t("about_sec_dicts_title_1")}
        titleHighlight={t("about_sec_dicts_title_hl")}
        description={t("about_sec_dicts_desc")}
        checklist={[
          t("about_sec_dicts_item_1"),
          t("about_sec_dicts_item_2"),
          t("about_sec_dicts_item_3"),
          t("about_sec_dicts_item_4"),
        ]}
        mockupItems={dictMockups}
        isReversed={true}
        badgeTone="pink"
      />

      {/* ── Bölüm 3: Etkileşimli Oyunlar ── */}
      <AboutSection
        badge={t("about_sec_games_badge")}
        titleLine1={t("about_sec_games_title_1")}
        titleHighlight={t("about_sec_games_title_hl")}
        description={t("about_sec_games_desc")}
        checklist={[
          t("about_sec_games_item_1"),
          t("about_sec_games_item_2"),
          t("about_sec_games_item_3"),
          t("about_sec_games_item_4"),
        ]}
        mockupItems={gameMockups}
        isReversed={false}
        badgeTone="purple"
      />

      {/* ── Bölüm 4: İlerleme & İstatistikler ── */}
      <AboutSection
        badge={t("about_sec_stats_badge")}
        titleLine1={t("about_sec_stats_title_1")}
        titleHighlight={t("about_sec_stats_title_hl")}
        description={t("about_sec_stats_desc")}
        checklist={[
          t("about_sec_stats_item_1"),
          t("about_sec_stats_item_2"),
          t("about_sec_stats_item_3"),
          t("about_sec_stats_item_4"),
        ]}
        mockupItems={statsMockups}
        isReversed={true}
        badgeTone="magenta"
      />

      {/* ── Bölüm 5: Kişiselleştirme & Ayarlar ── */}
      <AboutSection
        badge={t("about_sec_pref_badge")}
        titleLine1={t("about_sec_pref_title_1")}
        titleHighlight={t("about_sec_pref_title_hl")}
        description={t("about_sec_pref_desc")}
        checklist={[
          t("about_sec_pref_item_1"),
          t("about_sec_pref_item_2"),
          t("about_sec_pref_item_3"),
          t("about_sec_pref_item_4"),
        ]}
        mockupItems={prefMockups}
        isReversed={false}
        badgeTone="purple"
      />

      {/* ── Bölüm 6: Motivasyon & Başarılar ── */}
      <AboutSection
        badge={t("about_sec_achieve_badge")}
        titleLine1={t("about_sec_achieve_title_1")}
        titleHighlight={t("about_sec_achieve_title_hl")}
        description={t("about_sec_achieve_desc")}
        checklist={[
          t("about_sec_achieve_item_1"),
          t("about_sec_achieve_item_2"),
          t("about_sec_achieve_item_3"),
          t("about_sec_achieve_item_4"),
        ]}
        mockupItems={achieveMockups}
        isReversed={true}
        badgeTone="pink"
      />

      {/* ── Alt Eylem Çağrısı (CTA) ── */}
      <AboutCTA />
    </main>
  );
}
