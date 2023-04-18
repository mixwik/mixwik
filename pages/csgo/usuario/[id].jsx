// Next Components
import Image from 'next/image'
import Link from 'next/link'

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
import EditTitle from '../../../components/EditPublication/EditTitle'
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { myLoader } from '../../../components/myLoader'

// Icons
import { EditIcon } from '../../../components/Svg'

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from './User.module.scss'

// Images
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import background from '../../../public/bg/bg_gray.jpg'

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

  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la publicación de ${currentUser.name}?`)) {
      deletePublication('csgo', id, currentUser.id)
    }
  }

  return (
    <Layout>
      <div className={styles.user}>
        <Image width={0} height={0} loader={myLoader} src={background} alt='Fondo' className={styles.background} />
        <section className={styles.userBox}>
          {
            mixWikTeams && (
              <div className={styles.mixWikTeam}>
                Usuario Teams
              </div>
            )
          }
          <div className={styles.profileUser} data-active={mixWikTeams}>
            <Link target='_blanc' href={`/user/${currentUser.uid}`}>
              <Image width={0} height={0} loader={myLoader} src={currentUser.profileImg} alt={`Imagen de perfil de ${currentUser.name}`} />
              {currentUser.name}
            </Link>
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
                category='csgo'
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
                  category='csgo'
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
                <EditTypeOfGamer category='csgo' id={id} typeOfGamer={currentCsgo.typeOfGamer} setEdit={setEdit} />
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
                  <EditLevel category='csgo' id={id} level={currentCsgo.level} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Nivel:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('level')}><EditIcon /></button>}
                    </h2>
                    <div className={styles.levelBox}>
                      {currentCsgo.level}
                    </div>
                  </>
                  )
            }
          </article>
          <article className={styles.position}>
            {
              edit === 'position'
                ? (
                  <EditPosition category='csgo' id={id} position={currentCsgo.position} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      {currentCsgo.position.length === 1 ? 'Posición:' : 'Posiciones:'}
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
                  <EditHours category='csgo' id={id} hours={currentCsgo.hours} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Horas Jugadas:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('hours')}><EditIcon /></button>}
                    </h2>
                    {currentCsgo.hours}h
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
          {
            limitedAdministrator && (<Link href={`https://buy.stripe.com/test_cN2g1DfD1di73xS149?prefilled_email=${currentUser.email}&client_reference_id=${currentUser.uid}`}>Cobre</Link>)
          }
        </section>
        {
          (master1 === user.uid || master2 === user.uid) && (
            <button className={styles.masterDelete} onClick={handleDelete}>Eliminar</button>
          )
        }
      </div>
    </Layout>
  )
}

export default User
