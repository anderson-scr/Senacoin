import axios from "axios";

export const callLoginAPI = async (username, password) => {
  const query = await axios.post("http://localhost:5000/login", {
    username: username,
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