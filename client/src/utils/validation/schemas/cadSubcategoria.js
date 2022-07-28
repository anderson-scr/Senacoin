import * as yup from 'yup'

export const yupSchemaCadSubcategoria = yup.object().shape({
  nome: yup.string().required(),
  descricao: yup.string().required()
})