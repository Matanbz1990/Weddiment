import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const fireBaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_MESAGING_SENDER_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESURMENT_ID,
};

const app = firebase.initializeApp(fireBaseConfig);
export const auth = app.auth();
export const db = firebase.firestore(app);

export default app;
