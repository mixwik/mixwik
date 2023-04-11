import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Card from '../../components/Card'
import CityMap from '../../components/CityMap'
import Layout from '../../components/Layout'
import { useGetData } from '../../firebase/hooks/getMethod/useGetData'
import { useCityFilterDistance } from '../../hooks/useCityFilterDistance'
import styles from './Poblacion.module.scss'

const City = () => {
  const [city, setCity] = useState()
  const router = useRouter()
  const { name } = router.query
  const csgo = useGetData('csgo')
  const teams = useGetData('teams')
  const users = useGetData('users')
  const csgoFiltered = useCityFilterDistance(city, csgo, 100)
  const teamsFiltered = useCityFilterDistance(city, teams, 100)
  const url = `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(name)}&format=json&limit=1`

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url)
        const data = await response.json()

        if (data && data.length > 0) {
          const latitud = parseFloat(data[0].lat)
          const longitud = parseFloat(data[0].lon)
          setCity([latitud, longitud])
        } else {
          throw new Error('Ciudad no encontrada')
        }
      } catch (error) {
        console.error(`Error al obtener coordenadas: ${error.message}`)
        return null
      }
    })()
  }, [url])

  if (!city) return <div>Loading...</div>

  return (
    <Layout>
      <div className={styles.city}>
        <section className={styles.cardBox}>
          <h1 className={styles.title}>{name}</h1>
          {
            teamsFiltered.length > 0 && (
              teamsFiltered.map((res) => (
                <Card key={res.id} user={users} csgo={res} equip link='csgo' />
              ))
            )
          }
          {
            csgoFiltered.length > 0 && (
              csgoFiltered.map((res) => (
                <Card key={res.id} user={users} csgo={res} link='csgo' />
              ))
            )
          }
          {
            csgoFiltered.length > 0 && (
              csgoFiltered.map((res) => (
                <Card key={res.id} user={users} csgo={res} teams link='csgo' />
              ))
            )
          }
        </section>
        <CityMap city={city} publication={csgoFiltered} users={users} />
      </div>
    </Layout>
  )
}

export default City
