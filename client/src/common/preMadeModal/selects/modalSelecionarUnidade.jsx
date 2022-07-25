import React, { useEffect } from 'react'

// Table
import Table from "common/table/tableIndex"
import { selectUnidadeTableSchema } from 'common/table/schemas/selectUnidade'

// Imports do modal
import Modal from 'common/modal/modalIndex'
import ModalHeader from 'common/modal/components/modalHead'
import ModalBody from 'common/modal/components/modalBody'
import ModalFooter from 'common/modal/components/modalFooter'

// API
import { callUnidadeAPI } from 'api/common/callUnidades'

const ModalSelecionarUnidade = (props) => {

  const atualizarUnidades = () => {
    console.log(props)
  }
  return (
    <Modal>
      <ModalHeader>
        <h3>Selecione um item</h3>
      </ModalHeader>

      <ModalBody>
        <Table apiRoute={callUnidadeAPI.ativo} columnSchema={selectUnidadeTableSchema} rowSize={15} setCurrentState={props} />
      </ModalBody>

      <ModalFooter>
        <div className="w-100 d-flex justify-content-between">
          <button className="btn btnCancelar btn-outline-secondary w-25" onClick={ props.close } >Cancelar</button>
          <button className="btn btnSalvar btn-primary w-25" onClick={ props.close } >Salvar</button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default ModalSelecionarUnidade