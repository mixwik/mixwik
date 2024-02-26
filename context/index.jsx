import { createContext, useContext, useState } from 'react'

const filterContext = createContext()
const setFilterContext = createContext()
const openContext = createContext()
const handleOpenContext = createContext()
const logInOpenContext = createContext()
const openGameContext = createContext()
const playerCreateContext = createContext()

export const useFilterContext = () => useContext(filterContext)
export const useSetFilterContext = () => useContext(setFilterContext)
export const useOpenContext = () => useContext(openContext)
export const useHandleOpenContext = () => useContext(handleOpenContext)
export const useLogInOpenContext = () => useContext(logInOpenContext)
export const useOpenGameContext = () => useContext(openGameContext)
export const usePlayerCreateContext = () => useContext(playerCreateContext)

const DataProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState('')
  const [logInOpen, setLogInOpen] = useState(false)
  const [playerCreate, setPlayerCreate] = useState(false)
  const [openGame, setOpenGame] = useState('')
  const [filter, setFilter] = useState({
    age: {
      min: 16,
      max: 90
    },
    typeOfGamer: [],
    position: [],
    level: [],
    premier: [],
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
    } else if (e.name === 'premier') {
      if (filter.premier.includes(e.value)) {
        const newState = filter.premier.filter(item => item !== e.value)
        setFilter({ ...filter, premier: newState })
      } else {
        setFilter({ ...filter, premier: filter.premier.concat(e.value) })
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
  const handleOpenGame = (name) => {
    if (name === openGame) setIsOpen('')
    else setOpenGame(name)
  }

  return (
    <playerCreateContext.Provider value={{ playerCreate, setPlayerCreate }}>
      <openGameContext.Provider value={{ openGame, handleOpenGame }}>
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
      </openGameContext.Provider>
    </playerCreateContext.Provider>
  )
}

export default DataProvider
