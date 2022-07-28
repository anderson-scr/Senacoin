import { routes } from "api/routes/routes"
import api from '../routes/default'

export const callPerfilAPI = {
  ativo: async () => {
    try {
      const apiResponse = await api.get(routes.perfil.ativo)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data
        
    } catch (error) {
      console.log(error)
    }
  }
}
