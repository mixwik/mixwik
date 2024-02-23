import { Error } from '../../../pages/registro/components/Error'

export const HoursField = (
  { register, errors, watch, title, type, registerName }:
  { register: any, watch: any, errors: any, title: string, type: string, registerName: string}
) => {
  return (
    <div className='relative w-full'>
      <label htmlFor='steps-range' className='flex flex-col w-full gap-2'>
        <span className='font-semibold text-slate-900'>
          {title}
        </span>
        <input
          {...register(registerName)}
          id='steps-range'
          type={type}
          min='0'
          max='5000'
          step='50'
          className='w-full h-3 bg-gray-100 shadow-md shadow-gray-300 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-aero [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg'
        />
      </label>
      <span className='absolute z-10 bottom-4 right-2'>{watch(registerName) > 0 ? watch(registerName) : 0}</span>
      {errors && <Error error={errors.message} />}
    </div>
  )
}
