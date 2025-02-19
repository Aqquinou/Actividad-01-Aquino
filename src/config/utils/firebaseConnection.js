import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDl1rhI0L00Au5JEzo2nXXa1x7RYAICpLY",
    authDomain: "tienda-utez-58619.firebaseapp.com",
    projectId: "tienda-utez-58619",
    storageBucket: "tienda-utez-58619.firebasestorage.app",
    messagingSenderId: "779247651814",
    appId: "1:779247651814:web:56e87fd8e49617031a2427"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth, db, storage };