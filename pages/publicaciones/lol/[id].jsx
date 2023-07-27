// Next Components
import Image from 'next/image'
import Link from 'next/link'

// Edit components
import EditDescription from '../../../components/EditPublication/EditDescription'
import EditHours from '../../../components/EditPublication/EditHours'
import { EditImages } from '../../../components/EditPublication/EditImages'
import EditTitle from '../../../components/EditPublication/EditTitle'
import EditTypeOfGamer from '../../../components/EditPublication/EditTypeOfGamer'
import EditLevel from '../../../components/EditPublication/Lol/EditLevel'
import EditPosition from '../../../components/EditPublication/Lol/EditPosition'

// Hooks
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition, updateUserAdmonition } from '../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'

// Components
import { Carousel } from 'react-responsive-carousel'
import Layout from '../../../components/Layout'
import SocialLinks from '../../../components/SocialLinks'
import UserMap from '../../../components/UserMap'
import { myLoader } from '../../../components/myLoader'

// Icons
import { EditIcon } from '../../../components/Svg'

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import styles from '../Publications.module.scss'

// Images
import PromotionMethods from '../../../components/PromotionMethods'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import background from '../../../public/bg/bg_gray.svg'

const User = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const user = useSession()
  const currentPosition = useCurrentPosition()
  const currentLol = useGetOnePublication('lol', id)
  const currentUser = useGetOneData('users', currentLol.uid)
  const limitedAdministrator = useLimitedAdministrator(user.uid, currentUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(currentLol.promotion)

  if (currentLol.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  const handleUpdatePosition = () => {
    updatePublicationPosition('lol', id, currentPosition)
  }

  const images = []
  currentLol.img.url !== '' && images.push(currentLol.img.url)
  currentLol.img2.url !== '' && images.push(currentLol.img2.url)
  currentLol.img3.url !== '' && images.push(currentLol.img3.url)
  currentLol.img4.url !== '' && images.push(currentLol.img4.url)
  currentLol.img5.url !== '' && images.push(currentLol.img5.url)
  currentLol.img6.url !== '' && images.push(currentLol.img6.url)
  currentLol.img7.url !== '' && images.push(currentLol.img7.url)

  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la publicación de ${currentUser.name}?`)) {
      deletePublication('lol', id, currentUser.id, 'lol')
      updateUserAdmonition(currentUser.id, 1)
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
                category='lol'
                currentUser={currentUser}
                prevImg={currentLol.img}
                prevImg2={currentLol.img2}
                prevImg3={currentLol.img3}
                prevImg4={currentLol.img4}
                prevImg5={currentLol.img5}
                prevImg6={currentLol.img6}
                prevImg7={currentLol.img7}
                setEdit={setEdit}
                mixWikTeams={mixWikTeams}
              />)}
          </div>
          <div className={styles.publicationTitle}>
            {
              edit === 'title'
                ? (
                  <EditTitle category='lol' id={id} title={currentLol.title} setEdit={setEdit} />
                  )
                : (
                  <h1>
                    {currentLol.title}
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
                  category='lol'
                  id={id}
                  setEdit={setEdit}
                  description={currentLol.description}
                />
                )
              : (
                <p>{currentLol.description}
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
                <EditTypeOfGamer category='lol' id={id} typeOfGamer={currentLol.typeOfGamer} setEdit={setEdit} />
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
                      currentLol.typeOfGamer.map((type, index) => (
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
                  <EditLevel category='lol' id={id} level={currentLol.level} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Nivel:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('level')}><EditIcon /></button>}
                    </h2>
                    <div className={styles.levelBox}>
                      {currentLol.level}
                    </div>
                  </>
                  )
            }
          </article>
          <article className={styles.position}>
            {
              edit === 'position'
                ? (
                  <EditPosition category='lol' id={id} position={currentLol.position} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      {currentLol.position.length === 1 ? 'Posición:' : 'Posiciones:'}
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('position')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        currentLol.position.map((pos, index) => (
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
                  <EditHours category='lol' id={id} hours={currentLol.hours} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Horas Jugadas:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('hours')}><EditIcon /></button>}
                    </h2>
                    {currentLol.hours}h
                  </>
                  )
            }
          </article>
          <article className={styles.social}>
            <h2>
              Vías de contacto:
              {limitedAdministrator && <Link href='/dashboard?page=profile' target='_blank' className={styles.editButtonImages}><EditIcon /></Link>}
            </h2>
            <SocialLinks mixWikTeams={mixWikTeams} user={currentUser} />
          </article>
          <article className={styles.map}>
            {
              limitedAdministrator && <button onClick={handleUpdatePosition}>Cambiar a posición actual</button>
            }
            <UserMap user={currentUser} publication={currentLol} />
          </article>
          <PromotionMethods
            limitedAdministrator={limitedAdministrator}
            promotion={promotion}
            currentUser={currentUser}
          />
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
