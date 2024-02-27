import { useFilterContext, useSetFilterContext } from '../../../context'
import { GameLevel } from '../../Svg'

export const LevelFilter = ({ filterForm }) => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()

  return (
    <section className='relative'>
      <h3
        data-active={filter.level.length > 0}
        className='flex items-center justify-center gap-3'
      >
        <GameLevel className='w-auto' />
        Competitivo
      </h3>
      <ul className='grid gap-3 md:grid-cols-5'>
        {
              filterForm.map(level => (
                <li key={level}>
                  <input
                    id={level}
                    type='checkbox'
                    value={level}
                    name='level'
                    checked={filter.level.includes(level)}
                    onClick={(e) => handleSetFilter(e.target)}
                    className='hidden peer'
                  />
                  <label
                    key={level}
                    htmlFor={level}
                    className='inline-flex items-center justify-center w-full h-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:shadow-sm peer-checked:shadow-black peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'
                  >
                    {level}
                  </label>
                </li>
              ))
            }
      </ul>

    </section>
  )
}
