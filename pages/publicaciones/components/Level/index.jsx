import { useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import EditCs2 from './EditLevel/cs2'
import EditLol from './EditLevel/lol'
import EditValorant from './EditLevel/valorant'
import styles from './Level.module.scss'

const Level = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState()
  if (page === 'fortnite') return null

  return (
    <article className={styles.level}>
      {
        edit === 'level'
          ? (
            <>
              {page === 'cs2' && <EditCs2 category={page} id={id} level={publication.level} setEdit={setEdit} />}
              {page === 'lol' && <EditLol category={page} id={id} level={publication.level} setEdit={setEdit} />}
              {page === 'valorant' && <EditValorant category={page} id={id} level={publication.level} setEdit={setEdit} />}
            </>
            )
          : (
            <>
              <h2>
                Nivel:
                {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('level')}><EditIcon /></button>}
              </h2>
              <div className={styles.levelBox}>
                {publication.level}
              </div>
            </>
            )
      }
    </article>
  )
}

export default Level
