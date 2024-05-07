import { gameServer, teamServer } from '../../../../domain/types'

interface PillProps {
    title: string
    number: (gameServer | teamServer)[]
    className?: string
}

export const Pill = ({ title, number, className }: PillProps) => {
  return (
    <div className={`flex flex-col text-center items-center p-5 border border-gray-200 border-solid rounded-md shadow-lg ${className}`}>
      <h2>{title}</h2>
      <span className='text-xl font-bold'>
        {number.length}
      </span>
    </div>
  )
}
