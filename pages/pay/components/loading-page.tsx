import { BackgroundDots } from '../../../components/background-dots'
import { Spinner } from '../../../icons/spinner'

export const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <BackgroundDots />
      <div className='flex flex-col items-center justify-center gap-10 p-5 bg-white md:size-1/2 size-full md:rounded-md'>
        <Spinner />
        <p className='text-gray-600'>Estamos verificando el pago, por favor espera...</p>
        <span className='text-xl font-bold text-red-500'>NO CIERRES ESTA PÁGINA</span>
      </div>
    </div>
  )
}
