import { useState } from 'react'
// Styles
import styles from '../Filters.module.scss'

// Components
import FormAge from '../../Forms/Age'
import TypeOfGamer from '../../Forms/TypeOfGamer'
import FormPosition from '../../Forms/Fortnite/Positon'
import FormPreferenceTeam from '../../Forms/Fortnite/PreferenceTeam'
import Distance from '../../Forms/Distance'

const FilterFortnite = ({ distance, setDistance }) => {
  const [isOpen, setIsOpen] = useState('')
  const handleOpen = (name) => {
    if (name === isOpen) setIsOpen('')
    else setIsOpen(name)
  }
  return (
    <form className={styles.filter}>
      <Distance distance={distance} setDistance={setDistance} isOpen={isOpen} handleOpen={handleOpen} />
      <FormPosition isOpen={isOpen} handleOpen={handleOpen} />
      <FormPreferenceTeam isOpen={isOpen} handleOpen={handleOpen} />
      <FormAge isOpen={isOpen} handleOpen={handleOpen} />
      <TypeOfGamer isOpen={isOpen} handleOpen={handleOpen} />
    </form>
  )
}

export default FilterFortnite
