import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useOpenGameContext } from '../../../context'
import { CS2_LEVELS, CS2_POSITIONS } from '../../../domain/constants'
import { Error } from '../../../pages/registro/components/Error'
import { ArrowBack } from '../../Svg'

export const Cs2GameFrom = () => {
  const { openGame, handleOpenGame } = useOpenGameContext()
  const [initialValues] = useState({
    category: openGame,
    title: '',
    description: '',
    hours: 0,
    age: localStorage.getItem('age') || '',
    level: '',
    position: [],
    premier: '',
    typeOfGamer: ''
  })

  const schema = yup
    .object({
      title: yup
        .string()
        .required('El campo nombre es obligatorio')
        .min(3, 'El campo nombre debe tener al menos 3 caracteres')
        .max(30, 'El campo nombre debe tener como máximo 30 caracteres'),
      description: yup
        .string()
        .required('El campo descripción es obligatorio')
        .min(100, 'El campo descripción debe tener al menos 100 caracteres')
        .max(350, 'El campo descripción debe tener como máximo 350 caracteres'),
      level: yup
        .string()
        .required('El campo nivel es obligatorio'),
      position: yup
        .array()
        .required('El campo posición es obligatorio')
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
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <label className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Nombre de Jugador:
          </span>
          <input
            {...register('title')}
            className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          />
          {errors.title && <Error error={errors.title.message} />}
        </label>

        <div className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            ¿Cuál es tu nivel?:
          </span>
          <ul className='grid w-full gap-2 md:grid-cols-3'>
            {
                CS2_LEVELS.map((level) => (
                  <li key={level}>
                    <input
                      {...register('level')}
                      type='radio'
                      value={level}
                      id={level}
                      className='hidden peer'
                    />
                    <label htmlFor={level} className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                      <div className='w-full text-lg font-semibold text-center'>{level}</div>
                    </label>
                  </li>
                ))
              }
          </ul>
          {errors.level && <Error error={errors.level.message} />}
        </div>
        <div className='relative flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            ¿En qué posiciones juegas?:
          </span>
          <ul className='grid w-full gap-2 md:grid-cols-3'>
            {
                CS2_POSITIONS.map((level) => (
                  <li key={level}>
                    <input
                      {...register('position')}
                      type='checkbox'
                      value={level}
                      id={level}
                      className='hidden peer'
                    />
                    <label htmlFor={level} className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                      <div className='w-full text-lg font-semibold text-center'>{level}</div>
                    </label>
                  </li>
                ))
              }
          </ul>
          {errors.position && <Error error={errors.position.message} />}
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
            onClick={() => handleOpenGame('')}
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
