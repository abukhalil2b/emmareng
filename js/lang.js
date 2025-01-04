document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.language-btn');
    const translateElements = document.querySelectorAll('[data-translate]');
  
    // Function to load translations
    async function loadTranslations(language) {
      try {
        const response = await fetch('./translations.json'); // Load the JSON file
        const translations = await response.json();
  
        translateElements.forEach(element => {
          const key = element.getAttribute('data-translate');
          element.textContent = translations[language][key];
        });
  
        // Save preferred language
        localStorage.setItem('preferredLanguage', language);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    }
  
    // Load preferred language or default to English
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    loadTranslations(savedLanguage);
  
    // Add click event to buttons
    languageButtons.forEach(button => {
      button.addEventListener('click', () => {
        const selectedLanguage = button.getAttribute('data-language');
        loadTranslations(selectedLanguage);
      });
    });
  });
  