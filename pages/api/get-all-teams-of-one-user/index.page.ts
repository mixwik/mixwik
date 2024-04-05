import { collection, getDocs, query, where } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { COLLECTIONS } from '../../../domain/constants'
import { gameServer } from '../../../domain/types'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { id } = req.body
    if (id) {
      const teamsServer = [] as gameServer[]

      const querySnapshot = await getDocs(query(collection(db, COLLECTIONS.teams), where('uid', '==', id)))
      querySnapshot.forEach((doc) => {
        teamsServer.push({
          id: doc.id,
          category: doc.data().category,
          uid: doc.data().uid,
          date: doc.data().date,
          title: doc.data().title,
          description: doc.data().description,
          hours: doc.data().hours,
          age: doc.data().age,
          level: doc.data().level,
          premier: doc.data().premier,
          preferenceTeam: doc.data().preferenceTeam,
          position: doc.data().position,
          typeOfGamer: doc.data().typeOfGamer,
          geometry: doc.data().geometry,
          promotion: doc.data().promotion,
          img: {
            url: doc.data().img.url,
            name: doc.data().img.name
          },
          img2: {
            url: doc.data().img2.url,
            name: doc.data().img2.name
          },
          img3: {
            url: doc.data().img3.url,
            name: doc.data().img3.name
          },
          img4: {
            url: doc.data().img4.url,
            name: doc.data().img4.name
          },
          img5: {
            url: doc.data().img5.url,
            name: doc.data().img5.name
          },
          img6: {
            url: doc.data().img6.url,
            name: doc.data().img6.name
          },
          img7: {
            url: doc.data().img7.url,
            name: doc.data().img7.name
          }
        })
      })
      res.status(200).json(teamsServer)
    } else {
      res.status(405).json({ error: 'id' })
    }
  }
}
