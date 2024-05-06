import { useState } from 'react'
import { useMaster } from './useMaster'

export const useDistance = () => {
  const { master } = useMaster()
  const [distance, setDistance] = useState(master ? 20000 : 700)

  return { distance, setDistance }
}
