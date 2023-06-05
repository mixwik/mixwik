import { useState } from 'react'
import { setBugs } from '../../firebase/hooks/setMethod/setBugs'
import styles from './Bugs.module.scss'

const Bugs = ({ setBug, user }) => {
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    setBugs(user.name, user.email, message, setBug)
  }
  return (
    <div className={styles.bugs}>
      <section className={styles.bugsSection}>
        <h2>Reportar Bugs</h2>
        <p>Ayúdanos a seguir mejorando MixWik, si has encontrado un Bug por favor déjanoslo indicado lo más detallado posible, haremos todo lo posible para dejarlo solucionado lo más pronto posible.</p>
        <form className={styles.bugsForm} onSubmit={handleSubmit}>
          <textarea id='message' name='message' placeholder='Mensaje' onChange={(e) => setMessage(e.target.value)} />
          {message}
          <div className={styles.buttons}>
            <button type='submit'>Enviar</button>
            <button className={styles.cancel} type='button' onClick={() => setBug(false)}>Cancelar</button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default Bugs
