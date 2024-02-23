export const PopUpMessage = (
  { title1, title2, subtitle1, subtitle2, loading }:
    { title1: string, subtitle1: string, loading: string, title2: string, subtitle2: string}
) => {
  return (
    loading && (
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='flex flex-col items-center gap-5 p-5 bg-white rounded-lg'>
          <h2 className='text-2xl font-semibold text-pennBlue'>
            {loading === 'creating' && title1}
            {loading === 'created' && title2}
          </h2>
          <p className='text-sm text-slate-900'>
            {loading === 'creating' && subtitle1}
            {loading === 'created' && subtitle2}
          </p>
        </div>
      </div>
    )
  )
}
