import React, { useState } from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { UserProvider } from '../../../../domain/types'

export const Steps3 = (
  { userProvider, setSteps }:
  {userProvider: UserProvider, setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [description, setDescription] = useState('')
  const [error, setError] = useState(false)

  const saveData = () => {
    if (description) {
      localStorage.setItem('description', description)
      localStorage.setItem('step', 'step-3')
      setSteps('step-4')
    } else {
      setError(true)
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <article className='w-full'>
        <label className='flex items-center justify-center gap-5'>
          <span className=''>
            Nombre:
          </span>
          <input type='text' name='name' className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
        </label>
      </article>
      <article>
        <label className='flex items-center justify-center gap-5'>
          Edad:
          <input type='number' name='age' className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
        </label>
        <div>Solicitamos tú edad para que puedas encontrar otros usuarios con edad parecida a la tuya, en caso de que así lo desees.</div>
      </article>
      <article>
        <div>
          Genero:
        </div>
        <div className='flex' role='group' aria-labelledby='my-radio-group'>
          <input
            type='radio'
            name='gender'
            value='M'
            id='M'
          />
          <label htmlFor='M'>
            Masculino
          </label>
          <input
            type='radio'
            name='gender'
            value='F'
            id='F'
          />
          <label htmlFor='F'>
            Femenino
          </label>
          <input
            type='radio'
            name='gender'
            value='O'
            id='O'
          />
          <label htmlFor='O'>
            Otro
          </label>
        </div>
        <p>Para MixWik la igualdad es lo primero, así que por lo tanto nunca se mostrará tú genero a otras personas y nadie podrá filtrar usuarios por este campo.</p>
      </article>
      <article>
        <label>
          Describete:
          <textarea placeholder='Máximo 350 caracteres' rows={4} name='description' />
        </label>
        <div>{description.length > 0 ? description.length : 0}/350</div>
      </article>
      <div className='flex justify-center w-full gap-10'>
        <button className='flex items-center gap-1' onClick={() => setSteps('step-2')}>
          <ArrowBack className='w-6 h-6 text-white' />
          Volver
        </button>
        <button
          disabled={!description}
          onClick={saveData}
          className='px-5 py-3 text-white transition duration-500 ease-in-out transform shadow-xl bg-pennBlue rounded-xl hover:shadow-inner focus:outline-none hover:-translate-x hover:scale-105 disabled:bg-slate-500'
        >Guardar y continuar
        </button>
      </div>
      {error && <p className='font-bold text-red-500'>{error}</p>}
    </section>
  )
}
