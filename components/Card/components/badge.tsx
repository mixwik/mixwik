import { PUBLICATION_TYPE } from '../../../domain/constants'

interface BadgeProps {
    type?: string
    promotion?: boolean
    }

export const Badge = ({ type, promotion }: BadgeProps) => {
  return (
    <div className={`absolute w-full text-center z-10 p-1 font-bold text-white bottom-0 ${type === PUBLICATION_TYPE.team && 'bg-orange'} ${type === PUBLICATION_TYPE.player && 'bg-aero'} ${promotion && 'bg-indigo-800'}`}>
      {type === PUBLICATION_TYPE.player && <span>Jugador</span>}
      {type === PUBLICATION_TYPE.team && <span>Equipo</span>}
    </div>
  )
}
