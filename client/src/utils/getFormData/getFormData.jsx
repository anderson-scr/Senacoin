export const getFormData = () => {
  const formInputs = document.querySelectorAll('.form-control')
  const formChecks = document.querySelectorAll('.form-check-input')
  const formDrops = document.querySelectorAll('.form-select')

  let entradas ={
    inputs: {},
    drops: {},
    checks: {}
  }
  formInputs.forEach(iptValue => {
    entradas.inputs[iptValue.id] = iptValue.value
  })
  formDrops.forEach(dropValue => {
    entradas.drops[dropValue.id] = dropValue.value
  })
  formChecks.forEach(checkValue => {
    entradas.checks[checkValue.id] = checkValue.checked
  })
  console.log(entradas)
}