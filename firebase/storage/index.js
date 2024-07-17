
import {
  deleteObject, getDownloadURL, getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'
import toast from 'react-hot-toast'

export const setImageDB = async (userUid, img, setImgURL, setProgress) => {
  const storage = getStorage()
  const storageRef = ref(storage, `${userUid}/${img.name}`)
  const uploadTask = uploadBytesResumable(storageRef, img)

  uploadTask.on('state_changed',
    (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    () => {
      toast.error('Ha ocurrido un error durante la subida de la imagen')
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgURL(downloadURL)
      })
    }
  )
}

export const removeImageDB = async (uid, img) => {
  const storage = getStorage()
  const desertRef = ref(storage, `${uid}/${img}`)
  deleteObject(desertRef)
    .then(() => {
      toast.success('Imagen eliminada correctamente')
    })
    .catch(() => {
      toast.error('Ha ocurrido un error durante la eliminación de la imagen')
    })
}
