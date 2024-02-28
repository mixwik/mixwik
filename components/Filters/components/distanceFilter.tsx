export const DistanceFilter = ({ distance, setDistance }) => {
  return (
    <div className='flex items-center gap-2'>
      <label className='font-semibold text-slate-900'>
        Distancia
      </label>
      <input
        id='steps-range'
        type='range'
        min='1'
        max='700'
        onChange={(e) => setDistance(e.target.value)}
        value={distance}
        className='w-full h-3 bg-gray-100 shadow-md shadow-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
      />
      <span className='z-10 bottom-4 right-2'>
        {distance > 0 ? distance : 0}Km
      </span>
    </div>
  )
}
