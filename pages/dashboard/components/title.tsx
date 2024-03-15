import Link from 'next/link'

export const Title = ({ title }) => {
  return (
    <div className='flex items-center justify-between w-full p-1 bg-pennBlue'>
      <h1 className='pl-5 font-semibold text-white'>{title}</h1>
      <Link className='p-1 font-bold text-white rounded-sm bg-aero' href='/dashboard'>
        <svg className='w-6 h-6' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </Link>
    </div>
  )
}
