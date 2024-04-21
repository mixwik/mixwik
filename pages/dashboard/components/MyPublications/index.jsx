import Link from 'next/link'
import { PUBLICATION_TYPE } from '../../../../domain/constants'
import { useGetAllPublicationsOneUser } from '../../../../hooks/use-get-all-publications-one-user'
import CardPublications from '../CardPublications'
import { WindowLayout } from '../window-layout'

const MyPublications = ({ user, page }) => {
  const { publications } = useGetAllPublicationsOneUser(user.uid)
  if (page !== 'myPublications') return null
  return (
    <WindowLayout title='Mis Publicaciones'>
      {
      publications.length > 0
        ? (
          <div className='flex flex-wrap justify-between h-full gap-5 p-10'>
            {
              publications?.map((publication) => (
                publication.type === PUBLICATION_TYPE.team &&
                  (
                    <CardPublications
                      key={publication.id}
                      publication={publication}
                      user={user}
                      remove
                    />
                  )
              ))
            }
            {
              publications?.map((publication) => (
                publication.type === PUBLICATION_TYPE.player &&
                  (
                    <CardPublications
                      key={publication.id}
                      publication={publication}
                      user={user}
                      remove
                    />
                  )
              ))
            }
          </div>
          )
        : (
          <div className='flex flex-col items-center justify-center w-full h-full gap-5 text-center'>
            <h2 className='text-2xl font-bold text-gray-400'>No tienes publicaciones en este momento</h2>
            <Link className='text-2xl font-bold text-aero' href='/dashboard?page=jugador'>
              Crea un jugador
            </Link>
            <Link className='text-2xl font-bold text-aero' href='/dashboard?page=teams'>
              Crea un team
            </Link>
          </div>
          )
    }
    </WindowLayout>
  )
}

export default MyPublications
