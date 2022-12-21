import { useState, createContext, useContext } from 'react'

const filterContext = createContext()

export const useFilterContext = () => useContext(filterContext)

const dataProvider = ({ children }) => {
  const [filter, setFilter] = useState()

  return (
    <filterContext.Provider value={[filter, setFilter]}>
      {children}
    </filterContext.Provider>
  )
}

export default dataProvider
