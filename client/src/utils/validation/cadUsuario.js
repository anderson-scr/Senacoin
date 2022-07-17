import * as yup from 'yup'
import { regexUtils } from './regex'

export const yupSchemaCadUsuario = yup.object().shape({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().min(14).max(14).matches(regexUtils.cpf).required(),
  matricula: yup.string().required(),
  id_unidade: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  perfil: yup.string().matches(regexUtils.idUnidadePerfil).required()
})