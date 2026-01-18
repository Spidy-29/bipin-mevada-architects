import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";

// Validate Firebase environment variables
const firebaseEnvVars = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check for missing required Firebase config values
const missingVars = Object.entries(firebaseEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.warn('⚠️ Missing Firebase environment variables:', missingVars);
  console.warn('Please ensure .env file exists with all VITE_FIREBASE_* variables');
}

const firebaseConfig = {
  apiKey: firebaseEnvVars.apiKey || '',
  authDomain: firebaseEnvVars.authDomain || '',
  projectId: firebaseEnvVars.projectId || '',
  storageBucket: firebaseEnvVars.storageBucket || '',
  messagingSenderId: firebaseEnvVars.messagingSenderId || '',
  appId: firebaseEnvVars.appId || '',
  measurementId: firebaseEnvVars.measurementId || '',
};

// Validate critical Firebase config before initialization
if (!firebaseConfig.projectId) {
  console.error('❌ Firebase projectId is missing. Firebase will not be initialized.');
  throw new Error('Firebase configuration is incomplete. Missing projectId.');
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  throw error;
}

// Initialize Analytics
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  // Only initialize analytics on the client side
  analytics = getAnalytics(app);
}

export { app, analytics };

export const logAnalyticsEvent = (eventName: string, eventParams?: { [key: string]: any }) => {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};
