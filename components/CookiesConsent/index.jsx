import Cookie from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)
  const [, setConsentAccepted] = useState(false)

  useEffect(() => {
    const hasConsent = Cookie.get('cookieConsent')
    if (hasConsent) {
      setConsentAccepted(true)
    } else {
      setShowConsent(true)
    }
  }, [])
  const handleAccept = () => {
    Cookie.set('cookieConsent', 'true', { expires: 365 })
    setConsentAccepted(true)
    setShowConsent(false)
  }

  const handleDecline = () => {
    setConsentAccepted(false)
    setShowConsent(false)
    // Aquí puedes agregar lógica adicional para manejar el rechazo de las cookies
  }

  if (!showConsent) return null

  return (
    <div className='fixed bottom-0 z-[100] flex flex-col items-center justify-center w-full bg-aero p-5 text-white'>
      <p>Usamos cookies para asegurar que te damos la mejor experiencia en nuestra web. <Link href='/legal/politica-de-cookies'>Política de Cookies</Link></p>
      <div className='flex gap-5'>
        <button className='px-5 py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500' onClick={handleAccept}>Aceptar</button>
        <button onClick={handleDecline}>Rechazar</button>
      </div>
    </div>
  )
}

export default CookieConsent
