import { auth, db } from "../config/firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

/**
 * 1. Register User with Custom System ID & Role
 */
export const registerUser = async (email, password, fullName, customId, role, institutionId) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: email,
      fullName: fullName,
      customSystemId: customId,
      role: role,
      institutionId: institutionId,
      isActive: true,
      createdAt: serverTimestamp()
    });

    return { success: true, user: user, role: role };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 2. Login User & Fetch Multi-Role Profile
 */
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      return { success: true, user, profile: userData };
    } else {
      throw new Error("User record not found in system database.");
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 3. Logout Session
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 4. Auth State Listener
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDocRef);
      callback({ user, profile: userSnap.exists() ? userSnap.data() : null });
    } else {
      callback({ user: null, profile: null });
    }
  });
};
