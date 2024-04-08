import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, collections } = req.body

    if (uid) {
      const userRef = collection(db, collections)
      const q = query(userRef, where('uid', '==', uid))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.size > 0) {
        res.status(200).json({ check: true, publication: collections })
      } else {
        res.status(200).json({ check: false })
      }
    }
  } else {
    res.status(405).json({ error: 'No game publication' })
  }
}
