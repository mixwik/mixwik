import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { UserProvider } from '../../../../domain/types'
import { useSignOut } from '../../../../firebase/auth/SignOut'

export const Step1 = (
  { accept, setAccept, userProvider, setSteps }:
  { accept: boolean, setAccept: React.Dispatch<React.SetStateAction<boolean>>, userProvider: UserProvider, setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const handleSignOut = useSignOut()
  const createUser = async () => {
    if (!userProvider) return
    localStorage.setItem('step', 'step-2')
    localStorage.setItem('email', userProvider?.email)
    setSteps('step-2')
  }
  const handlePosition = () => {
    if ('geolocation' in navigator) {
      const onUbicacionConcedida = (ubicacion: any) => {
        const position: number[] = []
        position.push(ubicacion.coords.latitude, ubicacion.coords.longitude)
        localStorage.setItem('geometry', JSON.stringify(position))
      }
      const onErrorDeUbicacion = () => {
        localStorage.setItem('geometry', JSON.stringify([40.414971037098056, -3.7072115929025924]))
      }
      const opcionesDeSolicitud = {
        enableHighAccuracy: true, // Alta precisión
        maximumAge: 0, // No queremos caché
        timeout: 5000 // Esperar solo 5 segundos
      }
      navigator.geolocation.getCurrentPosition(onUbicacionConcedida, onErrorDeUbicacion, opcionesDeSolicitud)
    } else {
      return alert('Tu navegador no soporta el acceso a la ubicación. Intenta con otro')
    }
  }
  return (
    <div className='flex flex-col justify-around w-full h-full p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h1 className='flex flex-col items-center justify-center gap-3 text-4xl font-bold'>Bienvenido a <span className='sr-only'>MixWik</span> <Image className='w-auto h-12' alt='Logo de Mixwik' src='/logos/mixwik-logo.png' width={100} height={50} /></h1>
      <ol className='flex flex-col gap-3 border-gray-200 md:m-5 border-s'>
        <li>
          <p className='font-normal text-gray-500 text-pretty'>Estamos muy felices de tenerte en nuestra comunidad, en MixWik podrás encontrar jugadores cerca de tí y formar equipo para lograr la victoria 🏆</p>
        </li>
        <li>
          <p className='font-normal text-gray-500 text-pretty'>Además podrás publicar anuncios para encontrar jugadores para tú equipo o para unirte a otros equipos que busquen jugadores como tú.</p>
        </li>
        <li className='flex flex-col items-center gap-3'>
          <p className='font-normal text-gray-500 text-pretty '>Pero antes de poder comenzar en MixWik necesitamos que nos des permisos para obtener tu localización, esta se usa para mostrarte jugadores cercanos y que podáis contactar</p>
          <button onClick={handlePosition} className='px-5 py-2 text-white rounded-lg bg-aero'>Permitir localización</button>
        </li>
      </ol>
      <label htmlFor='accept' className='flex justify-center gap-3'>
        <input
          onChange={() => setAccept(prev => !prev)}
          id='accept'
          type='checkbox'
          name='accept'
        />
        <span className='gap-1 md:flex'>
          Aceptos las condiciones de uso y la<Link className='font-bold text-aero' target='_blank' href='/legal/politica-de-privacidad'> política de privacidad</Link>
        </span>
      </label>
      <div className='flex justify-center w-full gap-5'>
        <button onClick={() => handleSignOut()}>No continuar</button>
        <button
          disabled={!accept}
          onClick={createUser}
          className='px-5 py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
        >Comenzar
        </button>
      </div>
    </div>
  )
}
