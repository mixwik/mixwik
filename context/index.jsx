import { useState, createContext, useContext } from 'react'

const filterContext = createContext()
const setFilterContext = createContext()

export const useFilterContext = () => useContext(filterContext)
export const useSetFilterContext = () => useContext(setFilterContext)

const DataProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    age: {
      min: 18,
      max: 90
    },
    typeOfGamer: [],
    position: [],
    level: '',
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
      if (filter.level === e.value) {
        setFilter({ ...filter, level: '' })
      } else {
        setFilter({ ...filter, level: e.value })
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

  return (
    <filterContext.Provider value={filter}>
      <setFilterContext.Provider value={handleSetFilter}>
        {children}
      </setFilterContext.Provider>
    </filterContext.Provider>
  )
}

export default DataProvider
