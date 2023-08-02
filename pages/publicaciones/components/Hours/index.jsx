import { useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import EditHours from './EditHours'
import styles from './Hours.module.scss'

const Hours = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)
  return (
    <article className={styles.hours}>
      {
              edit === 'hours'
                ? (
                  <EditHours category={page} id={id} hours={publication.hours} setEdit={setEdit} />
                  )
                : (
                  <>
                    <h2>
                      Horas Jugadas:
                      {limitedAdministrator && <button className={styles.editButtonImages} onClick={() => setEdit('hours')}><EditIcon /></button>}
                    </h2>
                    {publication.hours}h
                  </>
                  )
            }
    </article>
  )
}

export default Hours
