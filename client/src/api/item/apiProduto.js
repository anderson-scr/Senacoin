import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callProdutoAPI = {
  novo: async (produtoData) => {

    try {
      const call = await api.post(routes.produto.novo, JSON.stringify(produtoData))
        return call.data

    } catch (error) {
      console.log(error)
    }
  }
}