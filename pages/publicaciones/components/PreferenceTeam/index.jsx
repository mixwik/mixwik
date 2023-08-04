import { useEffect, useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import { COLLECTIONS } from '../../../../domain/constants'
import EditPreferenceTeam from './EditPreferenceTeam'
import styles from './PreferenceTeam.module.scss'

const PreferenceTeam = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)
  const [preferenceTeam, setPreferenceTeam] = useState()

  useEffect(() => {
    if (typeof publication.preferenceTeam === 'string') {
      setPreferenceTeam([publication.preferenceTeam])
    } else {
      setPreferenceTeam(publication.preferenceTeam)
    }
  }, [publication.preferenceTeam])

  if ((page === COLLECTIONS.teams && publication.category !== COLLECTIONS.fortnite) || page !== COLLECTIONS.fortnite) return null
  return (
    <article className={styles.preferenceTeam}>
      {
          edit === 'preferenceTeam'
            ? (
              <EditPreferenceTeam category={page} id={id} preferenceTeam={publication.preferenceTeam} setEdit={setEdit} />
              )
            : (
              <>
                <h2>
                  Preferencia de equipo:
                  {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('preferenceTeam')}><EditIcon /></button>}
                </h2>
                <ul className={styles.levelBox}>
                  {preferenceTeam?.map((preferenceTeam, index) => (
                    <li key={index}>{preferenceTeam}</li>
                  ))}
                </ul>
              </>
              )
        }
    </article>
  )
}

export default PreferenceTeam
