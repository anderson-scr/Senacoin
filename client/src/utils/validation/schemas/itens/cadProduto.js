import * as yup from 'yup'

export const yupSchemaCadProduto = yup.object().shape({
  nome: yup.string().required(),
  pontos: yup.number().positive().required(),
  quantidade: yup.number().positive().required(),
  id_categoria: yup.string().required(),
  id_subcategoria: yup.string().required(),
  id_area: yup.string().required(),
  id_unidade: yup.string().required(),
  descricao: yup.string().required(),
  imagem: yup.string().required()
})