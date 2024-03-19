interface BackgroundDotsProps {
  link?: string
}

export const BackgroundDots = ({ link }: BackgroundDotsProps) => {
  return (
    <a href={`/${link}`} className='cursor-default'>
      <div className='fixed inset-0 -z-10 h-full w-full bg-slate-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]' />
    </a>
  )
}
