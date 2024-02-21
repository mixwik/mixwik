
import {
  deleteObject, getDownloadURL, getStorage,
  ref,
  uploadBytesResumable
} from 'firebase/storage'

export const setImageDB = async (userUid, img, setImgURL, setProgress) => {
  const storage = getStorage()
  const storageRef = ref(storage, `${userUid}/${img.name}`)
  const uploadTask = uploadBytesResumable(storageRef, img)

  uploadTask.on('state_changed',
    (snapshot) => {
      setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
    },
    (error) => {
      console.log(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setImgURL(downloadURL)
      })
    }
  )
}

export const removeImageDB = async (category, img) => {
  const storage = getStorage()
  const desertRef = ref(storage, `${category}/${img}`)
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}
