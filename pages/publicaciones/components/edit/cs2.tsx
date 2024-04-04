import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { COLLECTIONS, CS2_LEVELS, CS2_POSITIONS, CS2_PREMIER } from '../../../../domain/constants'

export const Cs2 = ({ page, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={CS2_LEVELS}
        type={page === COLLECTIONS.teams ? 'checkbox' : 'radio'}
        title='¿Cuál es tu nivel en Competitivo?'
      />
      <BoxField
        register={register}
        registerName='premier'
        errors={errors.root}
        game={CS2_PREMIER}
        type={page === COLLECTIONS.teams ? 'checkbox' : 'radio'}
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
