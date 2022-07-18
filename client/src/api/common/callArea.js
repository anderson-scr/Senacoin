import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callAreaAPI = {
  ativo: async () => {

    try {
      const call = await api.get(routes.area.ativo)
        return call.data
        
    } catch (error) {
      console.log(error)
    }
  }
}
