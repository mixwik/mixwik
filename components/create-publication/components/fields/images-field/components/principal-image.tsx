import Image from 'next/image'
import { DeleteIcon, ImageIcon } from '../../../../../Svg'
import { myLoader } from '../../../../../myLoader'

export const PrincipalImage = ({ handleSetImage, previewImage, handleRemoveImage, imgURL, setPreviewImage, setImgURL, setImage, image }) => {
  return (
    <label className='flex items-center justify-center bg-gray-100 border-2 border-solid rounded-md shadow-lg size-48 shadow-gray-300 border-aero'>
      <input
        className='hidden'
        onChange={(e) => handleSetImage(e, setImgURL, setImage, setPreviewImage)}
        type='file'
      />
      {previewImage
        ? (
          <div className='relative flex items-center justify-center size-full'>
            <Image className='object-cover rounded-full size-full' width={0} height={0} loader={myLoader} src={previewImage} alt='Carga de imagen' />
            <button
              className='absolute z-20 rounded-full'
              onClick={(e) => handleRemoveImage(e, setImgURL, setPreviewImage, image)}
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
