import api from '../routes/default';
import { routes } from "api/routes/routes"

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'
import { date } from 'yup';

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

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else return apiResponse.data

    } catch (error) {
      console.log(error)
    }
  },
  paraVencer: async (offset) => {
    try {
      const apiResponse = await api.get(routes.qrcode.todos + offset)

      // If there's no data in the apiResponse, return a empty array for react-table
      if(apiResponse.status === 204) {
        return []
      } else {
        const vencer = []
        const currentDay = new Date();
        apiResponse.data.forEach((data, idx) => {
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