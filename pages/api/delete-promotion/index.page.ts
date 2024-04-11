import { deleteField, doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { category, id } = req.body
    const publicationRef = doc(db, category, id)
    await updateDoc(publicationRef, {
      promotion: deleteField()
    }).then(() => {
      res.status(200).json({ message: 'delete promotion' })
    }).catch(() => {
      res.status(500).json({ error: 'Ha ocurrido un error durante al actualizar los datos' })
    })
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}
