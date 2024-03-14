import { doc, getDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid } = req.body
    if (uid) {
      const docRef = doc(db, COLLECTIONS.users, uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        res.status(200).json({
          user: 'data',
          userServer: { ...docSnap.data() }
        })
      } else {
        res.status(200).json({ user: 'no-data' })
      }
    } else {
      res.status(405).json({ error: 'uid undefine' })
    }
  }
}
