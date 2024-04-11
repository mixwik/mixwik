import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { LOL_LEVELS, LOL_POSITIONS, PUBLICATION_TYPE } from '../../../../domain/constants'

export const Lol = ({ type, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={LOL_LEVELS}
        type={type === PUBLICATION_TYPE.team ? 'checkbox' : 'radio'}
        title='¿Cuál es tu nivel en Competitivo?'
      />
      <BoxField
        register={register}
        registerName='position'
        errors={errors.root}
        game={LOL_POSITIONS}
        type='checkbox'
        title='¿En qué posiciones juegas?'
      />
    </>
  )
}
