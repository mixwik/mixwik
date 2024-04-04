import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { FORTNITE_POSITIONS, FORTNITE_PREFERENCE_TEAM } from '../../../../domain/constants'

export const Fortnite = ({ register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='preferenceTeam'
        errors={errors.root}
        game={FORTNITE_PREFERENCE_TEAM}
        type='checkbox'
        title='¿Como prefieres jugar?'
      />
      <BoxField
        register={register}
        registerName='position'
        errors={errors.root}
        game={FORTNITE_POSITIONS}
        type='checkbox'
        title='¿En qué posiciones juegas?'
      />
    </>
  )
}
