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
  const [isOpen, setIsOpen] = useState('')
  const handleOpen = (name) => {
    if (name === isOpen) setIsOpen('')
    else setIsOpen(name)
  }
  return (
    <form className={styles.filter}>
      <Distance isOpen={isOpen} handleOpen={handleOpen} distance={distance} setDistance={setDistance} />
      <FormAge isOpen={isOpen} handleOpen={handleOpen} />
      <FormPosition isOpen={isOpen} handleOpen={handleOpen} />
      <FormLevel isOpen={isOpen} handleOpen={handleOpen} />
      <TypeOfGamer isOpen={isOpen} handleOpen={handleOpen} />
    </form>
  )
}

export default FilterCsgo
