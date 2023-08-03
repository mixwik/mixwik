import { useState } from 'react'
import { COLLECTIONS } from '../../../../domain/constants'
import styles from './Age.module.scss'
import { EditIcon } from '../../../../components/Svg'
import EditAge from './EditAge'

const Age = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)

  if (page !== COLLECTIONS.teams) return null
  return (
    <article className={styles.age}>
      {
              edit === 'age'
                ? (
                  <EditAge category='teams' id={id} age={publication.age} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Edad mínima:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('age')}><EditIcon /></button>}
                    </h2>
                    {publication.age} años
                  </>
                  )
            }
    </article>
  )
}

export default Age
