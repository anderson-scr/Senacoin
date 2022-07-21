import { routes } from "api/routes/routes"
import api from '../routes/default'

export const callUnidadeAPI = {
  ativo: async () => {
    try {
      const unidades = await api.get(routes.unidade.ativo)
      return unidades.data

    } catch (error) {
      console.log(error)
    }
  }
}
