import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callPromocaoAPI = {
  ativos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.promocao.ativo + offset)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.promocao.todos + offset)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}