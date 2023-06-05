import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import FilterCityGames from '../../components/Filters/CityGames'
import Layout from '../../components/Layout'
import Map from '../../components/Map'
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useGetTeams } from '../../firebase/hooks/getMethod/useGetTeams'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import styles from '../../styles/Pages.module.scss'

const City = () => {
  const [city, setCity] = useState({ geometry: [] })
  const [allGames, setAllGames] = useState([])
  const [allTeams, setAllTeams] = useState([])
  const router = useRouter()
  const { name } = router.query
  const users = useGetData('users')
  const csgo = useGetData('csgo')
  const lol = useGetData('lol')
  const teamsCsgo = useGetTeams('teams', 'csgo')
  const teamsLol = useGetTeams('teams', 'lol')
  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(name)}&format=json&limit=1`

  useEffect(() => {
    const allGamesArray = [...csgo, ...lol]
    const allTeamsArray = [...teamsCsgo, ...teamsLol]
    setAllGames(allGamesArray)
    setAllTeams(allTeamsArray);
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.length > 0) {
          const latitud = parseFloat(data[0].lat)
          const longitud = parseFloat(data[0].lon)
          setCity({ geometry: [latitud, longitud] })
        } else {
          throw new Error('Ciudad no encontrada')
        }
      } catch (error) {
        console.error(`Error al obtener coordenadas: ${error.message}`)
        return null
      }
    })()
  }, [url, csgo, lol, teamsCsgo, teamsLol])

  const gamesFiltered = useCityFilterDistance(city, allGames, 30)
  const teamsFiltered = useCityFilterDistance(city, allTeams, 30)

  if (!city) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.pageBox}>
        <section className={styles.pages}>
          <FilterCityGames />
          <h1 className={styles.titleAllGames}>
            Todos los jugadores en {name}
          </h1>
          <div className={styles.gamersBox}>
            {
              teamsFiltered.length > 0 && (
                teamsFiltered.map((res) => (
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
              gamesFiltered.length > 0 && (
                gamesFiltered.map(res => (
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
          </div>
        </section>
        <Map
          location={city.geometry}
          users={users}
          currentPosition={city.geometry}
          db={gamesFiltered}
          zoom={14}
          size={30}
          category={allGames}
        />
      </div>
    </Layout>
  )
}

export default City
