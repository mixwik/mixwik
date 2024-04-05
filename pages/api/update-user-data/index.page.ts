import { differenceInYears, parseISO } from 'date-fns'
import { doc, updateDoc } from 'firebase/firestore'
import { NextApiRequest, NextApiResponse } from 'next'
import * as yup from 'yup'
import { COLLECTIONS } from '../../../domain/constants'
import { REGEX } from '../../../domain/regex'
import { db } from '../../../firebase/initialize'

const schema = yup
  .object({
    age: yup
      .string()
      .required('La fecha de nacimiento es obligatorio')
      .test('is-over-16', 'Debes ser mayor de 16 años.', function (value) {
        return differenceInYears(new Date(), parseISO(value)) >= 16
      }),
    description: yup
      .string()
      .required('El campo descripción es obligatorio')
      .min(100, 'Mínimo 100 caracteres')
      .max(350, 'Máximo 350 caracteres')
  })
  .shape({
    twitter: yup
      .string()
      .notRequired()
      .when('twitter', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.twitter, 'La URL de twitter no es valida')
      }),
    discord: yup
      .string()
      .notRequired()
      .when('discord', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.discord, 'La URL de twitter no es valida')
      }),
    instagram: yup
      .string()
      .notRequired()
      .when('instagram', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.instagram, 'La URL de instagram no es valida')
      }),
    facebook: yup
      .string()
      .notRequired()
      .when('facebook', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.facebook, 'La URL de facebook no es valida')
      }),
    twitch: yup
      .string()
      .notRequired()
      .when('twitch', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.twitch, 'La URL de twitch no es valida')
      }),
    youtube: yup
      .string()
      .notRequired()
      .when('youtube', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.youtube, 'La URL de youtube no es valida')
      }),
    tiktok: yup
      .string()
      .notRequired()
      .when('tiktok', {
        is: (value: string) => value?.length,
        then: (rule) => rule.matches(REGEX.tiktok, 'La URL de tiktok no es valida')
      })
  }, [['twitter', 'twitter'], ['discord', 'discord'], ['instagram', 'instagram'], ['facebook', 'facebook'], ['twitch', 'twitch'], ['youtube', 'youtube'], ['tiktok', 'tiktok']])
  .test(
    'at-least-one-input',
    'Al menos uno de los dos campos debe estar lleno',
    obj => !!obj.twitter || !!obj.discord || !!obj.instagram || !!obj.facebook || !!obj.twitch || !!obj.youtube || !!obj.tiktok
  )
  .required()

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, age, description, twitter, discord, instagram, youtube, tiktok, facebook, twitch, imageUrl, imageName } = req.body
    try {
      await schema.validate(req.body)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
    const userRef = doc(db, COLLECTIONS.users, uid)
    await updateDoc(userRef, {
      description,
      age,
      profileImg: {
        url: imageUrl,
        name: imageName
      },
      social: {
        twitter,
        discord,
        instagram,
        youtube,
        tiktok,
        facebook,
        twitch
      }
    }).then(() => {
      res.status(200).json({ message: 'update' })
    }).catch(() => {
      res.status(500).json({ error: 'Ha ocurrido un error durante al actualizar los datos' })
    })
  } else {
    res.status(405).json({ error: 'Método no permitido' })
  }
}
