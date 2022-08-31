import api from '../routes/default'
import { routes } from "api/routes/routes"
import axios from 'axios'
// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callTodosItemsAPI = {
  ativos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.items.ativo + offset)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.items.todos + offset)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      ModalService.open(ModalCadErro)
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
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  atualizarItem: async (itemId, itemInfo, imageFile, categoria) => {
    try {
      await api.patch(routes.items.atualizarItem + itemId, JSON.stringify(itemInfo))

      // If the img upload goes wrong, throw new error
      if(imageFile != false) {
        try {
          await callTodosItemsAPI.atualizaImagem(imageFile, categoria)
        } catch {
          throw new Error('Erro ao salvar img!')
        }
      }
      
      ModalService.open(ModalCadCorreto)
    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  atualizaImagem: async (imageFile, categoria) => {
    // To have req.files we need to set a FormData first, then send it
    const formData = new FormData()
    formData.append('selectedFile', imageFile)

    try {
      await axios.post(`http://localhost:5000/api/v1/item/${categoria}/addImg`, formData, {
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
  inativaItem: async (userId) => {
    try {
      await api.delete(routes.items.inativaItem + userId, JSON.stringify({ativo: false}))
      
      ModalService.open(ModalCadCorreto)
    } catch (error) {
      console.log(error)
      ModalService.open(ModalCadErro)
    }
  },
  ativarItem: async (itemId, itemInfo) => {
    try {
      await api.patch(routes.items.atualizarItem + itemId, JSON.stringify(itemInfo))
      
      ModalService.open(ModalCadCorreto)
    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  }
}