import Link from 'next/link'
import { WindowLayout } from './window-layout'

export const Promotion = ({ page, userServer }) => {
  if (page !== 'promotion') return null
  return (
    <WindowLayout title='Promociona una publicación'>
      <h1 className='p-5 text-2xl font-extrabold text-center md:text-4xl'>Elige tu plan</h1>
      <div className='flex flex-col gap-5 p-5'>
        <p>Selecciona el plan que más te convenga para <span className='font-bold text-indigo-600'>promocionar</span> tu publicación.</p>
        <p>Una vez realizado el pago <span className='font-semibold text-pennBlue'>podrás elegir cual de tus publicaciones quieres promocionar.</span></p>
        <p>La publicación elegida se mostrará en <span className='font-semibold text-aero'>los primeros puestos a nivel nacional</span> durante 3, 7 o 15 días, dependiendo del nivel que hayas elegido</p>
        <p className='font-bold text-pennBlue'>Ninguno de los planes se auto-renueva</p>
      </div>
      <ul className='grid gap-5 md:grid-cols-3'>
        <li
          className='bg-[#cd7f32] m-5 p-5 rounded-md h-40 flex justify-center items-center shadow-xl'
          style={{ clipPath: 'polygon(49% 0, 100% 30%, 100% 100%, 50% 80%, 0 100%, 0 30%)' }}
        >
          <Link className='flex flex-col items-center' href={`https://buy.stripe.com/7sIg0231C4yo0Mw7st?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-black'>Bronce</h3>
            <p className='text-balance'>
              3 días por 1€
            </p>
          </Link>
        </li>
        <li
          className='bg-[#c0c0c0] m-5 p-5 rounded-md shadow-lg flex items-center justify-center flex-col gap-3 h-40'
          style={{ clipPath: 'polygon(49% 0, 100% 30%, 100% 100%, 50% 80%, 0 100%, 0 30%)' }}
        >
          <Link href={`https://buy.stripe.com/4gwdRUau4gh6bra28a?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-center text-black'>Plata</h3>
            <p className='text-balance'>
              7 días por 2€
            </p>

          </Link>
        </li>
        <li
          className='bg-[#ffd700] m-5 p-5 rounded-md shadow-lg flex items-center flex-col gap-3 h-40 justify-center'
          style={{ clipPath: 'polygon(49% 0, 100% 30%, 100% 100%, 50% 80%, 0 100%, 0 30%)' }}
        >
          <Link href={`https://buy.stripe.com/3cs1589q0fd2dzi7sv?prefilled_email=${userServer?.email}&client_reference_id=${userServer?.uid}`}>
            <h3 className='text-xl font-bold text-center text-black'>Oro</h3>
            <p className='text-balance'>
              15 días por 3€
            </p>
          </Link>
        </li>
      </ul>
    </WindowLayout>
  )
}
