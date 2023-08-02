import { useState } from 'react'
import { EditIcon } from '../../../../components/Svg'
import styles from './Description.module.scss'
import EditDescription from './EditDescription'

const Description = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState()
  return (
    <div className={styles.description}>
      {
            edit === 'description'
              ? (
                <EditDescription
                  category={page}
                  id={id}
                  setEdit={setEdit}
                  description={publication.description}
                />
                )
              : (
                <p>{publication.description}
                  {limitedAdministrator &&
                    <button onClick={() => setEdit('description')}>
                      <EditIcon />
                    </button>}
                </p>
                )
          }
    </div>
  )
}

export default Description
