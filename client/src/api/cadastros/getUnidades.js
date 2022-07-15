import axios from "axios";

export const getUnidadesAPI = async () => {
  const accessToken = localStorage.getItem("accessToken")

  const query = await axios.get("http://localhost:5000/api/v1/unidade/active", {
    headers: {
      'Authorization': JSON.parse(accessToken)
    }
  })

    .then(response => {
      console.log(JSON.stringify(response.data))
    })
    .catch(error => {
      console.log(`fudeu: ${error}`)
    })

  return query
}