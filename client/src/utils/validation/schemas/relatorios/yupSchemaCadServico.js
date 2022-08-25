import * as yup from 'yup'
import { regexUtils } from 'utils/validation/regex'

export const yupSchemaCadServico = yup.object().shape({
  status: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  data_inicio: yup.string().matches(regexUtils.data).required(),
  data_fim: yup.string().matches(regexUtils.data).required()
})