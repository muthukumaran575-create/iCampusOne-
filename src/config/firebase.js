import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Production Firebase Credentials
const firebaseConfig = {
  apiKey: "AIzaSyBEluuO9Ut3J7kqFrNL1zcam3RloyR3uOU",
  authDomain: "icampusone-a17a1.firebaseapp.com",
  projectId: "icampusone-a17a1",
  storageBucket: "icampusone-a17a1.firebasestorage.app",
  messagingSenderId: "179713553691",
  appId: "1:179713553691:web:fbeb6ddb70408ba1128fbe",
  measurementId: "G-1BKML3Z336"
};

// Initialize Firebase Core
const app = initializeApp(firebaseConfig);

// Initialize Authentication & Firestore Database
export const auth = getAuth(app);
export const db = getFirestore(app, "asia-south1"); // Mumbai High-Speed Cluster

// Enforce Local Persistence (Session auto-saved for users)
setPersistence(auth, browserLocalPersistence)
  .catch((error) => console.error("Persistence error:", error.message));

export default app;
