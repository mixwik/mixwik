import Link from 'next/link'
import { useState } from 'react'
import { PUBLICATION_TYPE } from '../../domain/constants'
import { useMixWikTeamsCheckSubscriptionFunction } from '../../hooks/useChecksStripe'
import { Spinner } from '../../icons/spinner'
import { BackgroundDots } from '../background-dots'
import Card from './components/card'

export const Cards = ({ publications, users, isVoid }) => {
  const checkSubscription = useMixWikTeamsCheckSubscriptionFunction()
  const [loading, setLoading] = useState(true)
  const [promo, setPromo] = useState(false)
  setTimeout(() => {
    setLoading(false)
  }, 3000)
  return (
    <>
      {loading
        ? (
          <div className='flex items-center justify-center size-full'>
            <BackgroundDots />
            <span className='flex flex-col items-center justify-center gap-5 text-xl font-bold text-gray-500'>
              <Spinner />
              Cargando jugadores y equipos...
            </span>
          </div>)
        : (
          <>
            <div className='grid grid-cols-2 md:grid-cols-4 justify-items-center gap-y-10'>
              {publications.map((res) => {
                const promotion = checkSubscription(res.promotion, res.category, res.id)
                promotion.then((res) => setPromo(res))
                return (
                  (res.promotion && promo) && (
                    <Card
                      key={res.id}
                      userServer={users}
                      publication={res}
                      promotion={promo}
                    />
                  )
                )
              })}
              {publications.map((res) => (
                res.type === PUBLICATION_TYPE.team && (
                  <Card
                    key={res.id}
                    userServer={users}
                    publication={res}
                  />
                )
              ))}
              {publications.map((res) => (
                res.type === PUBLICATION_TYPE.player && (
                  <Card
                    key={res.id}
                    userServer={users}
                    publication={res}
                  />
                )
              ))}
            </div>
            <div className='flex items-center justify-center size-full'>
              {publications.length < 1 && (
                <div className='flex flex-col items-center justify-center w-full h-full col-span-2 gap-5 text-center md:col-span-4'>
                  <h2 className='text-2xl font-bold text-gray-400'>
                    {isVoid}
                  </h2>
                  <Link className='font-bold text-blue-500' href='/'>
                    Volver a la página principal
                  </Link>
                </div>
              )}
            </div>
          </>
          )}
    </>
  )
}
