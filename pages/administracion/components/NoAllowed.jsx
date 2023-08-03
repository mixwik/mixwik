import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Layout from '../../../components/Layout'
import noAllowed from '../../../public/failed/no-allowed.jpg'

const NoAllowed = () => {
  const router = useRouter()
  useEffect(() => {
    // setTimeout(() => {
    //   router.push('/')
    // }, 3000)
  }, [router])
  return (
    <Layout>
      <section className='h-[90vh] grid place-items-center'>
        <div className='flex md:flex-row flex-col gap-5 w-[90vw] md:w-[60vw] h-full items-center'>
          <Image className='md:w-[50%] w-full h-auto object-cover' src={noAllowed} alt='No tienes permisos para acceder a esta página' />
          <div>
            <h1 className='text-2xl font-bold text-red-500 md:text-7xl'>No tienes permisos para acceder a esta página</h1>
            <p className='pt-5 font-bold text-black'>Serás redirigido a la página principal...</p>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default NoAllowed
