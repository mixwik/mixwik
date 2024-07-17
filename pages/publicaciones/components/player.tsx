import { PUBLICATION_TYPE } from '../../../domain/constants'
import { gameServer, teamServer } from '../../../domain/types'
import { Field } from './fields/field'
import { IterableField } from './fields/iterable-field'

interface PlayerProps {
    field: gameServer | teamServer
    type: string | string[] | undefined
    }

export const Player = ({ field, type }: PlayerProps) => {
  if (type === PUBLICATION_TYPE.team) return null
  return (
    <div className='flex flex-col gap-10'>
      <IterableField
        field={field?.position}
        title={field?.position?.length > 1 ? 'Suelo jugar en las posiciones:' : 'Solo juego en la posición:'}
      />
      {field.level && (
        <Field
          field={field?.level}
          title='Mi nivel es:'
        />
      )}
      {field?.premier.length >= 1 && (
        <Field
          field={field.premier}
          title='Mi nivel de premier es:'
        />
      )}
      {field?.preferenceTeam.length >= 1 && (
        <IterableField
          field={field.preferenceTeam}
          title={field.preferenceTeam.length > 1 ? 'Suelo jugar en equipos:' : 'Solo juego en:'}
        />
      )}
      <IterableField
        field={field.typeOfGamer}
        title='Soy jugador:'
      />
      <Field
        field={field?.hours}
        title='Mis horas de juego son:'
      />
    </div>
  )
}
