import { useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import EditPreferenceTeam from './EditPreferenceTeam'
import styles from './PreferenceTeam.module.scss'

const PreferenceTeam = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)
  if (page !== 'fortnite') return null

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
                <div className={styles.levelBox}>
                  {publication.preferenceTeam}
                </div>
              </>
              )
        }
    </article>
  )
}

export default PreferenceTeam
