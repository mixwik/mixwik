import Cookie from 'js-cookie'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './CookiesConsent.module.scss'

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
    <div className={styles.cookieConsent}>
      <p>Usamos cookies para asegurar que te damos la mejor experiencia en nuestra web. <Link href='/legal/politica-de-cookies'>Política de Cookies</Link></p>
      <div className={styles.buttonsCookies}>
        <button onClick={handleAccept}>Aceptar</button>
        <button onClick={handleDecline}>Rechazar</button>
      </div>
    </div>
  )
}

export default CookieConsent
