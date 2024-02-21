import React, { useEffect, useState } from 'react'
import { useGetData } from '../../../../firebase/hooks/getMethod/useGetData'
import { updateBugsSolution } from '../../../../firebase/hooks/updateMethod/updateUserData'
import styles from './BugsReports.module.scss'

const BugsReports = () => {
  const bugs = useGetData('bugs')
  const [filter, setFilter] = useState(bugs)
  const [active, setActive] = useState('all')

  const handleSolution = (id) => {
    updateBugsSolution(id, true)
  }

  const handleUnresolved = (id) => {
    updateBugsSolution(id, false)
  }

  const filterBugs = (bugs, filter) => {
    if (filter === 'all') {
      setActive('all')
      setFilter(bugs)
    }
    if (filter === 'solved') {
      setActive('solved')
      setFilter(bugs.filter(bug => bug.resolved === true))
    }
    if (filter === 'unsolved') {
      setActive('unsolved')
      setFilter(bugs.filter(bug => bug.resolved === false))
    }
    return filter
  }

  useEffect(() => {
    filterBugs(bugs, 'all')
  }, [bugs])

  return (
    <section className={styles.bugsReports}>
      <h1>Reporte de bugs</h1>
      <nav className={styles.filterButtons}>
        <button data-active={active === 'all'} onClick={() => filterBugs(bugs, 'all')}>Todos</button>
        <button data-active={active === 'solved'} onClick={() => filterBugs(bugs, 'solved')}>Solucionados</button>
        <button data-active={active === 'unsolved'} onClick={() => filterBugs(bugs, 'unsolved')}>Sin solucionar</button>
      </nav>
      <div className={styles.box}>
        {filter.map(bug => (
          <div className={styles.report} data-resolved={bug.resolved} key={bug.id}>
            <p>{bug.name}</p>
            <p>{bug.email}</p>
            <p>{bug.message}</p>
            {
              bug.resolved ? <button type='button' onClick={() => handleUnresolved(bug.id)}>Sin solucionar</button> : <button type='button' onClick={() => handleSolution(bug.id)}>Solucionado</button>
            }
          </div>
        ))}
      </div>
    </section>
  )
}

export default BugsReports
