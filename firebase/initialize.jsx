import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = initializeApp({
  apiKey: 'AIzaSyAuTBLsyAmmvyJa2WRYAPskWyyJTSefJEw',
  authDomain: 'mix-wik.firebaseapp.com',
  projectId: 'mix-wik',
  storageBucket: 'mix-wik.appspot.com',
  messagingSenderId: '781666779937',
  appId: '1:781666779937:web:80d8392a10344786bfb460'
})

export const db = getFirestore(firebaseConfig)
