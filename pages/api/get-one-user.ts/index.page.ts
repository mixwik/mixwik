import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid } = req.body
    if (uid) {
      const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.users), where('uid', '==', uid)))
      if (querySnapshot.empty) {
        res.status(200).json('No-data')
      } else {
        querySnapshot.forEach((doc) => {
          res.status(200).json({
            ...doc.data(),
            id: doc.id
          })
        })
      }
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
