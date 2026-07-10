import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, onSnapshot, getDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB2-uNjELbEI82X35egJGSTdYWGcY0CrYk",
  authDomain: "mouluksa3ada.firebaseapp.com",
  projectId: "mouluksa3ada",
  storageBucket: "mouluksa3ada.firebasestorage.app",
  messagingSenderId: "391686891157",
  appId: "1:391686891157:web:ef4b0cf48ae83c0c851d9c"
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function getAdminData() {
  try {
    const snap = await getDoc(doc(db, 'admin', 'data'))
    return snap.exists() ? snap.data() : null
  } catch {
    return null
  }
}
// Fri Jul 10 10:12:44 AM +01 2026
