import api from '../routes/default';
import { routes } from "api/routes/routes"


// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callQrcodeAPI = {
  novo: async (dadosQrcode) => {
    try {
      const apiResponse = await api.post(routes.qrcode.novo, JSON.stringify(dadosQrcode))
      ModalService.open(ModalCadCorreto)
      console.log(apiResponse)

    } catch (error) {
      ModalService.open(ModalCadErro)
      console.log(error)
    }
  },
  todos: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)
      console.log(apiResponse.data)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  paraVencer: async () => {
    try {
      const apiResponse = await api.get(routes.qrcode.paraVencer)
      
      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const filteredDate = []
        apiResponse.data.forEach(element => {
          const date = new Date(element.data_fim).toLocaleDateString()
          element.data_fim = date
          filteredDate.push(element)
        })
        return filteredDate
      } 
    } catch(error) {

    }
  }
}