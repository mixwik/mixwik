import { BoxField } from '../../../../components/create-publication/components/fields/box-field'
import { COLLECTIONS, LOL_LEVELS, LOL_POSITIONS } from '../../../../domain/constants'

export const Lol = ({ page, register, errors }) => {
  return (
    <>
      <BoxField
        register={register}
        registerName='level'
        errors={errors.root}
        game={LOL_LEVELS}
        type={page === COLLECTIONS.teams ? 'checkbox' : 'radio'}
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
