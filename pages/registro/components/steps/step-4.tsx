import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import { ArrowBack } from '../../../../components/Svg'
import { REGEX } from '../../../../domain/regex'
import { DiscordIcon } from '../../../../icons/social/discord'
import { SteamIcon } from '../../../../icons/social/steam'
import { TwitterIcon } from '../../../../icons/social/twitter'

export const Step4 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [initialValues] = useState({
    twitter: localStorage.getItem('twitter') || '',
    discord: localStorage.getItem('discord') || '',
    steam: localStorage.getItem('steam') || ''
  })
  const schema = yup
    .object()
    .shape({
      twitter: yup
        .string()
        .notRequired()
        .when('twitter', {
          is: (value: string) => value?.length,
          then: (rule) => rule.matches(REGEX.twitterOrX)
        }),
      discord: yup
        .string()
        .notRequired()
        .when('discord', {
          is: (value: string) => value?.length,
          then: (rule) => rule.matches(REGEX.discord)
        }),
      steam: yup
        .string()
        .notRequired()
        .when('steam', {
          is: (value: string) => value?.length,
          then: (rule) => rule.matches(REGEX.steam)
        })
    }, [['twitter', 'twitter'], ['discord', 'discord'], ['steam', 'steam']])
    .test(
      'at-least-one-input',
      obj => !!obj.twitter || !!obj.discord
    )
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema), defaultValues: initialValues })

  const onSubmit = (data) => {
    localStorage.setItem('twitter', data.twitter)
    localStorage.setItem('discord', data.discord)
    localStorage.setItem('steam', data.steam)
    localStorage.setItem('step', 'step-5')
    setSteps('step-5')
  }

  if (errors.twitter) toast.error('La URL de twitter no es valida')
  if (errors.discord) toast.error('La URL de discord no es valida')
  if (errors.steam) toast.error('La URL de steam no es valida')

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Añade tus Redes sociales</h2>
      <p className='text-sm text-gray-400 md:text-base'>Añade tus redes sociales para que otros usuarios puedan contactarte. <br /> <span className='font-bold'>Es obligatorio poner al menos una de estas dos</span></p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <label className='flex flex-col justify-center w-full gap-2 md:w-1/2'>
          <span className='font-semibold text-slate-900'>
            Twitter:
          </span>
          <div className='relative flex items-center'>
            <input
              {...register('twitter')}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              placeholder='https://x.com/usuario o https://twitter.com/usuario'
            />
            <TwitterIcon className='absolute size-6 right-2' />
          </div>
        </label>
        <label className='flex flex-col justify-center w-full gap-2 md:w-1/2'>
          <span className='font-semibold text-slate-900'>
            Discord:
          </span>
          <div className='relative flex items-center gap-2'>
            <input
              {...register('discord', { pattern: REGEX.discord, required: 'El campo discord es obligatorio' })}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              placeholder='https://discord.gg/usuario'
            />
            <DiscordIcon className='absolute size-6 right-2' />
          </div>
        </label>
        <label className='flex flex-col justify-center w-full gap-2 md:w-1/2'>
          <span className='font-semibold text-slate-900'>
            Steam:
          </span>
          <div className='relative flex items-center gap-2'>
            <input
              {...register('steam', { pattern: REGEX.steam, required: 'El campo steam es obligatorio' })}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              placeholder='https://steamcommunity.com/id/usuario'
            />
            <SteamIcon className='absolute size-6 right-2' />
          </div>
        </label>
        <div className='flex justify-center w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setSteps('step-3')}
          >
            <ArrowBack className='w-6 h-6 text-white' />
            Volver
          </button>
          <button
            className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
            type='submit'
          >
            Guardar y continuar
          </button>
        </div>
      </form>
    </section>
  )
}
