import api from '../routes/default'
import axios from 'axios'
import { routes } from 'api/routes/routes'

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callPromocaoAPI = {
  ativos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.promocao.ativo + offset)
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
      const apiResponse = await api.get(routes.promocao.todos)
      console.log(apiResponse.data)
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  novo: async (dadosPromocao, imageFile) => {
    try {
      const apiResponse = await api.post(routes.promocao.novo, JSON.stringify(dadosPromocao))
      console.log(apiResponse)

      // If the img upload goes wrong, throw new error
      if(!await callPromocaoAPI.novaImagem(imageFile)) {
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
      await axios.post(`http://localhost:5000/api/v1/promocao/${routes.promocao.novaImagem}`, formData, {
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
  baixoEstoque: async (offset) => {
    try {
      const apiResponse = await api.get(routes.promocao.todos)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const vencer = []
        const currentDay = new Date();
        apiResponse.data.forEach((data, idx) => {
          console.log(data)
          const cDate = new Date(data.data_fim)
          if(currentDay < cDate) {
            const diffTime = Math.abs(cDate - currentDay)
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            
            if(diffDays <= 7) vencer.push(apiResponse.data[idx])
          }
        })
        console.log(vencer)
        return apiResponse.data
      }

    } catch (error) {
      console.log(error)
    }
  }
}