import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
