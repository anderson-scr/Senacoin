import * as yup from 'yup'
import { regexUtils } from 'utils/validation/regex'

export const yupSchemaCadServico = yup.object().shape({
  nome: yup.string().required(),
  pontos: yup.number().positive().required(),
  id_subcategoria: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  data_inicio: yup.string().matches(regexUtils.data).required(),
  data_fim: yup.string().matches(regexUtils.data).required(),
  id_area: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  id_unidade: yup.string().matches(regexUtils.idUnidadePerfil).required(),
  descricao: yup.string(),
  imagem: yup.string()
})