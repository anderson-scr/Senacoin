import * as yup from 'yup'
import { regexUtils } from 'utils/validation/regex'

export const yupSchemaCadAdministrador = yup.object().shape({
  status: yup.string().matches(regexUtils.idUnidadePerfil).required(),
})