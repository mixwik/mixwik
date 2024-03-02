import Image from 'next/image'
import React, { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { removeImageDB, setImageDB } from '../../../../firebase/storage'
import { DeleteIcon, ImageIcon } from '../../../Svg'
import { myLoader } from '../../../myLoader'

export const FieldImage = (
  { setImgURL, imgURL, setImage, image }:
   { setImgURL: React.Dispatch<React.SetStateAction<string>>, setImage: React.Dispatch<React.SetStateAction<File>>, image: File | undefined, imgURL: string}
) => {
  const { userProvider } = useSession()
  const [previewImage, setPreviewImage] = useState('')

  const [, setProgress] = useState()

  const handleSetImage = async (e) => {
    const reader = new FileReader()
    setImage(e.target.files[0])
    setImageDB(userProvider.uid, e.target.files[0], setImgURL, setProgress)
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
      setPreviewImage(reader.result as string)
    }
  }
  const handleRemoveImage = async (e) => {
    e.preventDefault()
    const imageName = localStorage.getItem('imageName')
    removeImageDB(userProvider.uid, image?.name || imageName)
    localStorage.removeItem('image')
    localStorage.removeItem('imageName')
    setImgURL('')
    setPreviewImage('')
  }

  return (
    <label className='flex items-center justify-center bg-gray-100 border-2 border-solid rounded-full shadow-lg size-48 shadow-gray-300 border-aero'>
      <input
        className='hidden'
        onChange={handleSetImage}
        type='file'
      />
      {previewImage
        ? (
          <div className='relative flex items-center justify-center size-full'>
            <Image className='object-cover rounded-full size-full' width={0} height={0} loader={myLoader} src={previewImage} alt='Carga de imagen' />
            <button
              className='absolute z-20 rounded-full'
              onClick={handleRemoveImage}
            >
              <DeleteIcon className='text-red-500 size-12' />
            </button>
          </div>
          )
        : (
          <div className='flex items-center justify-center size-full'>
            {
                imgURL
                  ? (
                    <div className='relative flex items-center justify-center size-full'>
                      <Image
                        className='object-cover rounded-full size-full'
                        width={0}
                        height={0}
                        loader={myLoader}
                        src={imgURL} alt='Carga de imagen'
                      />
                      <ImageIcon className='absolute p-1 size-12 fill-white' />
                    </div>
                    )
                  : (
                    <ImageIcon className='size-12' />
                    )
              }
          </div>
          )}
    </label>
  )
}
