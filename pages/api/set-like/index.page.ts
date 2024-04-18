import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, likes } = req.body
    const userRef = doc(db, COLLECTIONS.users, uid)
    await updateDoc(userRef, {
      likes: arrayUnion(likes)
    }).then(() => {
      res.status(200).json({ message: 'update' })
    }).catch(() => {
      res.status(500).json({ error: 'Ha ocurrido un error durante al actualizar los datos' })
    })
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}
