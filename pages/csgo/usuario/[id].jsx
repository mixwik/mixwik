import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { EditImages } from '../../../components/EditPublication/EditImages'
import Layout from '../../../components/Layout'
import { myLoader } from '../../../components/myLoader'
import { EditIcon } from '../../../components/Svg'
import UserMap from '../../../components/UserMap'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition } from '../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'
import styles from './User.module.scss'

const User = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const user = useSession()
  const currentPosition = useCurrentPosition()
  const currentCsgo = useGetOnePublication('csgo', id)
  const currentUser = useGetOneData('users', currentCsgo.uid)
  const limitedAdministrator = useLimitedAdministrator(user.uid, currentUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)

  if (currentCsgo.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  const handleUpdatePosition = () => {
    updatePublicationPosition('csgo', id, currentPosition)
  }

  const images = []
  currentCsgo.img.url !== '' && images.push(currentCsgo.img.url)
  currentCsgo.img2.url !== '' && images.push(currentCsgo.img2.url)
  currentCsgo.img3.url !== '' && images.push(currentCsgo.img3.url)
  currentCsgo.img4.url !== '' && images.push(currentCsgo.img4.url)
  currentCsgo.img5.url !== '' && images.push(currentCsgo.img5.url)
  currentCsgo.img6.url !== '' && images.push(currentCsgo.img6.url)
  currentCsgo.img7.url !== '' && images.push(currentCsgo.img7.url)

  return (
    <Layout>
      <div className={styles.user}>
        <section className={styles.userBox}>
          <div className={styles.imgBox}>
            <Carousel
              className={styles.carousel}
              showStatus={false}
            >
              {
                images.map((res, index) => (
                  res !== '' && <Image key={index} loader={myLoader} width={0} height={0} src={res} alt={currentUser.name} />
                ))
              }
            </Carousel>
            {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('images')}><EditIcon /></button>}
            {edit === 'images' && (
              <EditImages
                id={id}
                name='csgo'
                currentUser={currentUser}
                prevImg={currentCsgo.img}
                prevImg2={currentCsgo.img2}
                prevImg3={currentCsgo.img3}
                prevImg4={currentCsgo.img4}
                prevImg5={currentCsgo.img5}
                prevImg6={currentCsgo.img6}
                prevImg7={currentCsgo.img7}
                setEdit={setEdit}
                mixWikTeams={mixWikTeams}
              />)}
          </div>
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
            {
              limitedAdministrator && <button onClick={handleUpdatePosition}>Cambiar a posición actual</button>
            }
            <UserMap user={currentUser} publication={currentCsgo} />
          </article>
        </section>
      </div>
    </Layout>
  )
}

export default User
