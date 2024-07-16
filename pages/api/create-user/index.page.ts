import { differenceInYears, parseISO } from 'date-fns'
import { doc, setDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { COLLECTIONS } from '../../../domain/constants'
import { db } from '../../../firebase/initialize'
const schema = yup.object().shape({
  uid: yup.string().required('Ha ocurrido un error'),
  email: yup.string().email('email').required('email'),
  geometry: yup.array().of(yup.number()).required('geometry'),
  age: yup
    .string()
    .required('age')
    .test('is-over-16', 'age', function (value) {
      return differenceInYears(new Date(), parseISO(value)) >= 16
    }),
  name: yup.string().required('name').min(3, 'name').max(30, 'name'),
  description: yup.string().required('description').min(100, 'description').max(350, 'description'),
  gender: yup.string().oneOf(['M', 'F', 'O'], 'gender').required('gender'),
  twitter: yup.string(),
  discord: yup.string(),
  cs2Publications: yup.number(),
  fortnitePublications: yup.number(),
  valorantPublications: yup.number(),
  lolPublications: yup.number(),
  rocketLeaguePublications: yup.number(),
  dota2Publications: yup.number()
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
      rocketLeaguePublications,
      dota2Publications,
      imageUrl,
      imageName
    } = req.body

    if (req.method === 'POST') {
      try {
        await schema.validate(req.body)
        await setDoc(doc(db, COLLECTIONS.users, uid), {
          geometry,
          uid,
          email,
          age,
          name,
          description,
          gender,
          profileImg: {
            url: imageUrl,
            name: imageName
          },
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
            rocketLeaguePublications,
            dota2Publications
          },
          likes: []
        })
        res.status(200).json('User created')
      } catch (error) {
        res.status(400).json(error.message)
      }
    }
  }
}
