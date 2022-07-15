export const getUserFormData = () => {
  const formInputs = document.querySelectorAll('.form-control')
  const formChecks = document.querySelectorAll('.form-check-input')
  const formDrops = document.querySelectorAll('.form-select')

  let entradas ={
    inputs: {},
    drops: {},
    checks: {}
  }
  formInputs.forEach(iptValue => {
    iptValue.id === 'sobrenome'? entradas.inputs['nome'] = entradas.inputs['nome'] + ' ' + iptValue.value : entradas.inputs[iptValue.id] = iptValue.value
  })

  formDrops.forEach(dropValue => {
    if (dropValue.id === 'id_unidade') entradas.drops[dropValue.id] = dropValue.value
  })

  formChecks.forEach(checkValue => {
    entradas.checks[checkValue.id] = checkValue.checked
  })
  
  return entradas
}