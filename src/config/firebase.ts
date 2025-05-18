import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Validate configuration
const requiredFields = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId'
] as const;

const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
if (missingFields.length > 0) {
  console.error('Missing Firebase configuration:', missingFields);
  throw new Error(`Missing Firebase configuration: ${missingFields.join(', ')}`);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Log successful initialization
console.log('Firebase initialized with project:', firebaseConfig.projectId);

export default app; 