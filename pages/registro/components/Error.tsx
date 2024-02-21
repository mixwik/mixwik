export const Error = ({ error }: { error: string | undefined }) => {
  return (
    <p className='absolute text-sm text-red-400 -bottom-5 md:-bottom-7'>{error}</p>
  )
}
