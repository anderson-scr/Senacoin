import * as yup from 'yup'
import { regexUtils } from '../regex'

export const yupSchemaCadArea = yup.object().shape({
  nome: yup.string().required(),
  id_unidade: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  descricao: yup.string().required()
})