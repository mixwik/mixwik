interface BadgeProps {
    className: string
    jugador?: boolean
    team?: boolean
    promotion?: boolean
    }

export const Badge = ({ className, jugador, team, promotion }: BadgeProps) => {
  return (
    <div className={`absolute w-full text-center z-10 p-1 font-bold text-white bottom-0 ${className}`}>
      {jugador && <span>Jugador</span>}
      {team && <span>Equipo</span>}
      {promotion && <span>Promocionado</span>}
    </div>
  )
}
