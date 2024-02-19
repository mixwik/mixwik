export const Stepper = ({ steps }: {steps: string}) => {
  return (
    <ol className='flex justify-between w-full gap-5 p-5 pb-0 bg-white rounded-t-lg md:w-1/2'>
      <li className='w-full'>
        <div className='flex items-center'>
          <div className={`z-10 flex items-center justify-center w-6 h-6 bg-aero ${steps === 'step-1' && 'bg-pennBlue text-white'} rounded-full ring-0 ring-white sm:ring-8 shrink-0`}>
            1
          </div>
          <div className='flex w-full bg-gray-200 h-0.5' />
        </div>
      </li>
      <li className='w-full'>
        <div className='flex items-center'>
          <div className={`z-10 flex items-center justify-center w-6 h-6 bg-aero ${steps === 'step-2' && 'bg-pennBlue text-white'} rounded-full ring-0 ring-white sm:ring-8 shrink-0`}>
            2
          </div>
          <div className='flex w-full bg-gray-200 h-0.5' />
        </div>
      </li>
      <li className='w-full'>
        <div className='flex items-center'>
          <div className={`z-10 flex items-center justify-center w-6 h-6 bg-aero ${steps === 'step-3' && 'bg-pennBlue text-white'} rounded-full ring-0 ring-white sm:ring-8 shrink-0`}>
            3
          </div>
          <div className='flex w-full bg-gray-200 h-0.5' />
        </div>
      </li>
      <li className=''>
        <div className='flex items-center'>
          <div className={`z-10 flex items-center justify-center w-6 h-6 bg-aero ${steps === 'step-4' && 'bg-pennBlue text-white'} rounded-full ring-0 ring-white sm:ring-8 shrink-0`}>
            4
          </div>
        </div>
      </li>
    </ol>
  )
}
