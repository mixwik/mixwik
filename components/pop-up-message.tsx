import Confetti from 'react-confetti'
export const PopUpMessage = (
  { loading }:
    { loading: {title: string, subtitle: string, number: number} }
) => {
  return (
    loading.title && (
      <div className='fixed inset-0 z-10 flex items-center justify-center h-full bg-black bg-opacity-50'>
        {loading.number && <Confetti gravity={0.4} />}
        <div className='flex flex-col items-center gap-5 p-5 bg-white rounded-lg'>
          <h3 className='text-2xl font-semibold text-pennBlue'>
            {loading.title}
          </h3>
          <p className='text-sm text-slate-900'>
            {loading.subtitle}
          </p>
        </div>
      </div>
    )
  )
}
