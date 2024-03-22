interface DescriptionProps {
    description: string | undefined
}

export const Description = ({ description }: DescriptionProps) => {
  return (
    <p className='text-balance'>{description}</p>
  )
}
