import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyC4SgOyVnojqGt24Ausj0L2Weq4S8LzqG0',
  authDomain: 'mixwik-d7666.firebaseapp.com',
  projectId: 'mixwik-d7666',
  storageBucket: 'mixwik-d7666.appspot.com',
  messagingSenderId: '284257926546',
  appId: '1:284257926546:web:4f69641c3147b1ea46954b'
})

export const db = getFirestore(firebaseConfig)
export const auth = getAuth(firebaseConfig)
export const storage = getStorage(firebaseConfig)
