import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callTodosItemsAPI = {
  ativos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.items.ativo + offset)
        console.log(apiResponse)
        return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  todos: async () => {
    try {
      const apiResponse = await api.get(routes.items.todos)
        return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}