import { Error } from '../../../../pages/registro/components/Error'

export const AffiliateCode = (
  { register, errors, title, registerName }:
  { register: any, errors: any, title: string, registerName: string}
) => {
  return (
    <label className='relative flex flex-col w-full gap-2'>
      <span className='font-semibold text-slate-900'>
        {title}
      </span>
      <input
        {...register(registerName)}
        className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
      />
      {errors && <Error error={errors.message} />}
    </label>
  )
}
