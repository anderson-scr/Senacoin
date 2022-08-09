import axios from 'axios'
import { routes } from 'api/routes/routes'

export const callImgAPI = {
  novoImagem: async (imageFile) => {
    const formData = new FormData();
    formData.append("selectedFile", imageFile);
    try {
      const apiResponse = await axios.post(`http://localhost:5000/api/v1/item/addImg`, formData, {
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