const BoxCards = ({ children, title }) => {
  return (
    <article className='w-full bg-white'>
      <h3 className='p-5 text-xl font-bold'>{title}</h3>
      <div className='grid grid-cols-1 gap-5 place-items-center md:grid-cols-3 md:p-5'>
        {children}
      </div>
    </article>
  )
}

export default BoxCards
