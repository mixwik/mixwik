import { addDoc, collection } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../firebase/initialize'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const response = req.body
    const data = JSON.parse(response)

    if (data.title < 3 || data.title > 30 || data.title === '') {
      return res.status(400).json({ message: 'El titulo no es válido' })
    } else if (data.description < 100 || data.description > 350 || data.description === '') {
      return res.status(400).json({ message: 'La descripción no es válida' })
    } else if (data.level === '' || data.level === undefined || data.level === null) {
      return res.status(400).json({ message: 'El nivel no es válido' })
    } else if (data.premier === '' || data.premier === undefined || data.premier === null) {
      return res.status(400).json({ message: 'El premier no es válido' })
    } else if (data.position.length === 0) {
      return res.status(400).json({ message: 'La posición no es válida' })
    } else if (data.typeOfGamer.length === 0) {
      return res.status(400).json({ message: 'El tipo de jugador no es válido' })
    } else if (data.hours < 1 || data.hours > 5000 || data.hours === '') {
      return res.status(400).json({ message: 'Las horas no son válidas' })
    } else if (data.imageName === '' || data.imageName === undefined || data.imageName === null) {
      return res.status(400).json({ message: 'La imagen no es válida' })
    } else if (data.imgUrl === '' || data.imgUrl === undefined || data.imgUrl === null) {
      return res.status(400).json({ message: 'La url de la imagen no es válida' })
    } else if (data.category === '' || data.category === undefined || data.category === null) {
      return res.status(400).json({ message: 'La categoría no es válida' })
    } else if (data.uid === '' || data.uid === undefined || data.uid === null) {
      return res.status(400).json({ message: 'El usuario no es válido' })
    } else if (data.geometry === '' || data.geometry === undefined || data.geometry === null) {
      return res.status(400).json({ message: 'La ubicación no es válida' })
    } else {
      await addDoc(collection(db, data.category), {
        date: new Date(),
        position: data.position,
        level: data.level,
        premier: data.premier,
        typeOfGamer: data.typeOfGamer,
        hours: data.hours,
        title: data.title,
        description: data.description,
        uid: data.uid,
        geometry: data.geometry,
        category: data.category,
        age: data.age,
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
      })
      return res.status(200).json({ message: 'Game created' })
    }
  }
}
