// Hooks
import { useRouter } from 'next/router'
import { useSession } from '../../../firebase/auth/useSession'
import { useGetOneData } from '../../../firebase/hooks/getMethod/useGetOneData'
import { useGetOnePublication } from '../../../firebase/hooks/getMethod/useGetOnePublication'
import { updatePublicationPosition, updateUserAdmonition } from '../../../firebase/hooks/updateMethod/updateUserData'
import { useMixWikTeamsCheckSubscription } from '../../../hooks/useChecksStripe'
import { useConfirmUserRegister } from '../../../hooks/useConfirmUserRegister'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'
import { useLimitedAdministrator } from '../../../hooks/useLimitedAdministrator'

// Components
import Layout from '../../../components/Layout'
import PageLoader from '../../../components/Loaders/PageLoader'
import PromotionMethods from '../../../components/PromotionMethods'
import UserMap from '../../../components/UserMap'
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

// Icons

// styles
import 'react-responsive-carousel/lib/styles/carousel.min.css'

// Images
import { COLLECTIONS } from '../../../domain/constants'
import { deletePublication } from '../../../firebase/hooks/deleteMethod'
import { useMaster } from '../../../hooks/useMaster'

const User = () => {
  useConfirmUserRegister()
  const { userProvider } = useSession()
  const { master } = useMaster()
  const router = useRouter()
  const { id, page } = router.query
  const currentPosition = useCurrentPosition()
  const publication = useGetOnePublication(page, id)
  const publicationUser = useGetOneData(COLLECTIONS.users, publication.uid)
  const limitedAdministrator = useLimitedAdministrator(userProvider?.uid, publicationUser.uid)
  const mixWikTeams = useMixWikTeamsCheckSubscription(publicationUser.mixWikTeams)
  const promotion = useMixWikTeamsCheckSubscription(publication.promotion)

  const handleUpdatePosition = (e) => {
    e.preventDefault()
    updatePublicationPosition(page, id, currentPosition)
  }

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar la publicación de ${publicationUser.name}?`)) {
      deletePublication(page, id, publicationUser.id, publication.category)
      updateUserAdmonition(publicationUser.id, 1)
    }
  }
  const isNewPosition = JSON.stringify(publication.geometry) !== JSON.stringify(currentPosition)

  if (publication.length === 0) return <PageLoader />
  if (publicationUser.length === 0) return <PageLoader />

  const images = []
  publication.img.url !== '' && images.push(publication.img.url)
  publication.img2.url !== '' && images.push(publication.img2.url)
  publication.img3.url !== '' && images.push(publication.img3.url)
  publication.img4.url !== '' && images.push(publication.img4.url)
  publication.img5.url !== '' && images.push(publication.img5.url)
  publication.img6.url !== '' && images.push(publication.img6.url)
  publication.img7.url !== '' && images.push(publication.img7.url)

  return (
    <Layout>
      <div className='relative flex flex-col w-[100vw] items-center justify-center md:h-[90vh]'>
        <section className='relative w-full h-full bg-white md:flex'>
          <div className='md:w-[40vw]'>

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
              userProvider={userProvider}
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
          </div>
          <div className='w-full overflow-y-scroll md:px-10'>
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
            <article className='relative px-5 pb-5'>
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
          </div>
          <PromotionMethods
            limitedAdministrator={limitedAdministrator}
            promotion={promotion}
            currentUser={publicationUser}
          />
        </section>
        {
          master && (
            <button className='fixed right-0 z-20 p-5 font-bold text-white md:bottom-10 bottom-28 bg-pennBlue' onClick={handleDelete}>Eliminar</button>
          )
        }
      </div>
      <button onClick={() => router.back()} className='fixed top-[48vh] left-5 bg-aero text-white w-14 h-14 rounded-full hidden md:flex flex-col items-center justify-center font-bold text-sm'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75' />
        </svg>
        Volver
      </button>
    </Layout>
  )
}

export default User
