// styles
import FormUserData from '../FormUserData'
import Layout from '../Layout'
import styles from './NewUser.module.scss'

const NewUser = () => {
  return (
    <Layout>
      <section className={styles.newUser}>
        <h1 className={styles.title}>Bienvenido a MixWik</h1>
        <p>Estamos muy felices de tenerte en nuestra comunidad, en MixWik podrás encontrar jugadores cerca de tí y formar equipo para lograr la victoria 🏆</p>
        <p>Pero antes de poder comenzar a publicar anuncios necesitamos saber de tí, por favor rellena los siguientes datos:</p>
        <FormUserData method='set' />
      </section>
    </Layout>
  )
}

export default NewUser
