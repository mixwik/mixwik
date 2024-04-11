import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { PUBLICATION_TYPE, VALORANT_LEVELS, VALORANT_POSITION } from '../../../../domain/constants'

export const Valorant = ({ type, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={VALORANT_LEVELS}
        type={type === PUBLICATION_TYPE.team ? 'checkbox' : 'radio'}
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
