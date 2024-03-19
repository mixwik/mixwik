const BoxCards = ({ children, title }) => {
  return (
    <article className='w-full bg-white'>
      <h3 className='p-5 text-xl font-bold'>{title}</h3>
      <div className='flex flex-wrap justify-between gap-y-5'>
        {children}
      </div>
    </article>
  )
}

export default BoxCards
