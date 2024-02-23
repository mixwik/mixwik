import { addDoc, collection } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'
const schema = yup.object().shape({
  uid: yup.string().required('UID is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  geometry: yup.object().shape({
    type: yup.string().required('Type is required'),
    coordinates: yup.array().of(yup.number()).min(2).max(2).required('Coordinates are required')
  }),
  age: yup.string().required('Age is required'),
  name: yup.string().required('Name es obligatorio'),
  description: yup.string().required('Description es obligatoria'),
  gender: yup.string().oneOf(['M', 'F', 'O'], 'Invalid gender').required('Gender is required'),
  twitter: yup.string().url('Invalid Twitter URL'),
  discord: yup.string(),
  cs2Publications: yup.number(),
  fortnitePublications: yup.number(),
  valorantPublications: yup.number(),
  lolPublications: yup.number(),
  RocketLeaguePublication: yup.number(),
  Dota2Publication: yup.number()
})

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      uid,
      email,
      geometry,
      age,
      name,
      description,
      gender,
      twitter,
      discord,
      cs2Publications,
      fortnitePublications,
      valorantPublications,
      lolPublications,
      RocketLeaguePublication,
      Dota2Publication
    } = req.body

    if (req.method === 'POST') {
      try {
        await schema.validate(req.body)
        await addDoc(collection(db, COLLECTIONS.users), {
          geometry,
          uid,
          email,
          age,
          name,
          description,
          gender,
          twitter,
          discord,
          ban: false,
          dateOfRegister: new Date(),
          admonition: 0,
          social: {
            twitter,
            discord,
            instagram: '',
            facebook: '',
            youtube: '',
            twitch: '',
            tiktok: ''
          },
          publications: {
            cs2Publications,
            fortnitePublications,
            valorantPublications,
            lolPublications,
            RocketLeaguePublication,
            Dota2Publication
          }
        })
        res.status(200).json('step-2')
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    }
  }
}
