import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { CATEGORIES } from '../../../domain/constants'
import { gameServer, teamServer } from '../../../domain/types'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.body
    if (id) {
      const publications = [] as gameServer[] | teamServer[]
      const push = (docSnap) => {
        publications.push({
          id: docSnap.id,
          type: docSnap.data().type,
          category: docSnap.data().category,
          uid: docSnap.data().uid,
          date: docSnap.data().date,
          title: docSnap.data().title,
          description: docSnap.data().description,
          hours: docSnap.data().hours,
          age: docSnap.data().age,
          level: docSnap.data().level,
          premier: docSnap.data().premier,
          preferenceTeam: docSnap.data().preferenceTeam,
          position: docSnap.data().position,
          typeOfGamer: docSnap.data().typeOfGamer,
          geometry: docSnap.data().geometry,
          promotion: docSnap.data().promotion,
          affiliateCode: docSnap.data().affiliateCode,
          img: {
            url: docSnap.data().img.url,
            name: docSnap.data().img.name
          },
          img2: {
            url: docSnap.data().img2.url,
            name: docSnap.data().img2.name
          },
          img3: {
            url: docSnap.data().img3.url,
            name: docSnap.data().img3.name
          },
          img4: {
            url: docSnap.data().img4.url,
            name: docSnap.data().img4.name
          },
          img5: {
            url: docSnap.data().img5.url,
            name: docSnap.data().img5.name
          },
          img6: {
            url: docSnap.data().img6.url,
            name: docSnap.data().img6.name
          },
          img7: {
            url: docSnap.data().img7.url,
            name: docSnap.data().img7.name
          }
        })
      }
      for (const category of CATEGORIES) {
        const querySnapshot = await getDocs(query(collection(db, category), where('uid', '==', id)))
        querySnapshot.forEach((doc) => {
          push(doc)
        })
      }
      res.status(200).json(publications)
    } else {
      res.status(405).json({ error: 'id' })
    }
  }
}
