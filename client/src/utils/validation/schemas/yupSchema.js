import * as yup from 'yup';

export const usuarioSchema = yup.object().shape({
  nome: yup.string().required(),
  sobrenome: yup.string().required(),
  email: yup.string().email().required(),
  cpf: yup.string().min(14).max(14).matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/).required(),
  matricula: yup.string().required()
})