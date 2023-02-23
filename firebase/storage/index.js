
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage'

export const setImageDB = async (categori, img, setImgURL) => {
  const storage = getStorage()
  const storageRef = ref(storage, `${categori}/${img.name}`)
  await uploadBytes(storageRef, img).then((snapshot) => {})
  await getDownloadURL(ref(storage, `${categori}/${img.name}`)).then((url) => {
    setImgURL(url)
  })
}

export const removeImageDB = async (categori, img) => {
  const storage = getStorage()
  const desertRef = ref(storage, `${categori}/${img}`)
  deleteObject(desertRef)
    .then(() => {})
    .catch((error) => {
      console.log(error)
    })
}
