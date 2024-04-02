export const IterableField = ({ field, title }) => {
  return (
    <div>
      <h2 className='mb-5 text-xl font-bold'>{title}</h2>
      <div className='grid grid-cols-2 gap-5 md:grid-cols-4'>
        {
            field.map((item, index) => (
              <div key={index} className='flex items-center justify-center px-2 py-1 text-center text-white rounded-md shadow-lg bg-aero'>
                <p>{item}</p>
              </div>
            ))
        }
      </div>
    </div>
  )
}
