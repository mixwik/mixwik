import { BackgroundDots } from '../../../components/background-dots'

export const WindowLayout = ({ children }) => {
  return (
    <section className='absolute md:top-[10vh] w-full h-[90vh] z-20 flex justify-center items-center md:py-5'>
      <BackgroundDots />
      <div className='w-full h-full overflow-scroll bg-white md:w-1/2 no-scrollbar'>
        {children}
      </div>
    </section>
  )
}
