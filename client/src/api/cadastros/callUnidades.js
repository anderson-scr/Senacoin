import axios from "axios";

export const callUnidadeAPI = async () => {
  const accessToken = localStorage.getItem("accessToken")
  let unidades

  await axios.get("http://localhost:5000/api/v1/unidade/active", {
    headers: {
      'Authorization': JSON.parse(accessToken)
    }
  })

    .then(response => {
      console.log(response.data)
      unidades = response.data
    })
    .catch(error => {
      console.log(`fudeu: ${error}`)
    })

  return unidades
}
