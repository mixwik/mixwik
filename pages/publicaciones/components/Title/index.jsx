import { useState } from 'react'

import EditTitle from './EditTitle'
import styles from './Title.module.scss'
import { EditIcon } from '../../../../icons/edit'

const Title = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState(false)
  return (
    <div className={styles.publicationTitle}>
      {
        edit === 'title'
          ? (
            <EditTitle
              category={page}
              id={id}
              title={publication.title}
              setEdit={setEdit}
            />
            )
          : (
            <h1>
              {publication.title}
              {limitedAdministrator &&
                <button onClick={() => setEdit('title')}>
                  <EditIcon />
                </button>}
            </h1>
            )
        }
    </div>
  )
}

export default Title
