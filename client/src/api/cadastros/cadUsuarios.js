import axios from "axios";

export const callRegisterAPI = async (cadUsuarioInfo) => {
  const query = await axios.post("http://localhost:5000/api/v1/colaborador/register", cadUsuarioInfo)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error.response)
    })

  return query
}