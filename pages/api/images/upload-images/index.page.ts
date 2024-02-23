import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, img } = req.body

    if (uid && img) {
      const storage = getStorage()
      const storageRef = ref(storage, `${uid}/${img.name}`)
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.on('state_changed',
        (snapshot) => {
          res.status(200).json({ progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 })
        },
        (error) => {
          res.status(500).json({ error: error.message })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            res.status(200).json({ url: downloadURL })
          })
        }
      )
    } else {
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  }
}
