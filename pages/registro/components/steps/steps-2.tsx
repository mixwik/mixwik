import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ArrowBack, DeleteIcon, ImageIcon } from '../../../../components/Svg'
import { myLoader } from '../../../../components/myLoader'
import { UserProvider } from '../../../../domain/types'
import { removeImageDB, setImageDB } from '../../../../firebase/storage'

export const Steps2 = (
  { userProvider, setSteps }:
  {userProvider: UserProvider, setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [previewImage, setPreviewImage] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [error, setError] = useState(false)
  const [image, setImage] = useState<File>()
  const [progress, setProgress] = useState()

  useEffect(() => {
    const image = localStorage.getItem('image')
    if (image) {
      setImgURL(image)
      setPreviewImage(image)
    }
  }, [imgURL])

  const handleSetImage = async (e) => {
    const reader = new FileReader()
    setImage(e.target.files[0])
    setImageDB('profile', e.target.files[0], setImgURL, setProgress)
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result as string)
    }
  }
  const handleRemoveImage = async (e) => {
    e.preventDefault()
    if (image && image.name) removeImageDB('profile', image.name)
    setPreviewImage('')
  }

  const saveImage = () => {
    if (imgURL) {
      localStorage.setItem('image', imgURL)
      localStorage.setItem('step', 'step-3')
      setSteps('step-3')
    } else {
      setError(true)
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='flex flex-col items-center justify-center gap-3 text-4xl font-bold'>Elige tu foto de perfil</h2>
      <label className='flex flex-col items-center justify-center w-48 h-48 bg-white border-2 border-solid rounded-full border-aero'>
        <input
          className='hidden'
          onChange={handleSetImage}
          type='file'
          placeholder='Minutos'
        />
        {previewImage
          ? (
            <div className='flex items-center justify-center w-full h-full'>
              <Image className='object-cover w-full h-full rounded-full' width={0} height={0} loader={myLoader} src={previewImage} alt='Carga de imagen' />
              <button
                className='absolute z-20 rounded-full'
                onClick={handleRemoveImage}
              >
                <DeleteIcon className='w-12 h-12 text-red-500' />
              </button>
            </div>
            )
          : (
            <div>
              {
            userProvider?.image && (<Image width={0} height={0} loader={myLoader} src={userProvider?.image} alt='Carga de imagen' />)
            }
              <div>
                <ImageIcon className='w-12 h-12' />
              </div>
            </div>
            )}
      </label>
      <div className='flex justify-center w-full gap-10'>
        <button className='flex items-center gap-1' onClick={() => setSteps('step-1')}>
          <ArrowBack className='w-6 h-6 text-white' />
          Volver
        </button>
        <button
          disabled={!imgURL && !progress}
          onClick={saveImage}
          className='px-5 py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
        >Guardar y continuar
        </button>
      </div>
      {error && <p className='font-bold text-red-500'>Debes seleccionar una imagen</p>}
    </section>
  )
}
