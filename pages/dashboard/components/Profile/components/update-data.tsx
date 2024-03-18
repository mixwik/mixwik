import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears, parseISO } from 'date-fns'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
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
}

export const UpdateData = ({ user, mixWikTeams }: UpdateDataProps) => {
  const [imgURL, setImgURL] = useState('')
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
        .min(100, 'La descripción debe tener al menos 100 caracteres')
        .max(350, 'La descripción debe tener máximo 350 caracteres')
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
    const updateData = await fetch('/api/update-user-data', {
      method: 'UPDATE',
      body: JSON.stringify({
        uid: user.uid,
        age: data.age,
        description: data.description,
        discord: data.discord,
        twitter: data.twitter,
        instagram: data.instagram,
        facebook: data.facebook,
        twitch: data.twitch,
        youtube: data.youtube,
        tiktok: data.tiktok
      })
    })
    const response = await updateData.json()
    if (response.message === 'update') {
      alert('Datos actualizados')
    } else {
      alert('Error al actualizar los datos')
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex justify-center p-5'>
      <div className='flex flex-col items-center w-4/5 gap-5'>
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
          </div>
          {errors.discord && <Error error={errors.discord.message} />}
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
          </div>
          {errors.twitter && <Error error={errors.twitter.message} />}
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
                  </div>
                  {errors.instagram && <Error error={errors.instagram.message} />}
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
                  </div>
                  {errors.facebook && <Error error={errors.facebook.message} />}
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
                  </div>

                  {errors.twitch && <Error error={errors.twitch.message} />}
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
                  </div>

                  {errors.youtube && <Error error={errors.youtube.message} />}
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
                  </div>
                  {errors.tiktok && <Error error={errors.tiktok.message} />}
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

        <button
          type='submit'
          className='w-1/2 py-3 text-white bg-pennBlue rounded-xl'
        >
          Guardar
        </button>
      </div>
    </form>
  )
}
