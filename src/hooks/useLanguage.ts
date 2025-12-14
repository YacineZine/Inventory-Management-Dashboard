import { useState, useEffect } from 'react';
import i18n from 'i18next';

export function useLanguage() {
  const [language, setLanguage] = useState(i18n.language || 'en');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    // Update state when language changes
    const handleLanguageChanged = (lng: string) => {
      setLanguage(lng);
      localStorage.setItem('language', lng);
      // Set document direction
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lng;
    };

    i18n.on('languageChanged', handleLanguageChanged);

    // Set initial direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [language]);

  const isRTL = language === 'ar';

  return { language, changeLanguage, isRTL };
}