export const PopUpError = (
  { error }:
    { error: string }
) => {
  return (
    error && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='flex flex-col items-center gap-5 p-10 bg-white rounded-lg'>
          <p className='font-semibold text-red-500 md:text-xl'>
            {error}
          </p>
        </div>
      </div>
    )
  )
}
