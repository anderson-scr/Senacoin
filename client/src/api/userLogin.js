import axios from "axios";

export const callLoginAPI = async (email, senha) => {
  const query = await axios.post("http://localhost:5000/api/v1/colaborador/login", {
    email: email,
    senha: senha
  })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.response
    })

  return query
}