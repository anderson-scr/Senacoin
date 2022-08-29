import api from '../routes/default'
import { routes } from 'api/routes/routes'
import axios from 'axios'

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callProdutoAPI = {
  novo: async (dadosProduto, imageFile) => {
    try {
      const apiResponse = await api.post(routes.produto.novo, JSON.stringify(dadosProduto))
      console.log(apiResponse)

      // If the img upload goes wrong, throw new error
      if(!await callProdutoAPI.novaImagem(imageFile)) {
        throw new Error('Erro ao salvar img!')
      } else {
        ModalService.open(ModalCadCorreto)
      }

    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  novaImagem: async (imageFile) => {
    // To have req.files we need to set a FormData first, then send it
    const formData = new FormData()
    formData.append('selectedFile', imageFile)

    try {
      await axios.post(`http://localhost:5000/api/v1/${routes.produto.novaImagem}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  },
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.produto.todos + offset)
      // If there's no data in the apiResponse, return a empty array for react-table
      console.log(apiResponse)
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  buscaProduto: async (userId) => {
    try {
      const apiResponse = await api.get(routes.produto.buscaProduto + userId)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data.item

    } catch (error) {
      ModalService.open(ModalCadErro)
    }
  },
}