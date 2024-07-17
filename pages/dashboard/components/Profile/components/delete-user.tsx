import { deleteDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { COLLECTIONS } from '../../../../../domain/constants'
import { db } from '../../../../../firebase/initialize'
import { useGetAllPublicationsOneUser } from '../../../../../hooks/use-get-all-publications-one-user'

export const DeleteUser = ({ setDeleteUser, user, userProvider, isMixWikTeams }) => {
  const router = useRouter()
  const { publications } = useGetAllPublicationsOneUser(user.uid)
  const handleDeleteUser = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?')) {
      for (const publication of publications) {
        const userRef = doc(db, publication.category, publication.id)
        await deleteDoc(userRef).catch(() => {
          toast.error('Ha ocurrido un error durante el borrado de la publicación')
        })
      }
      const userRef = doc(db, COLLECTIONS.users, user.uid)
      await deleteDoc(userRef).then(() => {
        toast.success('Tu cuenta ha sido eliminada correctamente')
        router.push('/')
      }).catch(() => {
        toast.error('Ha ocurrido un error durante el borrado de la cuenta')
      })
    } else {
      setDeleteUser(false)
    }
  }
  return (
    <div className='fixed z-20 flex flex-col items-center justify-center w-full h-full gap-5 p-5 bg-white md:w-1/2 md:p-0'>
      <h2 className='text-2xl font-bold text-red-500'>¿Estás seguro de que quieres eliminar tu cuenta?</h2>
      <p className='font-bold'>Esta acción no se puede deshacer</p>
      <p>Se eliminará tu perfil, publicaciones y equipos, así como todos tus datos personales</p>
      <p />
      <p className='font-bold'>Perderás tus suscripciones activas a MixWikTeams y promociones</p>
      <button className='flex items-center gap-2 px-5 py-2 font-bold text-white bg-red-500 rounded-md' onClick={() => setDeleteUser(false)}>
        Cancelar
      </button>
      <button className='flex items-center gap-2 px-5 py-2 text-red-500 rounded-md' onClick={handleDeleteUser}>
        Eliminar cuenta
      </button>
    </div>
  )
}
