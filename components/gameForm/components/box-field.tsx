import { Error } from '../../../pages/registro/components/Error'

export const BoxField = (
  { register, errors, game, title, type, registerName }:
    { register: any, errors: any, game: string[], title: string, type: string, registerName: string}
) => {
  return (
    <div className='relative flex flex-col w-full gap-2'>
      <span className='font-semibold text-slate-900'>
        {title}
      </span>
      <ul className='grid w-full grid-cols-2 gap-2 md:grid-cols-3'>
        {
                game.map((level) => (
                  <li key={level}>
                    <input
                      {...register(registerName)}
                      type={type}
                      value={level}
                      id={level}
                      className='hidden peer'
                    />
                    <label htmlFor={level} className='inline-flex items-center justify-between w-full h-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:shadow-sm peer-checked:shadow-black peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                      <div className='w-full text-lg font-semibold text-center'>{level}</div>
                    </label>
                  </li>
                ))
              }
      </ul>
      {errors.level && <Error error={errors.level.message} />}
    </div>
  )
}
