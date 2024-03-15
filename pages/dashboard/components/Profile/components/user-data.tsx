import { yupResolver } from '@hookform/resolvers/yup'
import { differenceInYears, parseISO } from 'date-fns'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { myLoader } from '../../../../../components/myLoader'
import { UserProvider, UserServer } from '../../../../../domain/types'
import { Error } from '../../../../registro/components/Error'
import { FieldImage } from './image-field'

interface User {
  user: UserServer
  userProvider: UserProvider
  edit: boolean
}

export const UserData = ({ user, userProvider, edit }: User) => {
  const [imgURL, setImgURL] = useState('')
  const [image, setImage] = useState<File>()
  const [initialValues] = useState({
    name: user.name,
    age: user.age,
    gender: user.gender,
    description: user.description || '',
    discord: user.social?.discord || '',
    twitter: user.social?.twitter || '',
    instagram: user.social?.instagram || '',
    facebook: user.social?.facebook || '',
    twitch: user.social?.twitch || '',
    youtube: user.social?.youtube || ''
  })
  const numberOfAge = differenceInYears(new Date(), parseISO(user.age))
  const schema = yup
    .object({
      name: yup
        .string()
        .required('El campo nombre es obligatorio')
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .max(30, 'El nombre debe tener como máximo 30 caracteres'),
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
        .max(350, 'La descripción debe tener máximo 350 caracteres'),
      gender: yup
        .string()
        .required('El campo genero es obligatorio')
        .oneOf(['M', 'F', 'O'], 'Selecciona un genero')
    })
    .required()

  const {
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues
  })

  const onSubmit = (data) => {

  }
  return (
    <form onSubmit={onSubmit}>
      <div className='relative flex justify-center h-64'>
        <Image className='object-cover h-40' src={user.profileImg ? user.profileImg : userProvider?.image} alt={user.name} width={100} height={100} loader={myLoader} />
        {edit
          ? (
            <div className='absolute bottom-0'>
              <FieldImage
                image={image}
                setImage={setImage}
                setImgURL={setImgURL}
                imgURL={imgURL}
              />
            </div>
            )
          : <Image className='absolute bottom-0 object-cover mx-auto border-2 border-solid rounded-full shadow-xl size-48 border-aero' src={user.profileImg ? user.profileImg : userProvider?.image} loader={myLoader} alt={user.name} width={100} height={100} />}
      </div>
      <div className='flex flex-col items-center justify-center gap-5 pt-5'>
        <div className='flex items-center justify-center h-10'>
          {
          edit
            ? (
              <label className='relative flex flex-col'>
                <input
                  {...register('name')}
                  className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                />
                {errors.name && <Error error={errors.name.message} />}
              </label>
              )
            : <h2 className='text-2xl font-bold'>{user.name}</h2>
            }
        </div>
        <div className='flex items-center justify-center h-10'>
          {
          edit
            ? (
              <label className='relative flex flex-col'>
                <input
                  {...register('age')}
                  type='date'
                  className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
                />
                {errors.age && <Error error={errors.age.message} />}
              </label>
              )
            : <p className='text-lg'>Fecha de nacimiento: {user.age}</p>
            }
        </div>
        <p className='text-lg'>Edad: {numberOfAge} años</p>
        <p className='text-lg'>{user.email}</p>
      </div>
    </form>
  )
}
