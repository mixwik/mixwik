import { Error } from '../../../pages/registro/components/Error'

export const Description = (
  { register, errors, watch, title, registerName }:
  { register: any, watch:any, errors: any, title: string, registerName: string}
) => {
  return (
    <div className='relative w-full'>
      <label className='flex flex-col w-full gap-2'>
        <span className='font-semibold text-slate-900'>
          {title}
        </span>
        <textarea
          className='w-full p-5 mt-1 bg-gray-100 border-none shadow-lg resize-none rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
          placeholder='Máximo 350 caracteres'
          rows={3}
          {...register(registerName)}
        />
      </label>
      <span className='absolute z-10 bottom-2 right-2'>{watch(registerName).length > 0 ? watch(registerName).length : 0}/350</span>
      {errors && <Error error={errors.message} />}
    </div>
  )
}
