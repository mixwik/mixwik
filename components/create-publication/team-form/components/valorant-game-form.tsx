import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useOpenGameContext } from '../../../../context'
import { TYPE_OF_GAME, VALORANT_LEVELS, VALORANT_POSITION } from '../../../../domain/constants'
import { UserServer } from '../../../../domain/types'
import { useSession } from '../../../../firebase/auth/useSession'
import { useCurrentPosition } from '../../../../hooks/useCurrentPosition'
import { ArrowBack } from '../../../Svg'
import { BackgroundDots } from '../../../background-dots'
import { PopUpError } from '../../../pop-up-error'
import { PopUpMessage } from '../../../pop-up-message'
import { BoxField } from '../../components/fields/box-field'
import { Description } from '../../components/fields/description-field'
import { HoursField } from '../../components/fields/hours-field'
import { FieldImage } from '../../components/fields/image-field'
import { FieldImages } from '../../components/fields/images-field'
import { Title } from '../../components/fields/title-field'

interface ValorantGameFromProps {
  userServer: UserServer
  isMixWikTeams: boolean
}

export const ValorantGameFrom = ({ userServer, isMixWikTeams }: ValorantGameFromProps) => {
  const { currentPosition } = useCurrentPosition()
  const [loading, setLoading] = useState({
    title: '',
    subtitle: '',
    number: 0
  })
  const { userProvider } = useSession()
  const { openGame, handleOpenGame } = useOpenGameContext()
  const [image, setImage] = useState<File>()
  const [image2, setImage2] = useState<File>()
  const [image3, setImage3] = useState<File>()
  const [image4, setImage4] = useState<File>()
  const [image5, setImage5] = useState<File>()
  const [image6, setImage6] = useState<File>()
  const [image7, setImage7] = useState<File>()
  const [imgUrl, setImgUrl] = useState('')
  const [imgUrl2, setImgUrl2] = useState('')
  const [imgUrl3, setImgUrl3] = useState('')
  const [imgUrl4, setImgUrl4] = useState('')
  const [imgUrl5, setImgUrl5] = useState('')
  const [imgUrl6, setImgUrl6] = useState('')
  const [imgUrl7, setImgUrl7] = useState('')

  const [error, setError] = useState('')
  const [initialValues] = useState({
    category: openGame as string,
    title: '',
    description: '',
    hours: 0,
    age: '',
    level: [],
    preferenceTeam: [] as string[],
    position: [] as string[],
    premier: [],
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
        .array()
        .min(1, 'Selecciona al menos un nivel'),
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
    const date = userServer.age ? userServer.age : localStorage.getItem('age') ?? '01-01-2000'
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    if (Object.keys(data).length > 0 && imgUrl && image) {
      setLoading({ title: 'Creando Team...', subtitle: 'Estamos creando tu team, por favor espera...', number: 0 })
      const res = await fetch('/api/create-team', {
        method: 'POST',
        body: JSON.stringify({ ...data, imageName: image.name, imageName2: image2?.name, imageName3: image3?.name, imageName4: image4?.name, imageName5: image5?.name, imageName6: image6?.name, imageName7: image7?.name, imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6, imgUrl7, category: openGame, uid: userProvider.uid, geometry: currentPosition, age })
      })
      const response = await res.json()
      if (response.message === 'Game created') {
        setTimeout(() => {
          setLoading({ title: 'Team creado', subtitle: 'Tu team ha sido creado con éxito', number: 1 })
          handleOpenGame('')
        }, 2000)
      } else {
        setError(response.message)
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
      <PopUpError error={error} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-10 p-5 bg-white rounded-lg'
      >
        <h2 className='text-2xl font-semibold text-pennBlue'>
          Valorant
        </h2>
        {
          isMixWikTeams
            ? (
              <FieldImages
                setImgURL={setImgUrl}
                setImage2={setImage2}
                setImage3={setImage3}
                setImage4={setImage4}
                setImage5={setImage5}
                setImage6={setImage6}
                setImage7={setImage7}
                imgURL={imgUrl}
                imgURL2={imgUrl2}
                imgURL3={imgUrl3}
                imgURL4={imgUrl4}
                imgURL5={imgUrl5}
                imgURL6={imgUrl6}
                imgURL7={imgUrl7}
                setImage={setImage}
                setImgURL2={setImgUrl2}
                setImgURL3={setImgUrl3}
                setImgURL4={setImgUrl4}
                setImgURL5={setImgUrl5}
                setImgURL6={setImgUrl6}
                setImgURL7={setImgUrl7}
                image={image}
                image2={image2}
                image3={image3}
                image4={image4}
                image5={image5}
                image6={image6}
                image7={image7}
              />
              )
            : (
              <FieldImage
                setImgURL={setImgUrl}
                imgURL={imgUrl}
                setImage={setImage}
                image={image}
              />
              )
        }
        <Title
          register={register}
          errors={errors.title}
          title='Nombre del equipo'
          registerName='title'
        />
        <Description
          register={register}
          watch={watch}
          errors={errors.description}
          title='Descripción del equipo'
          registerName='description'
        />

        <BoxField
          register={register}
          registerName='level'
          errors={errors.level}
          game={VALORANT_LEVELS}
          type='checkbox'
          title='¿Cuál es el nivel competitivo que quieres en tu equipo?'
        />
        <BoxField
          register={register}
          registerName='position'
          errors={errors.position}
          game={VALORANT_POSITION}
          type='checkbox'
          title='¿Que posiciones quieres que haya en tu equipo?'
        />
        <BoxField
          register={register}
          registerName='typeOfGamer'
          errors={errors.typeOfGamer}
          game={TYPE_OF_GAME}
          type='checkbox'
          title='¿Que tipo de jugadores buscas?'
        />
        <HoursField
          register={register}
          watch={watch}
          errors={errors.hours}
          title='¿Cuántas horas como mínimo quieres que tengan los jugadores?'
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
        </div>
      </form>
    </section>
  )
}
