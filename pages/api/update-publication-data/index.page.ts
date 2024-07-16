import { doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)
    const userRef = doc(db, data.category, data.id)
    await updateDoc(userRef, {
      title: data.title,
      description: data.description,
      hours: data.hours,
      level: data.level,
      preferenceTeam: data.preferenceTeam,
      position: data.position,
      premier: data.premier,
      typeOfGamer: data.typeOfGamer,
      affiliateCode: data.affiliateCode,
      img: {
        url: data.imgUrl || '',
        name: data.imageName || ''
      },
      img2: {
        url: data.imgUrl2 || '',
        name: data.imageName2 || ''
      },
      img3: {
        url: data.imgUrl3 || '',
        name: data.imageName3 || ''
      },
      img4: {
        url: data.imgUrl4 || '',
        name: data.imageName4 || ''
      },
      img5: {
        url: data.imgUrl5 || '',
        name: data.imageName5 || ''
      },
      img6: {
        url: data.imgUrl6 || '',
        name: data.imageName6 || ''
      },
      img7: {
        url: data.imgUrl7 || '',
        name: data.imageName7 || ''
      }
    }).then(() => {
      res.status(200).json({ message: 'Game updated' })
    }).catch(() => {
      res.status(500).json({ error: 'Ha ocurrido un error durante al actualizar los datos' })
    })
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}
