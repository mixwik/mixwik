import { collection, getCountFromServer, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, collections, isMixWikTeams } = req.body
    if (uid) {
      const userRef = collection(db, collections)
      const q = query(userRef, where('uid', '==', uid))
      const querySnapshot = await getCountFromServer(q)
      if (isMixWikTeams && querySnapshot.data().count >= 5) res.status(200).json({ message: 'Has llegado al límite de publicaciones' })
      else if (!isMixWikTeams && querySnapshot.data().count >= 1) res.status(200).json({ message: 'Has llegado al límite de publicaciones, puedes crear más publicaciones con MixWikTeams' })
      else res.status(200).json({ message: '' })
    }
  } else {
    res.status(405).json({ error: 'No game publication' })
  }
}
