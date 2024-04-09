import Link from 'next/link'
import { WindowLayout } from './window-layout'

export const Promotion = ({ page, userServer }) => {
  if (page !== 'promotion') return null
  return (
    <WindowLayout title='Promociona una publicación'>
      <h1 className='p-5 text-2xl font-extrabold text-center md:text-4xl'>Elige tu plan</h1>
      <div className='flex flex-col gap-5 p-5'>
        <p>Selecciona el plan que más te convenga para <span className='font-semibold text-aero'>promocionar</span> tu publicación.</p>
        <p>Una vez realizado el pago <span className='font-semibold text-pennBlue'>podrás elegir cual de tus publicaciones quieres promocionar.</span></p>
        <p>La publicación elegida se mostrará en <span className='font-semibold text-aero'>los primeros puestos a nivel nacional</span> durante 3, 7 o 15 días, dependiendo del nivel que hayas elegido</p>
      </div>
      <ul className='grid gap-5 md:grid-cols-3'>
        <li className='bg-[#cd7f32] m-5 p-5 rounded-md shadow-lg'>
          <Link className='flex flex-col items-center gap-3' href={`https://buy.stripe.com/7sIg0231C4yo0Mw7st?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-black'>Bronce</h3>
            <p className='text-balance'>
              Promociona tu publicación durante 3 días por 1€, (no se auto-renueva)
            </p>
          </Link>
        </li>
        <li className='bg-[#c0c0c0] m-5 p-5 rounded-md shadow-lg flex items-center flex-col gap-3'>
          <Link href={`https://buy.stripe.com/4gwdRUau4gh6bra28a?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-center text-black'>Plata</h3>
            <p className='text-balance'>
              Promociona tu publicación durante 7 días por 2€, (no se auto-renueva)
            </p>

          </Link>
        </li>
        <li className='bg-[#ffd700] m-5 p-5 rounded-md shadow-lg flex items-center flex-col gap-3'>
          <Link href={`https://buy.stripe.com/3cs1589q0fd2dzi7sv?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-center text-black'>Oro</h3>
            <p className='text-balance'>
              Promociona tu publicación durante 15 días por 3€, (no se auto-renueva)
            </p>
          </Link>
        </li>
      </ul>
    </WindowLayout>
  )
}
