import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callTodosItemsAPI = {
  ativos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.items.ativo + offset)
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
      const apiResponse = await api.get(routes.items.todos + offset)
      console.log(apiResponse.data)
      // If there's no data in the apiResponse, return a empty array for react-table
      console.log(apiResponse)
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  baixoEstoque: async (offset) => {
    try {
      const apiResponse = await api.get(routes.items.todos)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const lowStorage = []
        apiResponse.data.forEach((data, idx) => {
          if(data.quantidade < 15 && data.quantidade !== null) {
            lowStorage.push(apiResponse.data[idx])
          }
        })
        return lowStorage
      }

    } catch (error) {
      console.log(error)
    }
  }
}