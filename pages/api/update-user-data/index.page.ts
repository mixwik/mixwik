import { doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'UPDATE') {
    const { uid, age, description, twitter, discord, instagram, youtube, tiktok, facebook, twitch } = req.body
    const userRef = doc(db, COLLECTIONS.users, uid)
    await updateDoc(userRef, {
      description,
      age,
      social: {
        twitter,
        discord,
        instagram,
        youtube,
        tiktok,
        facebook,
        twitch
      }
    }).then(() => {
      res.status(200).json({ message: 'update' })
    }).catch(() => {
      res.status(500).json({ message: 'error' })
    })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
