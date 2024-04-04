import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { COLLECTIONS, VALORANT_LEVELS, VALORANT_POSITION } from '../../../../domain/constants'

export const Valorant = ({ page, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={VALORANT_LEVELS}
        type={page === COLLECTIONS.teams ? 'checkbox' : 'radio'}
        title='¿Cuál es tu nivel en Competitivo?'
      />
      <BoxField
        register={register}
        registerName='position'
        errors={errors.root}
        game={VALORANT_POSITION}
        type='checkbox'
        title='¿En qué posiciones juegas?'
      />
    </>
  )
}
