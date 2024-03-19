import Link from 'next/link'
import { BackgroundDots } from '../../components/background-dots.tsx'
import { useSession } from '../../firebase/auth/useSession'
import { useGetOneUser } from '../../hooks/use-get-one-user'

const Ban = () => {
  const { userProvider } = useSession()
  const { userServer } = useGetOneUser(userProvider?.uid)
  return (
    <section className='flex flex-col items-center justify-center w-screen h-screen p-5'>
      <BackgroundDots />
      <div className='flex flex-col gap-5 p-10 bg-white rounded-md md:w-1/2'>
        <h1 className='text-4xl font-bold'>{userServer?.name}</h1>
        <p>Lamentamos informarle de que se encuentra baneado de MixWik</p>
        <p>Si cree que esto es un error, por favor, contacte con nosotros a través de nuestro correo electrónico:
        </p>
        <Link className='font-bold text-aero' href='mailto:infomixwik@gmail.com'>infomixwik@gmail.com</Link>
      </div>
    </section>
  )
}

export default Ban
