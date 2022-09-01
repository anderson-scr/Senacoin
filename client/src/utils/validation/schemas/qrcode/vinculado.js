import * as yup from 'yup'
import { regexUtils } from '../../regex'

export const yupSchemaCadQrcodeVinculado = yup.object().shape({
  nome: yup.string().required(),
  // item_vinculado: yup.object().required(),
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