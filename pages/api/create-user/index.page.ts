import { addDoc, collection } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'
import { differenceInYears, parseISO } from 'date-fns'
const schema = yup.object().shape({
  uid: yup.string().required('Ha ocurrido un error'),
  email: yup.string().email('email').required('email'),
  geometry: yup.array().of(yup.number()).required('No se ha podido obtener la ubicación'),
  age: yup
    .string()
    .required('age')
    .test('is-over-16', 'age', function (value) {
      return differenceInYears(new Date(), parseISO(value)) >= 16
    }),
  name: yup.string().required('No se ha podido obtener el nombre').min(3, 'El nombre es muy corto').max(30, 'El nombre es muy largo'),
  description: yup.string().required('No se ha podido obtener la descripción').min(100, 'La descripción es muy corta').max(350, 'La descripción es muy larga'),
  gender: yup.string().oneOf(['M', 'F', 'O'], 'gender').required('gender'),
  twitter: yup.string(),
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
        res.status(200).json('User created')
      } catch (error) {
        res.status(400).json(error.message)
      }
    }
  }
}
