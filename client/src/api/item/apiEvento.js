import api from '../routes/default'
import axios from 'axios'
import { routes } from 'api/routes/routes'

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callEventoAPI = {
  novo: async (dadosEvento, imageFile) => {
    try {
      const apiResponse = await api.post(routes.evento.novo, JSON.stringify(dadosEvento))
      console.log(apiResponse)

      // If the img upload goes wrong, throw new error
      if(!await callEventoAPI.novaImagem(imageFile)) {
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
      await axios.post(`http://localhost:5000/api/v1/${routes.evento.novaImagem}`, formData, {
        headers: {
          'Content-type': 'multipart/form-data'
        }
      })
      return true

    } catch (error) {
      console.log(error)
      return false
    }
  }
}