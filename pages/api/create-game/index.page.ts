import { addDoc, collection } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { db } from '../../../firebase/initialize'

const schema = yup.object({
  title: yup
    .string()
    .required('El campo nombre es obligatorio')
    .min(3, 'Mínimo 3 caracteres')
    .max(30, 'Máximo 30 caracteres'),
  description: yup
    .string()
    .required('El campo descripción es obligatorio')
    .min(100, 'Mínimo 100 caracteres')
    .max(350, 'Máximo 350 caracteres'),
  level: yup
    .string(),
  premier: yup
    .string(),
  position: yup
    .array()
    .min(1, 'Selecciona al menos una posición'),
  preferenceTeam: yup
    .array(),
  typeOfGamer: yup
    .array()
    .min(1, 'Selecciona al menos un tipo'),
  hours: yup
    .number()
    .required('El campo horas es obligatorio')
    .min(1, 'El campo horas es obligatorio')
    .max(5000, 'Máximo 5000 horas')
})

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = JSON.parse(req.body)

    try {
      await schema.validate(data)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    await addDoc(collection(db, data.category), {
      date: new Date(),
      type: data.type,
      position: data.position,
      level: data.level,
      premier: data.premier,
      preferenceTeam: data.preferenceTeam,
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
