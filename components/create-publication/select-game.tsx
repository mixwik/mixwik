import Image from 'next/image'
import toast from 'react-hot-toast'
import { useOpenGameContext } from '../../context'
import { GAMES } from '../../domain/constants'
import { UserServer } from '../../domain/types'

interface SelectGameProps {
    userServer?: UserServer
    isMixWikTeams?: boolean
}

export const SelectGame = ({ userServer, isMixWikTeams }: SelectGameProps) => {
  const { handleOpenGame } = useOpenGameContext()
  const checkPublications = async (collection: string) => {
    if (!userServer) {
      handleOpenGame(collection)
      return
    }
    const res = await fetch('/api/check-publication', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        uid: userServer.uid,
        collections: collection,
        isMixWikTeams
      })
    })
    const publications = await res.json()
    if (publications.message === '') handleOpenGame(collection)
    else toast.error(publications.message)
  }
  return (
    <ul
      className='flex flex-wrap justify-center w-full gap-5 md:gap-10 md:w-4/5'
    >
      {GAMES.map(game => (
        <li
          key={game.collection}
          onClick={() => {
            checkPublications(game.collection)
          }}
          className='flex flex-col items-center justify-between w-32 h-32 p-2 py-8 text-xs text-white transition duration-500 ease-in-out transform rounded-lg shadow-xl cursor-pointer bg-pennBlue md:w-36 md:h-36 hover:-translate-y hover:scale-105'
        >
          <Image className='object-cover w-10 h-10' src={game.logo} alt={game.name} />
          <h4 className='text-center'>
            {game.name}
            <br />
            {game.comingSoon && <span>(Proximamente)</span>}
          </h4>
        </li>
      ))}
    </ul>
  )
}
