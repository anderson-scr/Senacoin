export const regexUtils = {
  // 000.000.000-00
  cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

  // (00) 00000-0000 ou (00) 0000-0000
  telefone: /(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/,

  // email@exemplo.com
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  // Usado para confirmar que o valor que esta sendo passado nao e o valor DEFAULT dos dropsdowns
  idUnidadePerfil: /^[0-9]*$/,

  // Confirmar que o que foi enviado do form esta no padrao YYYY-MM-DD
  data: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
}