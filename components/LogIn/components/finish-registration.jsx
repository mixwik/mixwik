import React from 'react'

export const FinishRegistration = () => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-white'>
      <div className='relative w-full sm:max-w-sm'>
        <div className='absolute w-full h-full transform shadow-lg card bg-aero rounded-3xl -rotate-6' />
        <div className='absolute w-full h-full transform shadow-lg card bg-pennBlue rounded-3xl rotate-6' />
        <div className='relative w-full px-6 py-4 bg-gray-100 shadow-md rounded-3xl'>
          <label className='block mt-3 text-xl font-semibold text-center text-gray-700'>
            Revisa tu correo
          </label>
          <form method='#' action='#' className='mt-10'>
            <div className='flex items-center justify-center text-center mt-7'>
              <hr className='w-1/2 border-gray-300 rounded-md border-1' />
              <label className='block w-full text-sm font-medium text-gray-600'>
                Hemos enviado un correo para que puedas finalizar tu registro
              </label>
              <hr className='w-1/2 border-gray-300 rounded-md border-1' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
