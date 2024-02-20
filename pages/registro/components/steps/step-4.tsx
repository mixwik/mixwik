import React, { useEffect, useState } from 'react'
import { ArrowBack, DiscordIcon, TwitterIcon } from '../../../../components/Svg'
import { REGEX } from '../../../../domain/regex'
import { ToastError } from '../toastError'

export const Step4 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [error, setError] = useState({
    twitter: 'error',
    discord: 'error',
    send: 'error'
  })
  const [data, setData] = useState({
    twitter: '',
    discord: ''
  })

  useEffect(() => {
    const fields = ['twitter', 'discord']

    fields.forEach(field => {
      const value = localStorage.getItem(field)
      if (value) {
        setData(prevState => ({ ...prevState, [field]: value }))
        setError(prevState => ({ ...prevState, [field]: '' }))
      }
    })

    if (fields.every(field => localStorage.getItem(field))) {
      setError(prevState => ({ ...prevState, send: '' }))
    }
  }, [])

  const validateTwitter = (value) => {
    let errorMessage = ''

    setData(prevState => ({ ...prevState, twitter: value }))

    if (value.length === 0) {
      errorMessage = 'El campo no puede estar vacío'
    } else if (!REGEX.twitter.test(data.twitter)) {
      errorMessage = 'El campo twitter no es valido'
    } else {
      errorMessage = ''
    }
    return errorMessage
  }

  const validateDiscord = (value) => {
    if (value.length === 0) {
      setData(prevState => ({ ...prevState, discord: value }))
      return 'El campo no puede estar vacío'
    } else if (!REGEX.discord.test(data.discord)) {
      setData(prevState => ({ ...prevState, discord: value }))
      return 'El campo discord no es valido'
    } else {
      setData(prevState => ({ ...prevState, discord: value }))
      return ''
    }
  }

  const validators = {
    twitter: validateTwitter,
    discord: validateDiscord
  }

  const validateData = (e) => {
    const { name, value } = e.target
    const validator = validators[name]
    if (validator) {
      const errorMessage = validator(value)
      setError(prevState => ({ ...prevState, [name]: errorMessage }))
    }
    if (!error.twitter && !error.discord) {
      setError(prevState => ({ ...prevState, send: '' }))
    }
  }

  const saveData = (e) => {
    e.preventDefault()
    if (data.twitter && data.discord) {
      localStorage.setItem('step', 'step-5')
      localStorage.setItem('twitter', data.twitter)
      localStorage.setItem('discord', data.discord)
      setSteps('step-5')
    } else {
      setError(prevState => ({ ...prevState, send: 'Debes completar todos los campos' }))
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <h2 className='text-2xl font-bold text-pennBlue md:text-3xl'>Añade tus Redes sociales</h2>
      <form
        onChange={(e) => validateData(e)}
        onSubmit={(e) => saveData(e)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <label className='relative flex items-center w-full gap-2 md:w-1/2'>
          <TwitterIcon className='absolute w-6 h-6 right-2' />
          <span className='font-semibold text-slate-900'>
            Twitter:
          </span>
          <input type='text' name='twitter' value={data.twitter} className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
        </label>
        <label className='relative flex items-center w-full gap-2 md:w-1/2'>
          <DiscordIcon className='absolute w-6 h-6 right-2' />
          <span className='font-semibold text-slate-900'>
            Discord:
          </span>
          <input type='text' name='discord' value={data.discord} className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
        </label>
        <div className='flex justify-center w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setSteps('step-3')}
          >
            <ArrowBack className='w-6 h-6 text-white' />
            Volver
          </button>
          <button
            disabled={error.send !== ''}
            onClick={saveData}
            className='px-5 py-3 text-sm text-white transition duration-500 ease-in-out transform shadow-xl md:text-base bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
            type='submit'
          >Guardar y continuar
          </button>
        </div>
        {error.twitter && error.twitter !== 'error' && (
          <ToastError error={error.twitter} />
        )}
        {error.discord && error.discord !== 'error' && (
          <ToastError error={error.discord} />
        )}
      </form>
    </section>
  )
}
