import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useOpenGameContext, usePlayerCreateContext } from '../../../../context'
import { LOL_LEVELS, LOL_POSITIONS, TYPE_OF_GAME } from '../../../../domain/constants'
import { useSession } from '../../../../firebase/auth/useSession'
import { useCurrentPosition } from '../../../../hooks/useCurrentPosition'
import { Error } from '../../../../pages/registro/components/Error'
import { ArrowBack } from '../../../Svg'
import { BackgroundDots } from '../../../background-dots'
import { PopUpMessage } from '../../../pop-up-message'
import { BoxField } from '../../components/fields/box-field'
import { Description } from '../../components/fields/description-field'
import { HoursField } from '../../components/fields/hours-field'
import { FieldImage } from '../../components/fields/image-field'
import { Title } from '../../components/fields/title-field'
import { useUpdateCountPublications } from '../hooks/use-update-count-publications'

export const LolGameForm = ({ dashboard }) => {
  const { currentPosition } = useCurrentPosition()
  const [loading, setLoading] = useState({
    title: '',
    subtitle: '',
    number: 0
  })
  const { userProvider } = useSession()
  const { openGame, handleOpenGame } = useOpenGameContext()
  const { setPlayerCreate } = usePlayerCreateContext()
  const [image, setImage] = useState<File>()
  const [imgUrl, setImgUrl] = useState('')
  const { handleUpdate } = useUpdateCountPublications({ openGame, userProvider })
  const [error, setError] = useState('')
  const [initialValues] = useState({
    category: openGame as string,
    title: '',
    description: '',
    hours: 0,
    age: '',
    level: '',
    preferenceTeam: [] as string[],
    position: [] as string[],
    premier: '',
    typeOfGamer: [] as string[]
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

  const onSubmit = async (data) => {
    const date = localStorage.getItem('age') ?? '01-01-2000'
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    if (Object.keys(data).length > 0 && imgUrl && image) {
      setLoading({ title: 'Creando Jugador...', subtitle: 'Estamos creando tu jugador, por favor espera...', number: 0 })
      const res = await fetch('/api/create-game', {
        method: 'POST',
        body: JSON.stringify({ ...data, imageName: image.name, imgUrl, category: openGame, uid: userProvider.uid, geometry: currentPosition, age })
      })
      const response = await res.json()
      if (dashboard) handleUpdate()
      if (response.message === 'Game created') {
        setTimeout(() => {
          setLoading({ title: 'Jugador creado', subtitle: 'Tu jugador ha sido creado con éxito', number: 1 })
          setPlayerCreate(true)
          handleOpenGame('')
        }, 2000)
      } else {
        setError(response)
        setLoading({ title: '', subtitle: '', number: 0 })
      }
    } else {
      setError('Ha ocurrido un error')
      setLoading({ title: '', subtitle: '', number: 0 })
    }
  }

  return (
    <section className='size-full md:w-1/2 md:py-5'>
      <BackgroundDots />
      <PopUpMessage loading={loading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-10 p-5 bg-white rounded-lg'
      >
        <h2 className='text-2xl font-semibold text-pennBlue'>
          League of Legends
        </h2>
        <FieldImage
          setImgURL={setImgUrl}
          imgURL={imgUrl}
          setImage={setImage}
          image={image}
        />
        <Title
          register={register}
          errors={errors.title}
          title='Nombre de jugador'
          registerName='title'
        />
        <Description
          register={register}
          watch={watch}
          errors={errors.description}
          title='Describete como jugador'
          registerName='description'
        />
        <BoxField
          register={register}
          registerName='level'
          errors={errors.level}
          game={LOL_LEVELS}
          type='radio'
          title='¿Cuál es tu nivel en Competitivo?'
        />
        <BoxField
          register={register}
          registerName='position'
          errors={errors.position}
          game={LOL_POSITIONS}
          type='checkbox'
          title='¿En qué posiciones juegas?'
        />
        <BoxField
          register={register}
          registerName='typeOfGamer'
          errors={errors.typeOfGamer}
          game={TYPE_OF_GAME}
          type='checkbox'
          title='¿Qué tipo de jugador eres?'
        />
        <HoursField
          register={register}
          watch={watch}
          errors={errors.hours}
          title='¿Cuántas horas has jugado?'
          type='range'
          registerName='hours'
        />
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
          {error && <Error error={error} />}
        </div>
      </form>
    </section>
  )
}