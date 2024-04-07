import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBvSiHIogTWXypCukyAZUEWfLX3RKzjryo',
  authDomain: 'course-mapping-489fd.firebaseapp.com',
  projectId: 'course-mapping-489fd',
  storageBucket: 'course-mapping-489fd.appspot.com',
  messagingSenderId: '35454376078',
  appId: '1:35454376078:web:850d64fd8d03484090d1df',
  measurementId: 'G-VSMSGXP5F8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
