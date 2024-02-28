import { useFilterContext, useSetFilterContext } from '../../../context'

export const AgeFilter = () => {
  const handleSetFilter = useSetFilterContext()
  const filter = useFilterContext()
  return (
    <label className='flex flex-col gap-3'>
      Rango de edad
      <div className='flex items-center gap-3'>
        {filter.age.min}
        <input
          id='steps-range'
          type='range'
          name='min'
          min='16'
          max='50'
          defaultValue={16}
          onChange={(e) => handleSetFilter(e.target)}
          value={filter.age.min}
          className='w-full h-3 bg-gray-100 shadow-md shadow-gray-300 rounded-l-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
        />
        <input
          id='steps-range'
          type='range'
          name='max'
          min='51'
          max='90'
          defaultValue={90}
          onChange={(e) => handleSetFilter(e.target)}
          value={filter.age.max}
          className='w-full h-3 bg-gray-100 shadow-md shadow-gray-300 rounded-r-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
        />
        {filter.age.max}
      </div>
    </label>
  )
}
