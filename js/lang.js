// Language direction mapping
const languageDirection = {
  en: "ltr", 
  ar: "rtl",
  fr: "ltr",  
  es: "ltr"  
};

document.addEventListener('DOMContentLoaded', () => {
  const languageSelector = document.getElementById('languageSelector');
  const translateElements = document.querySelectorAll('[data-translate]');
  
  // Function to load translations
  async function loadTranslations(language) {
    try {
      const response = await fetch('./translations.json'); // Load the JSON file
      if (!response.ok) throw new Error('Failed to load translations file.');
      const translations = await response.json();

      // Update elements with translations
      translateElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = translations[language]?.[key] || key; // Fallback to key if translation is missing
      });

      // Save preferred language
      localStorage.setItem('preferredLanguage', language);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  // Load preferred language or default to English
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  languageSelector.value = savedLanguage; // Set the dropdown to saved language
  loadTranslations(savedLanguage);
  document.documentElement.lang = savedLanguage;
  document.documentElement.dir = languageDirection[savedLanguage] || "ltr";

  // Handle language change
  languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    loadTranslations(selectedLanguage);
    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = languageDirection[selectedLanguage] || "ltr";
  });
});
