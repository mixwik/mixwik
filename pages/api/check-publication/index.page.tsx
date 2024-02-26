import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      uid,
      cs2Publications,
      fortnitePublications,
      valorantPublications,
      lolPublications,
      rocketLeaguePublications,
      dota2Publications
    } = req.body
    if (uid) {
      if (cs2Publications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.cs2), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ cs2Publication: 1, check: true })
        }
      } else if (fortnitePublications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.fortnite), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ fortnitePublications: 1, check: true })
        }
      } else if (valorantPublications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.valorant), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ valorantPublications: 1, check: true })
        }
      } else if (lolPublications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.lol), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ lolPublications: 1, check: true })
        }
      } else if (rocketLeaguePublications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.rocketLeague), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ rocketLeaguePublications: 1, check: true })
        }
      } else if (dota2Publications === 1) {
        const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.dota2), where('uid', '==', uid)))
        if (querySnapshot.empty) {
          res.status(200).json({ check: false })
        } else {
          res.status(200).json({ dota2Publications: 1, check: true })
        }
      }
    }
  } else {
    res.status(405).json({ error: 'No game publication' })
  }
}
