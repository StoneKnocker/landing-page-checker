import { locales } from '@/i18n'
export const mutliLanguages = [
  {
    code: "en-US",
    lang: "en",
    language: "English",
  },
  {
    code: "zh-CN",
    lang: "zh",
    language: "中文简体",
  },
  {
    code: "hi-IN",
    lang: "hi",
    language: "हिन्दी",
  },
  {
    code: "es-ES",
    lang: "es",
    language: "Español",
  },
  {
    code: "ar-SA",
    lang: "ar",
    language: "العربية",
  },
  {
    code: "bn-BD",
    lang: "bn",
    language: "বাংলা",
  },
  {
    code: "pt-PT",
    lang: "pt",
    language: "Português",
  },
  {
    code: "ru-RU",
    lang: "ru",
    language: "Русский",
  },
  {
    code: "ja-JP",
    lang: "ja",
    language: "日本語",
  },
  {
    code: "pa-IN",
    lang: "pa",
    language: "ਪੰਜਾਬੀ",
  },
  {
    code: "de-DE",
    lang: "de",
    language: "Deutsch",
  },
  {
    code: "jv-ID",
    lang: "jv",
    language: "Basa Jawa",
  },
  {
    code: "fr-FR",
    lang: "fr",
    language: "Français",
  },
  {
    code: "te-IN",
    lang: "te",
    language: "తెలుగు",
  },
  {
    code: "vi-VN",
    lang: "vi",
    language: "Tiếng Việt",
  },
  {
    code: "ko-KR",
    lang: "ko",
    language: "한국어",
  },
  {
    code: "mr-IN",
    lang: "mr",
    language: "मराठी",
  },
  {
    code: "ta-IN",
    lang: "ta",
    language: "தமிழ்",
  },
  {
    code: "ur-PK",
    lang: "ur",
    language: "اردو",
  },
  {
    code: "tr-TR",
    lang: "tr",
    language: "Türkçe",
  },
  {
    code: "it-IT",
    lang: "it",
    language: "Italiano",
  },
  {
    code: "th-TH",
    lang: "th",
    language: "ไทย",
  },
  {
    code: "gu-IN",
    lang: "gu",
    language: "ગુજરાતી",
  },
  {
    code: "pl-PL",
    lang: "pl",
    language: "Polski",
  },
  {
    code: "uk-UA",
    lang: "uk",
    language: "Українська",
  },
  {
    code: "ml-IN",
    lang: "ml",
    language: "മലയാളം",
  },
  {
    code: "kn-IN",
    lang: "kn",
    language: "ಕನ್ನಡ",
  },
  {
    code: "fa-IR",
    lang: "fa",
    language: "فارسی",
  },
  {
    code: "my-MM",
    lang: "my",
    language: "မြန်မာဘာသာ",
  },
  {
    code: "ro-RO",
    lang: "ro",
    language: "Română",
  },
  {
    code: "nl-NL",
    lang: "nl",
    language: "Nederlands",
  },
  {
    code: "ha-NG",
    lang: "ha",
    language: "Hausa",
  },
  {
    code: "ms-MY",
    lang: "ms",
    language: "Bahasa Melayu",
  },
  {
    code: "id-ID",
    lang: "id",
    language: "Bahasa Indonesia",
  },
  {
    code: "sw-KE",
    lang: "sw",
    language: "Kiswahili",
  },
  {
    code: "am-ET",
    lang: "am",
    language: "አማርኛ",
  },
  {
    code: "km-KH",
    lang: "km",
    language: "ខ្មែរ",
  },
  {
    code: "hu-HU",
    lang: "hu",
    language: "Magyar",
  },
  {
    code: "el-GR",
    lang: "el",
    language: "Ελληνικά",
  },
  {
    code: "sv-SE",
    lang: "sv",
    language: "Svenska",
  },
  {
    code: "cs-CZ",
    lang: "cs",
    language: "Čeština",
  },
  {
    code: "fi-FI",
    lang: "fi",
    language: "Suomi",
  },
  {
    code: "da-DK",
    lang: "da",
    language: "Dansk",
  },
  {
    code: "he-IL",
    lang: "he",
    language: "עברית",
  },
  {
    code: "no-NO",
    lang: "no",
    language: "Norsk",
  },
];

// order by langCodes
function getMultiLangeuageByConfig(langCodes) {
  return langCodes.map(code => {
    const language = mutliLanguages.find(lang => lang.lang === code);
    if (!language) {
      console.warn(`Language code "${code}" not found in mutliLanguages.`);
      return null;
    }
    return language;
  }).filter(Boolean);
}
export const languageSupported = getMultiLangeuageByConfig(locales);

export const getLanguageByLang = (lang) => {
  for (let i = 0; i < languageSupported.length; i++) {
    if (lang == languageSupported[i].lang) {
      return languageSupported[i];
    }
  }
  return languageSupported[0];
}

