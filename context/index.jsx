import { createContext, useContext, useState } from 'react'

const filterContext = createContext()
const setFilterContext = createContext()
const openContext = createContext()
const handleOpenContext = createContext()
const logInOpenContext = createContext()

export const useFilterContext = () => useContext(filterContext)
export const useSetFilterContext = () => useContext(setFilterContext)
export const useOpenContext = () => useContext(openContext)
export const useHandleOpenContext = () => useContext(handleOpenContext)
export const useLogInOpenContext = () => useContext(logInOpenContext)

const DataProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState('')
  const [logInOpen, setLogInOpen] = useState(false)
  const [filter, setFilter] = useState({
    age: {
      min: 16,
      max: 90
    },
    typeOfGamer: [],
    position: [],
    level: [],
    preferenceTeam: []
  })

  const handleSetFilter = (e) => {
    if (e.name === 'min') {
      setFilter({ ...filter, age: { min: e.value, max: filter.age.max } })
    } else if (e.name === 'max') {
      setFilter({ ...filter, age: { min: filter.age.min, max: e.value } })
    } else if (e.name === 'typeOfGamer') {
      if (filter.typeOfGamer.includes(e.value)) {
        const newState = filter.typeOfGamer.filter(item => item !== e.value)
        setFilter({ ...filter, typeOfGamer: newState })
      } else {
        setFilter({ ...filter, typeOfGamer: filter.typeOfGamer.concat(e.value) })
      }
    } else if (e.name === 'position') {
      if (filter.position.includes(e.value)) {
        const newState = filter.position.filter(item => item !== e.value)
        setFilter({ ...filter, position: newState })
      } else {
        setFilter({ ...filter, position: filter.position.concat(e.value) })
      }
    } else if (e.name === 'level') {
      if (filter.level.includes(e.value)) {
        const newState = filter.level.filter(item => item !== e.value)
        setFilter({ ...filter, level: newState })
      } else {
        setFilter({ ...filter, level: filter.level.concat(e.value) })
      }
    } else if (e.name === 'preferenceTeam') {
      if (filter.preferenceTeam.includes(e.value)) {
        const newState = filter.preferenceTeam.filter(item => item !== e.value)
        setFilter({ ...filter, preferenceTeam: newState })
      } else {
        setFilter({ ...filter, preferenceTeam: filter.preferenceTeam.concat(e.value) })
      }
    }
  }

  const handleOpen = (name) => {
    if (name === isOpen) setIsOpen('')
    else setIsOpen(name)
  }

  return (
    <logInOpenContext.Provider value={{ logInOpen, setLogInOpen }}>
      <filterContext.Provider value={filter}>
        <setFilterContext.Provider value={handleSetFilter}>
          <openContext.Provider value={isOpen}>
            <handleOpenContext.Provider value={handleOpen}>
              {children}
            </handleOpenContext.Provider>
          </openContext.Provider>
        </setFilterContext.Provider>
      </filterContext.Provider>
    </logInOpenContext.Provider>
  )
}

export default DataProvider
