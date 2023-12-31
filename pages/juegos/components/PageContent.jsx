// Hooks

// Styles
import styles from '../../../styles/Pages.module.scss'

// Components
import Card from '../../../components/Card'
import Map from '../../../components/Map'

// Customs Hooks
import { useGetData } from '../../../firebase/hooks/getMethod/useGetData'
import { useUserFortniteFilters } from '../../../hooks/useUserFortniteFilters'

// Context
import { useHandleOpenContext } from '../../../context'

import { useSession } from '../../../firebase/auth/useSession'
import { useGetTeams } from '../../../firebase/hooks/getMethod/useGetTeams'
import { useCurrentPosition } from '../../../hooks/useCurrentPosition'

const PageContent = ({ category, children, distance }) => {
  const session = useSession()
  const currentPosition = useCurrentPosition()
  const handleOpen = useHandleOpenContext()
  const users = useGetData('users')
  const csgo = useGetData(category)
  const teams = useGetTeams('teams', category)

  // filter current user of the list of users
  const user = users.find(res => res.uid === session.uid)

  // filter users list with different filters
  const listUserCsgo = useUserFortniteFilters(user, csgo, distance)
  const listUserTeams = useUserFortniteFilters(user, teams, distance)
  return (
    <div className='flex flex-col md:flex-row'>
      <section className='md:w-[50vw]'>
        {children}
        <section
          className='grid grid-cols-[repeat(auto-fit,_minmax(10rem,1fr))] place-items-center overflow-y-scroll h-[73vh] md:w-[50vw] w-screen md:overflow-y-auto py-5 gap-y-5'
          onClick={() => handleOpen('')}
        >
          {
              csgo.length > 0 && (
                csgo.map((res) => (
                  res.promotion && (
                    <Card
                      key={res.id}
                      user={users}
                      csgo={res}
                      link={res.category}
                      promotions
                    />
                  )
                ))
              )
            }
          {
              listUserTeams.length > 0 && (
                listUserTeams.map((res) => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    equips
                  />
                ))
              )
            }
          {
              listUserCsgo.length > 0 && (
                listUserCsgo.map((res) => (
                  <Card
                    key={res.id}
                    user={users}
                    csgo={res}
                    link={res.category}
                    teams
                  />
                ))
              )
            }
          {
              listUserCsgo.length > 0
                ? (
                    listUserCsgo.map((res) => (
                      <Card
                        key={res.id}
                        user={users} csgo={res}
                        link={res.category}
                        basic
                      />
                    ))
                  )
                : (
                  <div className={styles.gamersNoFound}>No hay jugadores en este momento</div>
                  )
            }
        </section>
      </section>
      <Map
        location={user}
        users={users}
        currentPosition={currentPosition}
        games={listUserCsgo}
        teams={listUserTeams}
        zoom={7}
        size={30}
      />
    </div>
  )
}

export default PageContent
