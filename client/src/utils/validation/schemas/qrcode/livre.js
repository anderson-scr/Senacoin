import * as yup from 'yup'
import { regexUtils } from '../../regex'

export const yupSchemaCadQrcodeLivre = yup.object().shape({
  nome: yup.string().required(),
  pontos: yup.number().positive().required(),
  unico: yup.boolean().transform(value => validaRadio(value)).required(),
  diario: yup.boolean().transform(value => validaRadio(value)).required(),
  semanal: yup.boolean().transform(value => validaRadio(value)).required(),
  mensal: yup.boolean().transform(value => validaRadio(value)).required(),
  data_inicio: yup.string().matches(regexUtils.data).required(),
  data_fim: yup.string().matches(regexUtils.data).required(),
  descricao: yup.string()
})

function validaRadio(valor) {
  if( valor === null) {
    return false
  } else {
    return true
  }
}