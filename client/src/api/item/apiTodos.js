import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callTodosItemsAPI = {
  ativos: async () => {

    try {
      const todosItems = await api.get(routes.items.ativo)
        return todosItems.data

    } catch (error) {
      console.log(error)
    }
  }
}