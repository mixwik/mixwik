import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useOpenGameContext } from '../../../context'
import { CS2_LEVELS, CS2_POSITIONS, CS2_PREMIER, TYPE_OF_GAME } from '../../../domain/constants'
import { Error } from '../../../pages/registro/components/Error'
import { ArrowBack } from '../../Svg'
import { BoxField } from './box-field'
import { FieldImage } from './image'

export const Cs2GameFrom = () => {
  const { openGame, handleOpenGame } = useOpenGameContext()
  const [imgUrl, setImgUrl] = useState('')
  const [error, setError] = useState(false)
  const [initialValues] = useState({
    category: openGame as string,
    title: localStorage.getItem('titleCs2') || '',
    description: localStorage.getItem('descriptionCs2') || '',
    hours: Number(localStorage.getItem('hoursCs2')) || 0,
    age: localStorage.getItem('age') || '',
    level: localStorage.getItem('levelCs2') || '',
    position: JSON.parse(localStorage.getItem('positionCs2') ?? '[]') as string[] || [],
    premier: localStorage.getItem('premierCs2') || '',
    typeOfGamer: JSON.parse(localStorage.getItem('typeOfGamerCs2') ?? '[]') as string[] || []
  })

  const schema = yup
    .object({
      title: yup
        .string()
        .required('El campo nombre es obligatorio')
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres'),
      description: yup
        .string()
        .required('El campo descripción es obligatorio')
        .min(100, 'Mínimo 100 caracteres')
        .max(350, 'Máximo 350 caracteres'),
      level: yup
        .string()
        .required('El campo nivel es obligatorio'),
      premier: yup
        .string()
        .required('El campo premier es obligatorio'),
      position: yup
        .array()
        .min(1, 'Selecciona al menos una posición'),
      typeOfGamer: yup
        .array()
        .min(1, 'Selecciona al menos un tipo'),
      hours: yup
        .number()
        .required('El campo horas es obligatorio')
        .min(1, 'El campo horas es obligatorio')
        .max(5000, 'Máximo 5000 horas')
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
    if (Object.keys(data).length > 0 && imgUrl) {
      localStorage.setItem('titleCs2', data.title)
      localStorage.setItem('descriptionCs2', data.description)
      localStorage.setItem('hoursCs2', data.hours.toString())
      localStorage.setItem('levelCs2', data.level)
      localStorage.setItem('premierCs2', data.premier)
      localStorage.setItem('positionCs2', JSON.stringify(data.position))
      localStorage.setItem('typeOfGamerCs2', JSON.stringify(data.typeOfGamer))
    } else {
      setError(true)
    }
  }

  return (
    <section className='p-5 bg-white rounded-lg size-full md:h-4/5 md:w-1/2 md:px-0 '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-10 bg-white rounded-lg size-full'
      >
        <h2 className='text-2xl font-semibold text-pennBlue'>
          Counter Strike 2
        </h2>
        <FieldImage setImgURL={setImgUrl} />
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

        <BoxField
          register={register}
          registerName='level'
          errors={errors}
          game={CS2_LEVELS}
          type='radio'
          title='¿Cuál es tu nivel en Competitivo?'
        />
        <BoxField
          register={register}
          registerName='premier'
          errors={errors}
          game={CS2_PREMIER}
          type='radio'
          title='¿Cuál es tu nivel en Premier?'
        />

        <BoxField
          register={register}
          registerName='position'
          errors={errors}
          game={CS2_POSITIONS}
          type='checkbox'
          title='¿En qué posiciones juegas?'
        />

        <BoxField
          register={register}
          registerName='typeOfGamer'
          errors={errors}
          game={TYPE_OF_GAME}
          type='checkbox'
          title='¿Qué tipo de jugador eres?'
        />
        <div className='relative w-full'>
          <label htmlFor='steps-range' className='flex flex-col w-full gap-2'>
            <span className='font-semibold text-slate-900'>
              Horas Jugadas:
            </span>
            <input
              {...register('hours')}
              id='steps-range'
              type='range'
              min='0'
              max='5000'
              step='50'
              className='w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
            />
          </label>
          <span className='absolute z-10 bottom-4 right-2'>{watch('hours') > 0 ? watch('hours') : 0}</span>
          {errors.hours && <Error error={errors.hours.message} />}
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
            disabled={!imgUrl || Object.keys(errors).length > 0}
            className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
            type='submit'
          >Guardar y continuar
          </button>
          {error && <Error error='Ha ocurrido un error' />}
        </div>
      </form>
    </section>
  )
}
