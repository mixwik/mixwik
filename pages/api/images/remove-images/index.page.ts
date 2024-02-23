import { addDoc, collection } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../../domain/constants'
import { db } from '../../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, email, geometry } = req.body

    if (uid && email && geometry) {
      await addDoc(collection(db, COLLECTIONS.users), {
        geometry,
        uid,
        email,
        ban: false,
        dateOfRegister: new Date(),
        admonition: 0,
        cs2Publications: 0,
        fortnitePublications: 0,
        valorantPublications: 0,
        lolPublications: 0
      })
      res.status(200).json('step-2')
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}
