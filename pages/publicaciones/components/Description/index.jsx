import { useState } from 'react'
import styles from './Description.module.scss'
import EditDescription from './EditDescription'
import { EditIcon } from '../../../../icons/edit'

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
