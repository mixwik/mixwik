import { useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import { COLLECTIONS } from '../../../../domain/constants'
import EditCs2Position from './EditPosition/EditCs2Position'
import EditFortnitePosition from './EditPosition/EditFortnitePosition'
import EditLolPosition from './EditPosition/EditLolPosition'
import EditValorantPosition from './EditPosition/EditValorantPosition'
import styles from './Position.module.scss'

const Position = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)
  return (
    <article className={styles.position}>
      {
              edit === 'position'
                ? (
                  <>
                    {(page === COLLECTIONS.cs2 || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.cs2)) && <EditCs2Position category={page} id={id} position={publication.position} setEdit={setEdit} />}
                    {(page === COLLECTIONS.fortnite || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.fortnite)) && <EditFortnitePosition category={page} id={id} position={publication.position} setEdit={setEdit} />}
                    {(page === COLLECTIONS.lol || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.lol)) && <EditLolPosition category={page} id={id} position={publication.position} setEdit={setEdit} />}
                    {(page === COLLECTIONS.valorant || (page === COLLECTIONS.teams && publication.category === COLLECTIONS.valorant)) && <EditValorantPosition category={page} id={id} position={publication.position} setEdit={setEdit} />}
                  </>
                  )
                : (
                  <>
                    <h2>
                      {publication.position.length === 1 ? 'Posición:' : 'Posiciones:'}
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('position')}><EditIcon /></button>}
                    </h2>
                    <ul>
                      {
                        publication.position.map((pos, index) => (
                          <li key={index}>{pos}</li>
                        ))
                      }
                    </ul>
                  </>
                  )
            }
    </article>
  )
}

export default Position
