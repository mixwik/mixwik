import * as yup from 'yup'

export const cs2SchemaGame = yup
  .object({
    title: yup
      .string()
      .required('El campo nombre es obligatorio')
      .min(3, 'Mínimo 3 caracteres')
      .max(30, 'Máximo 30 caracteres'),
    description: yup
      .string()
      .required('El campo descripción es obligatorio')
      .min(100, 'Mínimo 100 caracteres')
      .max(350, 'Máximo 350 caracteres'),
    level: yup
      .string()
      .required('El campo nivel es obligatorio'),
    premier: yup
      .string()
      .required('El campo premier es obligatorio'),
    position: yup
      .array()
      .min(1, 'Selecciona al menos una posición'),
    typeOfGamer: yup
      .array()
      .min(1, 'Selecciona al menos un tipo'),
    hours: yup
      .number()
      .required('El campo horas es obligatorio')
      .min(1, 'El campo horas es obligatorio')
      .max(5000, 'Máximo 5000 horas')
  })
  .required()

export const cs2SchemaTeams = yup
  .object({
    title: yup
      .string()
      .required('El campo nombre es obligatorio')
      .min(3, 'Mínimo 3 caracteres')
      .max(30, 'Máximo 30 caracteres'),
    description: yup
      .string()
      .required('El campo descripción es obligatorio')
      .min(100, 'Mínimo 100 caracteres')
      .max(350, 'Máximo 350 caracteres'),
    level: yup
      .array()
      .min(1, 'Selecciona al menos un nivel'),
    premier: yup
      .array()
      .min(1, 'Selecciona al menos un nivel'),
    position: yup
      .array()
      .min(1, 'Selecciona al menos una posición'),
    typeOfGamer: yup
      .array()
      .min(1, 'Selecciona al menos un tipo'),
    hours: yup
      .number()
      .required('El campo horas es obligatorio')
      .min(1, 'El campo horas es obligatorio')
      .max(5000, 'Máximo 5000 horas')
  })
  .required()
