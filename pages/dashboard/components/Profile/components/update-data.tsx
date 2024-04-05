import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { PopUpError } from '../../../../../components/pop-up-error'
import { PopUpMessage } from '../../../../../components/pop-up-message'
import { REGEX } from '../../../../../domain/regex'
import { UserServer } from '../../../../../domain/types'
import { DiscordIcon } from '../../../../../icons/social/discord'
import { FacebookIcon } from '../../../../../icons/social/facebook'
import { InstagramIcon } from '../../../../../icons/social/instagram'
import { TikTokIcon } from '../../../../../icons/social/tik-tok'
import { TwitchIcon } from '../../../../../icons/social/twitch'
import { TwitterIcon } from '../../../../../icons/social/twitter'
import { YoutubeIcon } from '../../../../../icons/social/youtube'
import { Error } from '../../../../registro/components/Error'
import { FieldImage } from './image-field'

interface UpdateDataProps {
  user: UserServer
  mixWikTeams: boolean
  setEdit: React.Dispatch<React.SetStateAction<boolean>>
  setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateData = ({ user, mixWikTeams, setEdit, setRefetch }: UpdateDataProps) => {
  const [imgURL, setImgURL] = useState('')
  const [loading, setLoading] = useState({
    title: '',
    subtitle: '',
    number: 0
  })
  const [error, setError] = useState('')
  const [image, setImage] = useState<File>()
  const [initialValues] = useState({
    age: user.age || '',
    description: user.description || '',
    discord: user.social?.discord || '',
    twitter: user.social?.twitter || '',
    instagram: user.social?.instagram || '',
    facebook: user.social?.facebook || '',
    twitch: user.social?.twitch || '',
    youtube: user.social?.youtube || '',
    tiktok: user.social?.tiktok || ''
  })

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

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  })

  const onSubmit = async (data) => {
    const response = await fetch('/api/update-user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: user.uid,
        age: data.age,
        description: data.description,
        discord: data.discord,
        instagram: data.instagram,
        facebook: data.facebook,
        twitter: data.twitter,
        twitch: data.twitch,
        youtube: data.youtube,
        tiktok: data.tiktok,
        imageUrl: imgURL,
        imageName: image?.name
      })
    })
    const update = await response.json()
    if (update.message === 'update') {
      setLoading({
        title: 'Datos actualizados',
        subtitle: 'Tus datos se han actualizado correctamente',
        number: 0
      })
      setRefetch(prev => !prev)
      setTimeout(() => {
        setEdit(false)
      }, 1000)
    } else {
      setError(update.error)
      setTimeout(() => {
        setError('')
      }, 2000)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center p-5'>
      <PopUpError error={error} />
      <PopUpMessage loading={loading} />
      <div className='flex flex-col items-center w-4/5 gap-10'>
        <FieldImage
          image={image}
          setImage={setImage}
          setImgURL={setImgURL}
          imgURL={imgURL}
        />
        <label className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Fecha de nacimiento:
          </span>
          <input
            {...register('age')}
            type='date'
            className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
          {errors.age && <Error error={errors.age.message} />}
        </label>
        <label className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Descripción:
          </span>
          <textarea
            {...register('description')}
            className='block w-full h-40 p-5 mt-1 bg-gray-100 border-none shadow-lg resize-none rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
          {errors.description && <Error error={errors.description.message} />}
        </label>
        <label className='flex flex-col justify-center w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Discord:
          </span>
          <div className='relative flex items-center'>
            <DiscordIcon className='absolute size-6 right-3' />
            <input
              {...register('discord', { pattern: REGEX.discord, required: 'El campo discord es obligatorio' })}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
            />
            {errors.discord && <Error error={errors.discord.message} />}
          </div>
        </label>
        <label className='flex flex-col justify-center w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Twitter:
          </span>
          <div className='relative flex items-center'>
            <TwitterIcon className='absolute size-6 right-3' />
            <input
              {...register('twitter', { pattern: REGEX.twitter, required: 'El campo twitter es obligatorio' })}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
            />
            {errors.twitter && <Error error={errors.twitter.message} />}
          </div>
        </label>
        {
          mixWikTeams
            ? (
              <>
                <label className='flex flex-col justify-center w-full gap-2'>
                  <span className='font-semibold text-slate-900'>
                    Instagram:
                  </span>
                  <div className='relative flex items-center'>
                    <InstagramIcon className='absolute size-6 right-3' />
                    <input
                      {...register('instagram', { pattern: REGEX.instagram, required: 'El campo instagram es obligatorio' })}
                      className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                    />
                    {errors.instagram && <Error error={errors.instagram.message} />}
                  </div>
                </label>
                <label className='flex flex-col justify-center w-full gap-2'>
                  <span className='font-semibold text-slate-900'>
                    Facebook:
                  </span>
                  <div className='relative flex items-center'>
                    <FacebookIcon className='absolute size-6 right-3' />
                    <input
                      {...register('facebook', { pattern: REGEX.facebook, required: 'El campo facebook es obligatorio' })}
                      className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                    />
                    {errors.facebook && <Error error={errors.facebook.message} />}
                  </div>
                </label>
                <label className='flex flex-col justify-center w-full gap-2'>
                  <span className='font-semibold text-slate-900'>
                    Twitch:
                  </span>
                  <div className='relative flex items-center'>
                    <TwitchIcon className='absolute size-6 right-3' />
                    <input
                      {...register('twitch', { pattern: REGEX.twitch, required: 'El campo twitch es obligatorio' })}
                      className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                    />
                    {errors.twitch && <Error error={errors.twitch.message} />}
                  </div>
                </label>
                <label className='flex flex-col justify-center w-full gap-2'>
                  <span className='font-semibold text-slate-900'>
                    Youtube:
                  </span>
                  <div className='relative flex items-center'>
                    <YoutubeIcon className='absolute size-6 right-3' />
                    <input
                      {...register('youtube', { pattern: REGEX.youtube, required: 'El campo youtube es obligatorio' })}
                      className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                    />
                    {errors.youtube && <Error error={errors.youtube.message} />}
                  </div>
                </label>
                <label className='flex flex-col justify-center w-full gap-2'>
                  <span className='font-semibold text-slate-900'>
                    Tiktok:
                  </span>
                  <div className='relative flex items-center'>
                    <TikTokIcon className='absolute size-6 right-3' />
                    <input
                      {...register('tiktok', { pattern: REGEX.tiktok, required: 'El campo tiktok es obligatorio' })}
                      className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                    />
                    {errors.tiktok && <Error error={errors.tiktok.message} />}
                  </div>
                </label>
              </>
              )
            : (
              <div className='flex flex-col justify-center w-full'>
                <p>Para añadir más redes sociales (youtube, twitch, instagram, tiktok, facebook) debes ser parte de MixWik Teams</p>
                <a href='/dashboard?page=mixWikTeams' className='flex items-center gap-1 text-sm font-bold md:text-base text-aero'>
                  Conocer más
                </a>
              </div>
              )
        }
        <div className='flex gap-5'>
          <button
            type='button'
            onClick={() => setEdit(false)}
            className='w-1/2 py-3 font-bold text-aero'
          >
            Cancelar
          </button>
          <button
            type='submit'
            className='w-1/2 px-5 py-3 text-white bg-pennBlue rounded-xl'
          >
            Guardar
          </button>
        </div>
      </div>
    </form>
  )
}
