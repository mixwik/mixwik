import { useEffect, useState } from 'react'

export const useLimitedAdministrator = (a, b) => {
  const [limitedAdministrator, setLimitedAdministrator] = useState(false)

  useEffect(() => {
    if (a && b && a === b) {
      setLimitedAdministrator(true)
    }
  }, [a, b])

  return limitedAdministrator
}
