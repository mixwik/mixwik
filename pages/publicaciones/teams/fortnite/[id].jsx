// Next Components
import Image from 'next/image'

// Edit components
import EditDescription from '../../../../components/EditPublication/EditDescription'
import EditHours from '../../../../components/EditPublication/EditHours'
import { EditImages } from '../../../../components/EditPublication/EditImages'
import EditTypeOfGamer from '../../../../components/EditPublication/EditTypeOfGamer'
import EditPosition from '../../../../components/EditPublication/Fortnite/EditPosition'
import EditPreferenceTeam from '../../../../components/EditPublication/Fortnite/EditPreferenceTeam'

// Hooks
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSession } from '../../../../firebase/auth/useSession'
import { useGetOneData } from '../../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition, updateUserAdmonition } from '../../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../../hooks/useChecksStripe'
import { useCurrentPosition } from '../../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../../hooks/useLimitedAdministrator'

// Components
import { Carousel } from 'react-responsive-carousel'
import Layout from '../../../../components/Layout'
import UserMap from '../../../../components/UserMap'
import { myLoader } from '../../../../components/myLoader'

// Icons
import { EditIcon } from '../../../../components/Svg'

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import EditAge from '../../../../components/EditPublication/EditAge'
import EditTitle from '../../../../components/EditPublication/EditTitle'
import styles from '../Team.module.scss'

// Images
import Link from 'next/link'
import PromotionMethods from '../../../../components/PromotionMethods'
import { deletePublication } from '../../../../firebase/hooks/deleteMethod'
import background from '../../../../public/bg/bg_gray.svg'

const Team = () => {
  const [edit, setEdit] = useState(false)
  const router = useRouter()
  const { id } = router.query
  const user = useSession()
  const currentPosition = useCurrentPosition()
  const currentTeams = useGetOnePublication('teams', id)
  const currentUser = useGetOneData('users', currentTeams.uid)
  const limitedAdministrator = useLimitedAdministrator(user.uid, currentUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(currentUser.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(currentTeams.mixWikTeams)

  if (currentTeams.length === 0) return <div>Loading...</div>
  if (currentUser.length === 0) return <div>Loading...</div>

  const handleUpdatePosition = () => {
    updatePublicationPosition('teams', id, currentPosition)
  }

  const images = []
  currentTeams.img.url !== '' && images.push(currentTeams.img.url)
  currentTeams.img2.url !== '' && images.push(currentTeams.img2.url)
  currentTeams.img3.url !== '' && images.push(currentTeams.img3.url)
  currentTeams.img4.url !== '' && images.push(currentTeams.img4.url)
  currentTeams.img5.url !== '' && images.push(currentTeams.img5.url)
  currentTeams.img6.url !== '' && images.push(currentTeams.img6.url)
  currentTeams.img7.url !== '' && images.push(currentTeams.img7.url)

  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la publicación de ${currentUser.name}?`)) {
      deletePublication('teams', id, currentUser.id, 'fortnite')
      updateUserAdmonition(currentUser.id, 1)
    }
  }

  return (
    <Layout>
      <div className={styles.user}>
        <Image width={0} height={0} loader={myLoader} src={background} alt='Fondo' className={styles.background} />
        <section className={styles.userBox}>
          <div className={styles.equip}>
            Team
          </div>
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
                category='teams'
                currentUser={currentUser}
                prevImg={currentTeams.img}
                prevImg2={currentTeams.img2}
                prevImg3={currentTeams.img3}
                prevImg4={currentTeams.img4}
                prevImg5={currentTeams.img5}
                prevImg6={currentTeams.img6}
                prevImg7={currentTeams.img7}
                setEdit={setEdit}
                mixWikTeams={mixWikTeams}
              />)}
          </div>
          <div className={styles.publicationTitle}>
            {
              edit === 'title'
                ? (
                  <EditTitle category='teams' id={id} title={currentTeams.title} setEdit={setEdit} />
                  )
                : (
                  <h1>
                    {currentTeams.title}
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
                  description={currentTeams.description}
                />
                )
              : (
                <p>{currentTeams.description}
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
                <EditTypeOfGamer category='teams' id={id} typeOfGamer={currentTeams.typeOfGamer} setEdit={setEdit} />
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
                      currentTeams.typeOfGamer.map((type, index) => (
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
              edit === 'preferenceTeam'
                ? (
                  <EditPreferenceTeam category='teams' id={id} preferenceTeam={currentTeams.preferenceTeam} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Buscamos jugadores que jueguen en:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('preferenceTeam')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        currentTeams.preferenceTeam.map((preferenceTeam, index) => (
                          <li key={index}>{preferenceTeam}</li>
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
                  <EditPosition category='teams' id={id} position={currentTeams.position} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      {currentTeams.position.length === 1 ? 'Necesitamos cubrir la siguiente Posición:' : 'Necesitamos cubrir las siguientes Posiciones:'}
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('position')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        currentTeams.position.map((pos, index) => (
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
                  <EditHours category='teams' id={id} hours={currentTeams.hours} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Horas mínimas jugadas:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('hours')}><EditIcon /></button>}
                    </h2>
                    {currentTeams.hours}h
                  </>
                  )
            }
          </article>
          <article className={styles.age}>
            {
              edit === 'age'
                ? (
                  <EditAge category='teams' id={id} age={currentTeams.age} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Edad mínima:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('age')}><EditIcon /></button>}
                    </h2>
                    {currentTeams.age} años
                  </>
                  )
            }
          </article>
          <article className={styles.map}>
            {
              limitedAdministrator && <button onClick={handleUpdatePosition}>Cambiar a posición actual</button>
            }
            <UserMap user={currentUser} publication={currentTeams} />
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

export default Team
