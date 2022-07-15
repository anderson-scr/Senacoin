import axios from "axios";

export const getUnidadesAPI = async () => {
  const query = await axios.get("http://localhost:5000/api/v1/unidade/active")

    .then(response => {
      console.log(`200: ${response}`)
    })
    .catch(error => {
      console.log(`fudeu: ${error}`)
    })

  return query
}