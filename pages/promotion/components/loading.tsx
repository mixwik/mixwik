import { BackgroundDots } from '../../../components/background-dots'
import { Spinner } from '../../../icons/spinner'

export const Loading = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <BackgroundDots />
      <div className='flex flex-col items-center justify-center gap-5 p-5 bg-white rounded-sm md:size-1/2 size-full'>
        <Spinner />
        Cargando, por favor espera...
      </div>
    </div>
  )
}
