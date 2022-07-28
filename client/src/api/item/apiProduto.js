import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callProdutoAPI = {
  novo: async (dadosProduto) => {
    try {
      const apiResponse = await api.post(routes.produto.novo, JSON.stringify(dadosProduto))
      return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  }
}