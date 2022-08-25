import * as yup from 'yup'
import { regexUtils } from 'utils/validation/regex'

export const yupSchemaCadAreaSubUni = yup.object().shape({
  status: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  tipo: yup.string().matches(regexUtils.idUnidadePerfil).required()
})