import { doc, getDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, collection } = req.body
    if (id) {
      const docRef = doc(db, collection, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        res.status(200).json({
          game: 'data',
          gameServer: { ...docSnap.data() }
        })
      } else {
        res.status(200).json({ game: 'Esta publicación ya no existe' })
      }
    } else {
      res.status(405).json({ error: 'id' })
    }
  }
}
