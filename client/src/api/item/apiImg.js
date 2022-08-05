import axios from 'axios'
import { routes } from 'api/routes/routes'

export const callImgAPI = {
  novoImagem: async (image, fileName) => {
    try {
      const apiResponse = await axios.post(`http://localhost:5000/api/v1/item/${fileName}/addImg`, image, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      console.log(apiResponse)

    } catch (error) {
      console.log(error)
    }
  }
}