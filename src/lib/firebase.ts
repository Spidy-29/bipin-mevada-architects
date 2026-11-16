import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";

// Validate Firebase environment variables
const firebaseEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Check for missing required Firebase config values
const missingVars = Object.entries(firebaseEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

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
  throw new Error('Firebase configuration is incomplete. Missing projectId.');
}

// Reuse the default app across Next.js server/client module reloads.
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

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
