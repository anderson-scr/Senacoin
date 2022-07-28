import * as yup from 'yup'
import { regexUtils } from '../regex'

export const yupSchemaCadUnidade = yup.object().shape({
  nome: yup.string().required(),
  cidade: yup.string().required(),
  uf: yup.string().min(2).max(2).required(),
  logradouro: yup.string().required(),
  numero: yup.number().required(),
  telefone: yup.string().matches(regexUtils.telefone).required(),
  responsavel: yup.string().required()
})