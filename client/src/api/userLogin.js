import axios from "axios";

export const callLoginAPI = async (email, password) => {
  const query = await axios.post("http://localhost:5000/api/v1/usuario/login", {
    email: email,
    password: password
  })
    .then(response => {
      return response
    })
    .catch(error => {
      return error.response
    })

  return query
}