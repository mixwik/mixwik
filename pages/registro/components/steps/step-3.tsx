import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears, parseISO } from 'date-fns'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ArrowBack } from '../../../../components/Svg'
import { Error } from '../Error'

export const Step3 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [initialValues] = useState({
    name: localStorage.getItem('name') || '',
    age: localStorage.getItem('age') || '',
    description: localStorage.getItem('description') || '',
    gender: localStorage.getItem('gender') || ''
  })

  const schema = yup
    .object({
      name: yup
        .string()
        .required('El campo nombre es obligatorio')
        .min(3, 'El campo nombre debe tener al menos 3 caracteres')
        .max(30, 'El campo nombre debe tener como máximo 30 caracteres'),
      age: yup
        .string()
        .required('El campo fecha de nacimiento es obligatorio')
        .test('is-over-16', 'Debes ser mayor de 16 años.', function (value) {
          return differenceInYears(new Date(), parseISO(value)) >= 16
        }),
      description: yup
        .string()
        .required('El campo descripción es obligatorio')
        .min(100, 'El campo descripción debe tener al menos 100 caracteres')
        .max(350, 'El campo descripción debe tener como máximo 350 caracteres'),
      gender: yup
        .string()
        .required('El campo genero es obligatorio')
        .oneOf(['M', 'F', 'O'], 'Selecciona un genero')
    })
    .required()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  })

  const onSubmit = (data) => {
    localStorage.setItem('name', data.name)
    localStorage.setItem('age', data.age)
    localStorage.setItem('description', data.description)
    localStorage.setItem('gender', data.gender)
    localStorage.setItem('step', 'step-4')
    setSteps('step-4')
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <div
          className='grid w-full gap-5 md:grid-cols-2'
        >
          <label className='relative flex flex-col gap-2'>
            <span className='font-semibold text-slate-900'>
              Nombre:
            </span>
            <input
              {...register('name')}
              className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
            />
            {errors.name && <Error error={errors.name.message} />}
          </label>
          <label className='relative flex flex-col gap-2'>
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
        </div>
        <div className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Genero:
          </span>
          <ul className='grid w-full gap-2 md:grid-cols-3'>
            <li>
              <input
                {...register('gender')}
                type='radio'
                value='M'
                id='m'
                className='hidden peer'
              />
              <label htmlFor='m' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>Masculino</div>
              </label>
            </li>
            <li>
              <input
                {...register('gender')}
                type='radio'
                value='F'
                id='f'
                className='hidden peer'
              />
              <label htmlFor='f' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>Femenino</div>
              </label>
            </li>
            <li>
              <input
                {...register('gender')}
                type='radio'
                value='O'
                id='o'
                className='hidden peer'
              />
              <label htmlFor='o' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>Otro</div>
              </label>
            </li>
          </ul>
          {errors.gender && <Error error={errors.gender.message} />}
        </div>
        <div className='relative w-full'>
          <label className='flex flex-col w-full gap-2'>
            <span className='font-semibold text-slate-900'>
              Describete:
            </span>
            <textarea
              className='w-full p-5 mt-1 bg-gray-100 border-none shadow-lg resize-none rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              placeholder='Máximo 350 caracteres'
              rows={3}
              {...register('description')}
            />
          </label>
          <span className='absolute z-10 bottom-2 right-2'>{watch('description').length > 0 ? watch('description').length : 0}/350</span>
          {errors.description && <Error error={errors.description.message} />}
        </div>
        <div className='flex justify-center w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setSteps('step-2')}
          >
            <ArrowBack className='w-6 h-6 text-white' />
            Volver
          </button>
          <button
            className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
            type='submit'
          >Guardar y continuar
          </button>
        </div>
      </form>
    </section>
  )
}
