import { doc, getDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id, category } = req.body
    if (id) {
      const docRef = doc(db, category, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        res.status(200).json({
          game: 'data',
          gameServer: { ...docSnap.data(), id: docSnap.id }
        })
      } else {
        res.status(200).json({ game: 'Esta publicación ya no existe' })
      }
    } else {
      res.status(405).json({ error: 'id' })
    }
  }
}
