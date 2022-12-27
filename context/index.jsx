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
    typeOfGamer: '',
    position: [],
    level: '',
    preferenceTeam: ''
  })

  const handleSetFilter = (e) => {
    if (e.name === 'min') {
      setFilter({ ...filter, age: { min: e.value, max: filter.age.max } })
    } else if (e.name === 'max') {
      setFilter({ ...filter, age: { min: filter.age.min, max: e.value } })
    } else if (e.name === 'typeOfGamer') {
      if (filter.typeOfGamer === e.value) {
        setFilter({ ...filter, typeOfGamer: '' })
      } else {
        setFilter({ ...filter, typeOfGamer: e.value })
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
      if (filter.preferenceTeam === e.value) {
        setFilter({ ...filter, preferenceTeam: '' })
      } else {
        setFilter({ ...filter, preferenceTeam: e.value })
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
