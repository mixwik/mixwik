import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ArrowBack, DiscordIcon, TwitterIcon } from '../../../../components/Svg'
import { REGEX } from '../../../../domain/regex'
import { ToastError } from '../toastError'

export const Step4 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [initialValues] = useState({
    twitter: localStorage.getItem('twitter') || '',
    discord: localStorage.getItem('discord') || ''
  })
  const schema = yup
    .object({
      twitter: yup
        .string()
        .required('El campo Twitter es obligatorio')
        .matches(REGEX.twitter, 'El campo twitter no es valido'),
      discord: yup
        .string()
        .required('El campo Discord es obligatorio')
        .matches(REGEX.discord, 'El campo discord no es valido')
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema), defaultValues: initialValues })

  const onSubmit = (data) => {
    localStorage.setItem('twitter', data.twitter)
    localStorage.setItem('discord', data.discord)
    setSteps('step-5')
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Añade tus Redes sociales</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <label className='relative flex items-center w-full gap-2 md:w-1/2'>
          <TwitterIcon className='absolute w-6 h-6 right-2' />
          <span className='font-semibold text-slate-900'>
            Twitter:
          </span>
          <input
            {...register('twitter')}
            className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
        </label>
        <label className='relative flex items-center w-full gap-2 md:w-1/2'>
          <DiscordIcon className='absolute w-6 h-6 right-2' />
          <span className='font-semibold text-slate-900'>
            Discord:
          </span>
          <input
            {...register('discord', { pattern: REGEX.discord, required: 'El campo discord es obligatorio' })}
            className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
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
        {errors.twitter && <ToastError error={errors.twitter.message} />}
        {errors.discord && <ToastError error={errors.discord.message} />}
      </form>
    </section>
  )
}
