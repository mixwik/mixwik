import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { CS2_LEVELS, CS2_POSITIONS, CS2_PREMIER, PUBLICATION_TYPE } from '../../../../domain/constants'

export const Cs2 = ({ type, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={CS2_LEVELS}
        type={type === PUBLICATION_TYPE.team ? 'checkbox' : 'radio'}
        title='¿Cuál es tu nivel en Competitivo?'
      />
      <BoxField
        register={register}
        registerName='premier'
        errors={errors.root}
        game={CS2_PREMIER}
        type={type === PUBLICATION_TYPE.team ? 'checkbox' : 'radio'}
        title='¿Cuál es tu nivel en Premier?'
      />

      <BoxField
        register={register}
        registerName='position'
        errors={errors.root}
        game={CS2_POSITIONS}
        type='checkbox'
        title='¿En qué posiciones juegas?'
      />
    </>
  )
}
