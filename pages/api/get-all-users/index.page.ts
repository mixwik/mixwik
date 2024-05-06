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
        age: docSnap.data().age,
        name: docSnap.data().name,
        description: docSnap.data().description,
        geometry: docSnap.data().geometry,
        admonition: docSnap.data().admonition,
        ban: docSnap.data().ban,
        affiliateCode: docSnap.data().affiliateCode,
        dateOfRegister: docSnap.data().dateOfRegister,
        email: docSnap.data().email,
        gender: docSnap.data().gender,
        likes: docSnap.data().likes,
        mixWikTeams: docSnap.data().mixWikTeams,
        publications: docSnap.data().publications,
        social: docSnap.data().social,
        profileImg: {
          url: docSnap.data().img?.url,
          name: docSnap.data().img?.name
        }
      })
    })
    res.status(200).json(publications)
  } else {
    res.status(405).json({ error: 'id' })
  }
}