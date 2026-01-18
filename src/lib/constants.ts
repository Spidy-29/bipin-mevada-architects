
// Validate environment variables
const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const API_KEY = import.meta.env.VITE_GOOGLE_SHEET_API_KEY;

// Debug: Log what we're getting (without exposing the full key)
if (import.meta.env.DEV) {
  console.log('🔍 Environment variables check:', {
    API_URL: API_URL ? `${API_URL.substring(0, 50)}...` : 'MISSING',
    API_KEY: API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING',
    hasAPI_URL: !!API_URL,
    hasAPI_KEY: !!API_KEY,
  });
}

if (!API_URL || !API_KEY) {
  console.warn('⚠️ Missing environment variables:', {
    API_URL: !!API_URL,
    API_KEY: !!API_KEY,
  });
  console.warn('Please ensure .env file exists with VITE_GOOGLE_SHEET_API_URL and VITE_GOOGLE_SHEET_API_KEY');
  console.warn('⚠️ IMPORTANT: Restart your dev server after creating/updating .env file!');
}

// Validation Step 3: Check for correct GAS URL
if (API_URL && !API_URL.endsWith('/exec')) {
  console.warn('⚠️ POTENTIAL CONFIGURATION ISSUE: Google Apps Script URL should typically end in "/exec" for production usage.');
  if (API_URL.endsWith('/dev')) {
    console.error('❌ You are using the "/dev" URL. Please use the "/exec" URL from the "Latest Version" deployment.');
  } else if (API_URL.endsWith('/edit')) {
    console.error('❌ You are using the editor URL. Please deploy as Web App and use the "/exec" URL.');
  }
}

// Validation Step 4: Warning about pre-encoded keys
if (API_KEY && (API_KEY.includes('%') || API_KEY.includes('?'))) {
  console.warn('⚠️ Your API_KEY seems to contain URL-encoded characters or query parameters. Please provide the RAW key in the .env file. The application handles encoding automatically.');
}

export const GOOGLE_SHEET_URLS = {
  // Apps Script Web App URL
  API_URL: API_URL || '',
  API_KEY: API_KEY || '',
};

export const CONTACT_INFO = {
  email: 'bipin.mevada@yahoo.com', // Placeholder
  phone: '+91 9825346592', // Placeholder
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  whatsapp: 'https://wa.me/919825346592',
};
