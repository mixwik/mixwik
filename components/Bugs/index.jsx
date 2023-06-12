import { useEffect, useState } from 'react'
import { setBugs } from '../../firebase/hooks/setMethod/setBugs'
import styles from './Bugs.module.scss'

const Bugs = ({ setBug, user }) => {
  const [message, setMessage] = useState('')
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (message.length > 360) {
      setAlert('El mensaje no puede tener más de 360 caracteres')
    } else {
      setAlert(false)
    }
  }, [message.length])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.length <= 360 || message.length > 0) {
      setBugs(user.name, user.email, message, setBug)
    }
  }
  return (
    <div className={styles.bugs}>
      <section className={styles.bugsSection}>
        <h2>Reportar Bugs</h2>
        <p>Ayúdanos a seguir mejorando MixWik, si has encontrado un Bug por favor déjanoslo indicado lo más detallado posible, haremos todo lo posible para dejarlo solucionado lo más pronto posible.</p>
        <form className={styles.bugsForm}>
          <textarea id='message' name='message' placeholder='Mensaje' onChange={(e) => setMessage(e.target.value)} />
          <div className={styles.buttons}>
            <button
              onClick={handleSubmit}
              disabled={message.length > 360 || message.length === 0}
              type='button'
            >
              Enviar
            </button>
            <button className={styles.cancel} type='button' onClick={() => setBug(false)}>Cancelar</button>
          </div>
          <div className={styles.count}>
            {message.length}/360
          </div>
        </form>
        {alert && <p className={styles.alert}>{alert}</p>}
      </section>
    </div>
  )
}

export default Bugs
