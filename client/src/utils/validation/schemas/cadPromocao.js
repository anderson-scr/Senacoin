import * as yup from 'yup'
import { regexUtils } from '../regex'

export const yupSchemaCadPromocao = yup.object().shape({
  items: yup.object().required(),
  desconto: yup.number().positive().required(),
  nome: yup.string().required(),
  quantidade: yup.number().positive().required(),
  data_inicio: yup.string().matches(regexUtils.data).required(),
  data_fim: yup.string().matches(regexUtils.data).required(),
  descricao: yup.string().required(),
  imagem: yup.string().required()
})