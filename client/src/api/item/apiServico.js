import api from '../routes/default'
import { routes } from 'api/routes/routes'
import axios from 'axios'

// Modal
import ModalService from 'common/modal/services/modalService'
import ModalCadErro from 'common/preMadeModal/resultados/cadErro'
import ModalCadCorreto from 'common/preMadeModal/resultados/cadCorreto'

export const callServicoAPI = {
  novo: async (dadosServico, imageFile) => {
    try {
      const apiResponse = await api.post(routes.servico.novo, JSON.stringify(dadosServico))
      console.log(apiResponse)

      // If the img upload goes wrong, throw new error
      if(!await callServicoAPI.novaImagem(imageFile)) {
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
      await axios.post(`http://localhost:5000/api/v1/${routes.servico.novaImagem}`, formData, {
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