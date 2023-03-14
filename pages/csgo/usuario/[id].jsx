import styles from './User.module.scss'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '../../../components/Layout'
import { myLoader } from '../../../components/myLoader'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import UserMap from '../../../components/UserMap'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const User = () => {
  const router = useRouter()
  const { id } = router.query

  const currentCsgo = useGetOnePublication('csgo', id)
  const currentUser = useGetOneData('users', currentCsgo.uid)

  const images = []
  currentCsgo.img && images.push(currentCsgo.img)
  currentCsgo.img2 && images.push(currentCsgo.img2)
  currentCsgo.img3 && images.push(currentCsgo.img3)
  currentCsgo.img4 && images.push(currentCsgo.img4)
  currentCsgo.img5 && images.push(currentCsgo.img5)
  currentCsgo.img6 && images.push(currentCsgo.img6)

  if (currentCsgo.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userBox}>
          <Carousel
            showStatus={false}
          >
            {

         images.map((res, index) => (
           res !== '' && <Image key={index} loader={myLoader} width={0} height={0} src={res} alt={currentUser.name} />

         ))
        }
          </Carousel>
          <h1 className={styles.title}>
            {currentUser.name}
          </h1>
          <p className={styles.description}>{currentCsgo.description}</p>
          <article className={styles.typeOfGamer}>
            <h2>Tipo de jugador:</h2>
            <ul>
              {
                currentCsgo.typeOfGamer.map((type, index) => (
                  <li key={index}>{type}</li>
                ))
              }
            </ul>
          </article>
          <article className={styles.level}>
            <h2>Nivel:</h2>
            {currentCsgo.level}
          </article>
          <article className={styles.position}>
            <h2>{currentCsgo.position.length === 1 ? 'Posición:' : 'Posiciones:'}</h2>
            <ul>
              {
                currentCsgo.position.map((pos, index) => (
                  <li key={index}>{pos}</li>
                ))
              }
            </ul>
          </article>
          <article className={styles.hours}>
            <h2>Horas Jugadas:</h2>
            {currentCsgo.hours}h
          </article>
          <article className={styles.map}>
            <UserMap user={currentUser} />
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default User
