import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ArrowBack } from '../../../../components/Svg'
import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { Description } from '../../../../components/create-publication/components/fields/description-field'
import { HoursField } from '../../../../components/create-publication/components/fields/hours-field'
import { FieldImage } from '../../../../components/create-publication/components/fields/image-field'
import { FieldImages } from '../../../../components/create-publication/components/fields/images-field'
import { Title } from '../../../../components/create-publication/components/fields/title-field'
import { PopUpError } from '../../../../components/pop-up-error'
import { PopUpMessage } from '../../../../components/pop-up-message'
import { COLLECTIONS, TYPE_OF_GAME } from '../../../../domain/constants'
import { gameServer, teamServer } from '../../../../domain/types'
import { Cs2 } from './cs2'
import { Fortnite } from './fortnite'
import { Lol } from './lol'
import { Valorant } from './valorant'

interface EditCs2Props {
  page: string
  setEdit: (value: boolean) => void
  mixWikTeams: boolean
  publication: gameServer | teamServer
  setRefetch: (value: any) => void
}

export const EditGame = ({ page, setEdit, mixWikTeams, publication, setRefetch }: EditCs2Props) => {
  const [loading, setLoading] = useState({
    title: '',
    subtitle: '',
    number: 0
  })

  const [image, setImage] = useState<File>()
  const [image2, setImage2] = useState<File>()
  const [image3, setImage3] = useState<File>()
  const [image4, setImage4] = useState<File>()
  const [image5, setImage5] = useState<File>()
  const [image6, setImage6] = useState<File>()
  const [image7, setImage7] = useState<File>()
  const [imgUrl, setImgUrl] = useState(publication.img.url)
  const [imgUrl2, setImgUrl2] = useState(publication.img2.url)
  const [imgUrl3, setImgUrl3] = useState(publication.img3.url)
  const [imgUrl4, setImgUrl4] = useState(publication.img4.url)
  const [imgUrl5, setImgUrl5] = useState(publication.img5.url)
  const [imgUrl6, setImgUrl6] = useState(publication.img6.url)
  const [imgUrl7, setImgUrl7] = useState(publication.img7.url)

  const [error, setError] = useState('')

  const [initialValues] = useState({
    title: publication.title,
    description: publication.description,
    hours: publication.hours,
    level: publication.level,
    preferenceTeam: publication.preferenceTeam,
    position: publication.position,
    premier: publication.premier,
    typeOfGamer: publication.typeOfGamer
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
        .max(350, 'Máximo 350 caracteres')
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
    setLoading({ title: 'Actualizando datos...', subtitle: 'Estamos actualizando los datos', number: 0 })
    const res = await fetch('/api/update-publication-data', {
      method: 'POST',
      body: JSON.stringify({ ...data, imageName: image?.name || publication.img.name, imageName2: image2?.name || publication.img2.name, imageName3: image3?.name || publication.img3.name, imageName4: image4?.name || publication.img4.name, imageName5: image5?.name || publication.img5.name, imageName6: image6?.name || publication.img6.name, imageName7: image7?.name || publication.img7.name, imgUrl, imgUrl2, imgUrl3, imgUrl4, imgUrl5, imgUrl6, imgUrl7, category: page, id: publication.id })
    })
    const response = await res.json()
    if (response.message === 'Game updated') {
      setLoading({
        title: 'Los datos han sido actualizados',
        subtitle: 'Los datos han sido actualizados correctamente',
        number: 0
      })
      setTimeout(() => {
        setRefetch((prevState) => !prevState)
        setEdit(false)
      }, 2000)
    } else {
      setError(response.message)
      setLoading({ title: '', subtitle: '', number: 0 })
    }
  }

  return (
    <div className=''>
      <PopUpMessage loading={loading} />
      <PopUpError error={error} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-10 p-5 bg-white rounded-lg'
      >
        <h2 className='text-2xl font-semibold text-pennBlue'>
          Counter Strike 2
        </h2>
        {
          mixWikTeams
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

        {publication.category === COLLECTIONS.cs2 &&
          <Cs2
            page={page}
            register={register}
            errors={errors}
          />}
        {publication.category === COLLECTIONS.lol &&
          <Lol
            page={page}
            register={register}
            errors={errors}
          />}
        {publication.category === COLLECTIONS.fortnite &&
          <Fortnite
            register={register}
            errors={errors}
          />}
        {publication.category === COLLECTIONS.valorant &&
          <Valorant
            page={page}
            register={register}
            errors={errors}
          />}

        <BoxField
          register={register}
          registerName='typeOfGamer'
          errors={errors.root}
          game={TYPE_OF_GAME}
          type='checkbox'
          title='¿Qué tipo de jugador eres?'
        />
        <HoursField
          register={register}
          watch={watch}
          errors={errors.root}
          title='¿Cuántas horas has jugado?'
          type='range'
          registerName='hours'
        />

        <div className='flex justify-center w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setEdit(false)}
          >
            <ArrowBack className='w-6 h-6 text-white' />
            Cancelar
          </button>
          <button
            disabled={!imgUrl || Object.keys(errors).length > 0}
            className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
            type='submit'
          >Guardar y continuar
          </button>
        </div>
      </form>
    </div>
  )
}
