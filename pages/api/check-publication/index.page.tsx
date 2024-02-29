import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid } = req.body

    if (uid) {
      const publicationArray = [
        COLLECTIONS.cs2,
        COLLECTIONS.fortnite,
        COLLECTIONS.valorant,
        COLLECTIONS.lol,
        COLLECTIONS.rocketLeague,
        COLLECTIONS.dota2
      ]

      const check = async (collections) => {
        const userRef = collection(db, collections)
        const q = query(userRef, where('uid', '==', uid))
        const querySnapshot = await getDocs(q)
        return querySnapshot.empty
      }

      for (const value of publicationArray) {
        const result = await check(value)
        if (!result) {
          res.status(200).json({ publication: value, check: true })
          return
        }
        res.status(200).json({ check: false })
      }
    }
  } else {
    res.status(405).json({ error: 'No game publication' })
  }
}
