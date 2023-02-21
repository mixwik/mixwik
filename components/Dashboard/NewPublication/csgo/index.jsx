import styles from './Csgo.module.scss'

const CsgoPublication = ({ toggle, setToggle }) => {
  return (
    <section className={styles.csgo} data-open={toggle === 'csgo'}>
      <h2>Counter Strike Global Ofensive</h2>
      <button onClick={() => setToggle(false)}>Cancelar</button>
    </section>
  )
}

export default CsgoPublication
