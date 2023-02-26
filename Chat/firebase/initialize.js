import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyDPZyeqBzrPsL30QZvyQdzfeMu0T0WIlUI',
  authDomain: 'mix-wik-chat.firebaseapp.com',
  projectId: 'mix-wik-chat',
  storageBucket: 'mix-wik-chat.appspot.com',
  messagingSenderId: '531984828348',
  appId: '1:531984828348:web:f8d26e44272912ff328db9'
})

export const db = getFirestore(firebaseConfig)
