import { useState } from 'react'
import { EditIcon } from '../../../../icons/edit'
import EditTypeOfGamer from './EditTypeOfGamer'
import styles from './TypeOfGamer.module.scss'

const TypeOfGamer = ({ id, page, publication, limitedAdministrator }) => {
  const [edit, setEdit] = useState()
  return (
    <article className={styles.typeOfGamer}>
      {
            edit === 'typeOfGamer'
              ? (
                <EditTypeOfGamer category={page} id={id} typeOfGamer={publication.typeOfGamer} setEdit={setEdit} />
                )
              : (
                <>
                  <h2>Tipo de jugador:
                    {
                    limitedAdministrator &&
                      <button onClick={() => setEdit('typeOfGamer')}>
                        <EditIcon />
                      </button>
                    }
                  </h2>
                  <ul>
                    {
                      publication.typeOfGamer.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))
                    }
                  </ul>
                </>
                )
          }
    </article>
  )
}

export default TypeOfGamer
