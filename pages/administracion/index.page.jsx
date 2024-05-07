import Layout from '../../components/Layout'
import { BackgroundDots } from '../../components/background-dots.tsx'
import { useMaster } from '../../hooks/useMaster'
import NoAllowed from './components/NoAllowed'
import { AllPublications } from './components/all-publicatins/all-publications.tsx'
import { AllUsers } from './components/all-users'

export default function Administration () {
  const { master } = useMaster()

  if (!master) return <NoAllowed />

  return (
    <Layout>
      <section className='h-[90vh] flex flex-col justify-center items-center'>
        <h1 className='w-full p-3 text-3xl font-bold text-center text-white md:w-1/2 bg-aero'>Administración</h1>
        <BackgroundDots />
        <div className='flex items-center justify-center w-screen h-full'>
          <div className='flex flex-col bg-white md:w-1/2 md:rounded-md'>
            <AllUsers />
            <AllPublications />
          </div>
        </div>
      </section>
    </Layout>
  )
}
