import { doc, increment, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { category, uid, number } = req.body
    const userRef = doc(db, COLLECTIONS.users, uid)
    if (category === COLLECTIONS.cs2) {
      await updateDoc(userRef, {
        'publications.cs2Publications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    } else if (category === COLLECTIONS.fortnite) {
      await updateDoc(userRef, {
        'publications.fortnitePublications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    } else if (category === COLLECTIONS.lol) {
      await updateDoc(userRef, {
        'publications.lolPublications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    } else if (category === COLLECTIONS.valorant) {
      await updateDoc(userRef, {
        'publications.valorantPublications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    } else if (category === COLLECTIONS.rocketLeague) {
      await updateDoc(userRef, {
        'publications.rocketLeaguePublications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    } else if (category === COLLECTIONS.dota2) {
      await updateDoc(userRef, {
        'publications.dota2Publications': increment(number)
      }).then(() => {
        res.status(200).json({ message: 'Publication count updated' })
      })
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
