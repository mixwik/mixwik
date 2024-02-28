export const CheckFilter = ({ filterForm, filter, handleSetFilter, name, title, icon }) => {
  return (
    <section className='relative flex flex-col gap-3'>
      <h3
        data-active={filter.length > 0}
        className='flex items-center gap-2'
      >
        {icon}
        {title}
      </h3>
      <ul className='grid grid-cols-2 gap-3 md:grid-cols-4'>
        {
              filterForm.map(item => (
                <li key={item}>
                  <input
                    id={item}
                    type='checkbox'
                    value={item}
                    name={name}
                    checked={filter.includes(item)}
                    onClick={(e) => handleSetFilter(e.target)}
                    className='hidden peer'
                  />
                  <label
                    key={item}
                    htmlFor={item}
                    className='inline-flex items-center justify-center w-full h-full p-2 text-sm text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:shadow-sm peer-checked:shadow-black peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'
                  >
                    {item}
                  </label>
                </li>
              ))
            }
      </ul>
    </section>
  )
}
