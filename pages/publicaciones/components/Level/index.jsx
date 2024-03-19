import { useEffect, useState } from 'react'
import { COLLECTIONS } from '../../../../domain/constants'
import { EditIcon } from '../../../../icons/edit'
import EditCs2 from './EditLevel/cs2'
import EditLol from './EditLevel/lol'
import EditValorant from './EditLevel/valorant'
import styles from './Level.module.scss'

const Level = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState()
  const [level, setLevel] = useState()

  useEffect(() => {
    if (typeof publication.level === 'string') {
      setLevel([publication.level])
    } else {
      setLevel(publication.level)
    }
  }, [publication.level])

  if (page === COLLECTIONS.fortnite || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.fortnite)) return null

  return (
    <article className={styles.level}>
      {
        edit === 'level'
          ? (
            <>
              {(page === COLLECTIONS.cs2 || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.cs2)) && <EditCs2 category={page} id={id} level={publication.level} setEdit={setEdit} />}
              {(page === COLLECTIONS.lol || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.lol)) && <EditLol category={page} id={id} level={publication.level} setEdit={setEdit} />}
              {(page === COLLECTIONS.valorant || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.valorant)) && <EditValorant category={page} id={id} level={publication.level} setEdit={setEdit} />}
            </>
            )
          : (
            <>
              <h2>
                Nivel:
                {limitedAdministrator && <button onClick={() => setEdit('level')}><EditIcon /></button>}
              </h2>
              <ul>
                {level?.map((level, index) => (
                  <li key={index}>{level}</li>
                ))}
              </ul>
            </>
            )
      }
    </article>
  )
}

export default Level
