import { doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    const userRef = doc(db, COLLECTIONS.users, data.uid)
    await updateDoc(userRef, {
      description: data.description,
      age: data.age,
      profileImg: {
        url: data.imageUrl,
        name: data.imageName
      },
      social: {
        twitter: data.twitter,
        discord: data.discord,
        instagram: data.instagram,
        youtube: data.youtube,
        tiktok: data.tiktok,
        facebook: data.facebook,
        twitch: data.twitch
      }
    }).then(() => {
      res.status(200).json({ message: 'update' })
    }).catch(() => {
      res.status(500).json({ error: 'Ha ocurrido un error durante al actualizar los datos' })
    })
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}
