import { BackgroundDots } from '../../../components/background-dots'
import { Title } from './title'

export const WindowLayout = ({ children, title }) => {
  return (
    <section className='absolute md:top-[10vh] w-full h-[90vh] z-20 flex justify-center items-center md:py-5 rounded-md overflow-hidden'>
      <BackgroundDots />
      <div className='relative w-full h-full overflow-scroll bg-white md:w-1/2 no-scrollbar'>
        <Title title={title} />
        {children}
      </div>
    </section>
  )
}
