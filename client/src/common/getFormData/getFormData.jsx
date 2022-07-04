export const getFormData = () => {
  const form = document.querySelector('form')

  const formData = Object.values(form).reduce((obj,field) => { obj[field.name] = field.value; return obj }, {})
  return formData
}