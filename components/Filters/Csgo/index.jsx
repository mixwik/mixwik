import { useState } from 'react'

// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Csgo/Position'
import FormLevel from '../../Forms/Csgo/Level'
import Distance from '../../Forms/Distance'

const FilterCsgo = ({ distance, setDistance }) => {
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} />
      <FormAge />
      <FormPosition />
      <FormLevel />
      <TypeOfGamer />
    </form>
  )
}

export default FilterCsgo
