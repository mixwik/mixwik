// Next Components
import Image from 'next/image'

// Edit components
import EditLevel from '../../../components/EditPublication/Csgo/EditLevel'
import EditPosition from '../../../components/EditPublication/Csgo/EditPosition'
import EditDescription from '../../../components/EditPublication/EditDescription'
import EditHours from '../../../components/EditPublication/EditHours'
import { EditImages } from '../../../components/EditPublication/EditImages'
import EditTypeOfGamer from '../../../components/EditPublication/EditTypeOfGamer'

// Hooks
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition } from '../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'

// Components
import { Carousel } from 'react-responsive-carousel'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { myLoader } from '../../../components/myLoader'

// Icons
import { EditIcon } from '../../../components/Svg'

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import EditAge from '../../../components/EditPublication/EditAge'
import EditTitle from '../../../components/EditPublication/EditTitle'
import styles from './Team.module.scss'

const Team = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const user = useSession()
  const currentPosition = useCurrentPosition()
  const currentCsgo = useGetOnePublication('teams', id)
  const currentUser = useGetOneData('users', currentCsgo.uid)
  const limitedAdministrator = useLimitedAdministrator(user.uid, currentUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)

  if (currentCsgo.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  const handleUpdatePosition = () => {
    updatePublicationPosition('teams', id, currentPosition)
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
          <div className={styles.equip}>
            Team
          </div>
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
                category='teams'
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
          <div className={styles.publicationTitle}>
            {
              edit === 'title'
                ? (
                  <EditTitle category='csgo' id={id} title={currentCsgo.title} setEdit={setEdit} />
                  )
                : (
                  <h1>
                    {currentCsgo.title}
                    {limitedAdministrator &&
                      <button onClick={() => setEdit('title')}>
                        <EditIcon />
                      </button>}
                  </h1>
                  )
            }

          </div>
          <div className={styles.description}>
            {
            edit === 'description'
              ? (
                <EditDescription
                  category='teams'
                  id={id}
                  setEdit={setEdit}
                  description={currentCsgo.description}
                />
                )
              : (
                <p>{currentCsgo.description}
                  {limitedAdministrator &&
                    <button onClick={() => setEdit('description')}>
                      <EditIcon />
                    </button>}
                </p>
                )
          }
          </div>
          <article className={styles.typeOfGamer}>
            {
            edit === 'typeOfGamer'
              ? (
                <EditTypeOfGamer category='teams' id={id} typeOfGamer={currentCsgo.typeOfGamer} setEdit={setEdit} />
                )
              : (
                <>
                  <h2>Tipo de jugador:
                    {
                    limitedAdministrator &&
                      <button onClick={() => setEdit('typeOfGamer')}>
                        <EditIcon />
                      </button>
                    }
                  </h2>
                  <ul>
                    {
                      currentCsgo.typeOfGamer.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))
                    }
                  </ul>
                </>
                )
          }
          </article>
          <article className={styles.level}>
            {
              edit === 'level'
                ? (
                  <EditLevel category='teams' id={id} level={currentCsgo.level} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Buscamos jugadores de nivel:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('level')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        currentCsgo.level.map((level, index) => (
                          <li key={index}>{level}</li>
                        ))
                      }
                    </ul>
                  </>
                  )
            }
          </article>
          <article className={styles.position}>
            {
              edit === 'position'
                ? (
                  <EditPosition category='teams' id={id} position={currentCsgo.position} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      {currentCsgo.position.length === 1 ? 'Necesitamos cubrir la siguiente Posición:' : 'Necesitamos cubrir las siguientes Posiciones:'}
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('position')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        currentCsgo.position.map((pos, index) => (
                          <li key={index}>{pos}</li>
                        ))
                      }
                    </ul>
                  </>
                  )
            }
          </article>
          <article className={styles.hours}>
            {
              edit === 'hours'
                ? (
                  <EditHours category='teams' id={id} hours={currentCsgo.hours} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Horas mínimas jugadas:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('hours')}><EditIcon /></button>}
                    </h2>
                    {currentCsgo.hours}h
                  </>
                  )
            }
          </article>
          <article className={styles.age}>
            {
              edit === 'age'
                ? (
                  <EditAge category='teams' id={id} age={currentCsgo.age} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Edad mínima:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('age')}><EditIcon /></button>}
                    </h2>
                    {currentCsgo.age} años
                  </>
                  )
            }
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

export default Team
