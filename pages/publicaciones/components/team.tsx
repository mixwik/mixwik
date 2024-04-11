import { PUBLICATION_TYPE } from '../../../domain/constants'
import { gameServer, teamServer } from '../../../domain/types'
import { Field } from './fields/field'
import { IterableField } from './fields/iterable-field'

interface TeamProps {
    field: teamServer | gameServer
    type: string | string[] | undefined
    }

export const Team = ({ field, type }: TeamProps) => {
  if (type !== PUBLICATION_TYPE.team) return null
  return (
    <div className='flex flex-col gap-10'>
      <IterableField
        field={field?.position}
        title={field?.position?.length > 1 ? 'Posiciones que buscamos cubrir:' : 'Posición que buscamos cubrir:'}
      />
      {field?.level.length >= 1 && (
        <IterableField
          field={field?.level}
          title={field?.level?.length > 1 ? 'Mínimo tener los niveles:' : 'Mínimo tener el nivel:'}
        />
      )}
      {field?.premier.length >= 1 && (
        <IterableField
          field={field.premier}
          title={field.level.length > 1 ? 'Mínimo tener los niveles de premier:' : 'Mínimo tener el nivel de premier:'}
        />
      )}
      {field?.preferenceTeam.length >= 1 && (
        <IterableField
          field={field.preferenceTeam}
          title={field.preferenceTeam.length > 1 ? 'Buscamos hacer los siguientes equipos:' : 'Buscamos hacer el siguiente equipo:'}
        />
      )}
      <IterableField
        field={field.typeOfGamer}
        title='Buscamos jugadores:'
      />
      <Field
        field={field?.hours}
        title='Horas mínimas de juego:'
      />
    </div>
  )
}
