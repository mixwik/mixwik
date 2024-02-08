import { useMaster } from '../../hooks/useMaster'
import NoAllowed from './components/NoAllowed'

export default function Administration () {
  const { master } = useMaster()

  if (!master) return <NoAllowed />

  return (
    <div>
      <h1>Administration</h1>
    </div>
  )
}
