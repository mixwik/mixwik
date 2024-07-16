import { collection, getDocs, query } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { UserServer } from '../../../domain/types'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const publications = [] as UserServer[]
    const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.users)))
    querySnapshot.forEach((docSnap) => {
      publications.push({
        id: docSnap.id,
        uid: docSnap.data().uid,
        age: docSnap.data().age,
        name: docSnap.data().name,
        description: docSnap.data().description,
        geometry: docSnap.data().geometry,
        admonition: docSnap.data().admonition,
        ban: docSnap.data().ban,
        dateOfRegister: docSnap.data().dateOfRegister,
        email: docSnap.data().email,
        gender: docSnap.data().gender,
        likes: docSnap.data().likes,
        mixWikTeams: docSnap.data().mixWikTeams,
        social: docSnap.data().social,
        profileImg: {
          url: docSnap.data().profileImg?.url,
          name: docSnap.data().profileImg?.name
        }
      })
    })
    res.status(200).json(publications)
  } else {
    res.status(405).json({ error: 'id' })
  }
}
