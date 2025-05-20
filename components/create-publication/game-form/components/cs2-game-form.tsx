import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useOpenGameContext } from '../../../../context'
import { CS2_LEVELS, CS2_POSITIONS, CS2_PREMIER, PUBLICATION_TYPE, TYPE_OF_GAME } from '../../../../domain/constants'
import { cs2SchemaGame } from '../../../../domain/domain/cs2-schema'
import { UserServer } from '../../../../domain/types'
import { useSession } from '../../../../firebase/auth/useSession'
import { useCurrentPosition } from '../../../../hooks/useCurrentPosition'
import { ArrowBack } from '../../../Svg'
import { BackgroundDots } from '../../../background-dots'
import { AffiliateCode } from '../../components/fields/affiliate-code'
import { BoxField } from '../../components/fields/box-field'
import { Description } from '../../components/fields/description-field'
import { HoursField } from '../../components/fields/hours-field'
import { FieldImage } from '../../components/fields/image-field'
import { FieldImages } from '../../components/fields/images-field'
import { Title } from '../../components/fields/title-field'

interface Cs2GameFromProps {
  userServer?: UserServer
  isMixWikTeams?: boolean
  createUser?: () => void
}

export const Cs2GameFrom = ({ userServer, isMixWikTeams, createUser }: Cs2GameFromProps) => {
  const router = useRouter()
  const { currentPosition } = useCurrentPosition()
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
    typeOfGamer: [] as string[],
    affiliateCode: ''
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(cs2SchemaGame),
    defaultValues: initialValues
  })

  const onSubmit = async (data) => {
    const date = userServer?.age ? userServer.age : localStorage.getItem('age') ?? '01-01-2000'
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    if (Object.keys(data).length > 0 && imgUrl && image) {
      const res = await fetch('/api/create-game', {
        method: 'POST',
        body: JSON.stringify({ ...data, imageName: image.name, imageName2: image2?.name, imageName3: image3?.name, imageName4: image4?.name, imageName5: image5?.name, imageName6: image6?.name, imageName7: image7?.name, imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6, imgUrl7, category: openGame, uid: userProvider.uid, geometry: currentPosition, age, type: isMixWikTeams ? PUBLICATION_TYPE.playerWithTeam : PUBLICATION_TYPE.player })
      })
      const response = await res.json()
      if (response.message === 'Game created') {
        createUser && createUser()
        toast.success('Tu jugador ha sido creado con éxito')
        setTimeout(() => router.refresh(), 1000)
      } else {
        toast.error(response.message)
      }
    } else {
      toast.error('Ha ocurrido un error')
    }
  }

  return (
    <section className='size-full md:w-1/2 md:py-5'>
      <BackgroundDots />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-10 p-5 bg-white rounded-lg'
      >
        <h2 className='text-2xl font-semibold text-pennBlue'>
          Counter Strike 2
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
          game={CS2_LEVELS}
          type='radio'
          title='¿Cuál es tu nivel en Competitivo?'
        />
        <BoxField
          register={register}
          registerName='premier'
          errors={errors.premier}
          game={CS2_PREMIER}
          type='radio'
          title='¿Cuál es tu nivel en Premier?'
        />

        <BoxField
          register={register}
          registerName='position'
          errors={errors.position}
          game={CS2_POSITIONS}
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
        <AffiliateCode
          register={register}
          errors={errors.affiliateCode}
          title='Código de afiliado (opcional)'
          registerName='affiliateCode'
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
