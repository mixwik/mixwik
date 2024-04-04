interface TitleProps {
    title: string
}

export const Title = ({ title }: TitleProps) => {
  return (
    <h1 className='text-2xl font-bold md:text-3xl text-balance'>{title}</h1>
  )
}
