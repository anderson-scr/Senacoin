export const validaCpf = strCPF => {
  // valores para multiplicar o cpf. Nao tem o 10 na string.
  const multiplicador = '098765432'

  // Retira os pontos e barras do cpf
  const cpfLimpo = strCPF.replace(/[.-]/g, '')

  // Multiplicacao inicial
  let resultadoMultiplicacao = 0
  for(let i = 0; i < 9; i++) {
    i === 0? 
    resultadoMultiplicacao+= parseInt(cpfLimpo[i]) * 10
    :
    resultadoMultiplicacao+= parseInt(cpfLimpo[i]) * parseInt(multiplicador[i])

  }

  // Digito verificador
  const resto = 11 - (resultadoMultiplicacao % 11)
}
