import Cookies from 'universal-cookie';
import translation from './translation.json';

let selectedLanguage = 'en';

function setLanguage(languageCode) {
  switch (languageCode) {
    case 'en':
    case 'en-US':
    case 'en-GB':
    case 'en-AU':
    case 'en-CA':
      selectedLanguage = 'en';
      break;
    case 'se':
    case 'se-SE':
    case 'se-FI':
    case 'sv':
    case 'sv-sv':
    case 'sv-SE':
    case 'sv-FI':
    case 'sv-fi':
      selectedLanguage = 'sv';
      break;
    case 'ar':
    case 'ar-SA':
    case 'ar-EG':
    case 'ar-IQ':
    case 'ar-JO':
    case 'ar-KW':
    case 'ar-LB':
    case 'ar-LY':
    case 'ar-MA':
    case 'ar-OM':
    case 'ar-QA':
    case 'ar-SA':
    case 'ar-SY':
    case 'ar-TN':
    case 'ar-AE':
    case 'ar-YE':
      selectedLanguage = 'ar';
      break;
    default:
      selectedLanguage = 'en';
      break;
  }
}

function t(key) {
  const cookies = new Cookies();
  let lang = cookies.get('language') ? cookies.get('language') : 'sv';
  setLanguage(lang);
  return translation[key] ? translation[key][selectedLanguage] : key;
}

export { t, setLanguage };