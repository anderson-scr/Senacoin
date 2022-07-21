import api from '../routes/default';
import { routes } from "api/routes/routes";

export const callProdutoAPI = {
  novo: async (dadosProduto) => {

    try {
      const call = await api.post(routes.produto.novo, JSON.stringify(dadosProduto))
      console.log(call)  
      return call.data

    } catch (error) {
      console.log(error)
    }
  }
}