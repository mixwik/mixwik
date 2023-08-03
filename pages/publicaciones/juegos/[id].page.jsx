// Next Components
import Image from 'next/image'

// Edit components

// Hooks
import { useRouter } from 'next/router'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition, updateUserAdmonition } from '../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'

// Components
import Layout from '../../../components/Layout'
import UserMap from '../../../components/UserMap'
import { myLoader } from '../../../components/myLoader'

// Icons

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// Images
import PageLoader from '../../../components/Loaders/PageLoader'
import PromotionMethods from '../../../components/PromotionMethods'
import { COLLECTIONS } from '../../../domain/constants'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import background from '../../../public/bg/bg_gray.svg'
import Age from '../components/Age'
import ImagesCarousel from '../components/Carousel'
import Description from '../components/Description'
import Hours from '../components/Hours'
import Level from '../components/Level'
import Position from '../components/Position'
import PreferenceTeam from '../components/PreferenceTeam'
import ProfileUser from '../components/ProfileUser'
import Social from '../components/Social'
import Title from '../components/Title'
import TypeOfGamer from '../components/TypeOfGamer'

const User = () => {
  const router = useRouter()
  const { id, page } = router.query
  const user = useSession()
  const currentPosition = useCurrentPosition()
  const publication = useGetOnePublication(page, id)
  const publicationUser = useGetOneData(COLLECTIONS.users, publication.uid)
  const limitedAdministrator = useLimitedAdministrator(user.uid, publicationUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(publicationUser.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(publication.promotion)

  if (publication.length === 0) return <PageLoader />
  if (publicationUser.length === 0) return <PageLoader />

  const handleUpdatePosition = () => {
    updatePublicationPosition(page, id, currentPosition)
  }

  const images = []
  publication.img.url !== '' && images.push(publication.img.url)
  publication.img2.url !== '' && images.push(publication.img2.url)
  publication.img3.url !== '' && images.push(publication.img3.url)
  publication.img4.url !== '' && images.push(publication.img4.url)
  publication.img5.url !== '' && images.push(publication.img5.url)
  publication.img6.url !== '' && images.push(publication.img6.url)
  publication.img7.url !== '' && images.push(publication.img7.url)

  const master1 = process.env.NEXT_PUBLIC_MASTER1
  const master2 = process.env.NEXT_PUBLIC_MASTER2

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la publicación de ${publicationUser.name}?`)) {
      deletePublication(page, id, publicationUser.id, page === COLLECTIONS.teams ? publication.category : page)
      updateUserAdmonition(publicationUser.id, 1)
    }
  }
  const isNewPosition = JSON.stringify(publication.geometry) !== JSON.stringify(currentPosition)

  return (
    <Layout>
      <div className='relative flex flex-col w-[100vw] items-center justify-center'>
        <Image width={0} height={0} loader={myLoader} src={background} alt='Fondo' className='absolute top-0 left-0 w-full h-full' />
        <section className='md:w-[40vw] w-full bg-white relative'>
          {
            mixWikTeams && (
              <div className={`text-xl font-bold text-center text-white bg-aero ${page === COLLECTIONS.teams && 'bg-orange text-black'}`}>
                {
                  page === 'teams' ? 'Equipo' : 'Jugador'
                }
              </div>
            )
          }
          <ProfileUser
            mixWikTeams={mixWikTeams}
            publicationUser={publicationUser}
            idPublication={id}
            user={user}
          />
          <ImagesCarousel
            images={images}
            limitedAdministrator={limitedAdministrator}
            publication={publication}
            publicationUser={publicationUser}
            mixWikTeams={mixWikTeams}
            id={id}
            page={page}
          />
          <Title
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Description
            id={id}
            page={page}
            limitedAdministrator={limitedAdministrator}
            publication={publication}
          />
          <TypeOfGamer
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Level
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Position
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <PreferenceTeam
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Hours
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Age
            id={id}
            page={page}
            publication={publication}
            limitedAdministrator={limitedAdministrator}
          />
          <Social
            publicationUser={publicationUser}
            mixWikTeams={mixWikTeams}
            limitedAdministrator={limitedAdministrator}
          />
          <article className='relative px-5'>
            {
              (limitedAdministrator && isNewPosition) && (

                <div className='flex flex-col items-center p-2 mb-5 bg-yellow-100'>
                  <p className='font-bold text-center'>Hemos detectado que has cambiado de localización ¿Deseas cambiar la posición de la publicación a tu posición actual?</p>
                  <button className='z-10 p-2 font-bold rounded-md right-8 top-3 bg-orange' onClick={handleUpdatePosition}>Cambiar a mi posición actual</button>
                </div>
              )
            }
            <UserMap user={publicationUser} publication={publication} />
          </article>
          <PromotionMethods
            limitedAdministrator={limitedAdministrator}
            promotion={promotion}
            currentUser={publicationUser}
          />
        </section>
        {
          (master1 === user.uid || master2 === user.uid) && (
            <button className='' onClick={handleDelete}>Eliminar</button>
          )
        }
      </div>
    </Layout>
  )
}

export default User
