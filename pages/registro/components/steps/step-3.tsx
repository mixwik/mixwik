import React, { useEffect, useState } from 'react'
import { ArrowBack } from '../../../../components/Svg'
import { ToastError } from '../toastError'

export const Step3 = (
  { setSteps }:
  { setSteps: React.Dispatch<React.SetStateAction<string>>}
) => {
  const [error, setError] = useState({
    name: 'error',
    age: 'error',
    gender: 'error',
    description: 'error',
    send: 'error'
  })
  const [data, setData] = useState({
    name: '',
    age: '',
    gender: '',
    description: ''
  })

  useEffect(() => {
    const fields = ['name', 'age', 'description', 'gender']

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

  const validateDescription = (value) => {
    if (value.length > 350) {
      setData(prevState => ({ ...prevState, description: value }))
      return 'La descripción no puede tener más de 350 caracteres'
    } else if (value.length === 0) {
      setData(prevState => ({ ...prevState, description: value }))
      return 'La descripción no puede estar vacía'
    } else if (value.length < 100) {
      setData(prevState => ({ ...prevState, description: value }))
      return 'La descripción debe tener al menos 100 caracteres'
    } else {
      setData(prevState => ({ ...prevState, description: value }))
      return ''
    }
  }

  const validateAge = (value) => {
    const age = new Date().getFullYear() - new Date(value).getFullYear()
    if (age < 16) {
      setData(prevState => ({ ...prevState, age: value }))
      return 'Debes ser mayor de 16 años para usar MixWik'
    } else if (age > 100) {
      setData(prevState => ({ ...prevState, age: value }))
      return 'Edad no válida'
    } else if (age === 0) {
      setData(prevState => ({ ...prevState, age: value }))
      return 'Fecha no válida'
    } else {
      setData(prevState => ({ ...prevState, age: value }))
      return ''
    }
  }

  const validateName = (value) => {
    if (value.length < 3) {
      setData(prevState => ({ ...prevState, name: value }))
      return 'El nombre debe tener al menos 3 caracteres'
    } else if (value.length > 50) {
      setData(prevState => ({ ...prevState, name: value }))
      return 'El nombre no puede tener más de 50 caracteres'
    } else {
      setData(prevState => ({ ...prevState, name: value }))
      return ''
    }
  }

  const validateGender = (value) => {
    if (!value) {
      setData(prevState => ({ ...prevState, gender: value }))
      return 'Debes seleccionar un genero'
    } else {
      setData(prevState => ({ ...prevState, gender: value }))
    }
  }

  const validators = {
    description: validateDescription,
    age: validateAge,
    name: validateName,
    gender: validateGender
  }

  const validateData = (e) => {
    const { name, value } = e.target
    const validator = validators[name]
    if (validator) {
      const errorMessage = validator(value)
      setError(prevState => ({ ...prevState, [name]: errorMessage }))
    }
    if (!error.age && !error.name && !error.description && !error.gender) {
      setError(prevState => ({ ...prevState, send: '' }))
    }
  }

  const saveData = (e) => {
    e.preventDefault()
    if (data.name && data.age && data.description && data.gender) {
      localStorage.setItem('step', 'step-4')
      localStorage.setItem('name', data.name)
      localStorage.setItem('age', data.age)
      localStorage.setItem('description', data.description)
      localStorage.setItem('gender', data.gender)
      setSteps('step-4')
    } else {
      setError({ send: 'Debes completar todos los campos', ...error })
    }
  }

  return (
    <section className='flex flex-col items-center justify-around w-full h-full gap-5 p-5 bg-white rounded-lg md:h-4/5 md:w-1/2'>
      <form
        onChange={(e) => validateData(e)}
        onSubmit={(e) => saveData(e)}
        className='flex flex-col items-center justify-around w-full h-full gap-5 bg-white rounded-lg'
      >
        <div
          className='grid w-full gap-5 md:grid-cols-2'
        >
          <div className='w-full'>
            <label className='flex flex-col gap-2'>
              <span className='font-semibold text-slate-900'>
                Nombre:
              </span>
              <input type='text' name='name' value={data.name} className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
            </label>
          </div>
          <div>
            <label className='flex flex-col gap-2'>
              <span className='font-semibold text-slate-900'>
                Fecha de nacimiento:
              </span>
              <input type='date' name='age' value={data.age} className='block w-full p-5 mt-1 bg-gray-100 border-none shadow-lg h-9 rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0' />
            </label>
          </div>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <span className='font-semibold text-slate-900'>
            Genero:
          </span>
          <ul className='grid w-full gap-2 md:grid-cols-3'>
            <li>
              <input type='radio' id='m' name='gender' value='M' className='hidden peer' required checked={data.gender === 'M'} />
              <label htmlFor='m' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>Masculino</div>
              </label>
            </li>
            <li>
              <input type='radio' id='f' name='gender' value='F' className='hidden peer' required checked={data.gender === 'F'} />
              <label htmlFor='f' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>Femenino</div>
              </label>
            </li>
            <li>
              <input type='radio' id='n' name='gender' value='N' className='hidden peer' required checked={data.gender === 'N'} />
              <label htmlFor='n' className='inline-flex items-center justify-between w-full p-2 text-gray-500 bg-white border-2 border-solid rounded-lg cursor-pointer border-aero peer-checked:border-pennBlue peer-checked:text-pennBlue hover:text-gray-600 hover:bg-gray-100'>
                <div className='w-full text-lg font-semibold text-center'>No binario</div>
              </label>
            </li>
          </ul>
        </div>
        <div className='relative w-full'>
          <label className='flex flex-col w-full gap-2'>
            <span className='font-semibold text-slate-900'>
              Describete:
            </span>
            <textarea
              className='w-full p-5 mt-1 bg-gray-100 border-none shadow-lg resize-none rounded-xl hover:bg-blue-100 focus:bg-blue-100 focus:ring-0'
              placeholder='Máximo 350 caracteres'
              rows={3}
              name='description'
              value={data.description}
            />
          </label>
          <span className='absolute z-10 bottom-2 right-2'>{data.description.length > 0 ? data.description.length : 0}/350</span>
        </div>
        <div className='flex justify-center w-full gap-10'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm md:text-base'
            onClick={() => setSteps('step-2')}
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
        {error.name && error.name !== 'error' && (
          <ToastError error={error.name} />
        )}
        {error.age && error.age !== 'error' && (
          <ToastError error={error.age} />
        )}
        {error.description && error.description !== 'error' && (
          <ToastError error={error.description} />
        )}
        {error.gender && error.gender !== 'error' && (
          <ToastError error={error.gender} />
        )}
      </form>
    </section>
  )
}
