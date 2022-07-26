import React from 'react'

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
  return (
    <Modal>
      <ModalHeader>
        <h3>Selecionar Unidade(s)</h3>
      </ModalHeader>

      <ModalBody>
        <div className='container' style={{width: '55vw'}}>
          <Table apiRoute={callUnidadeAPI.ativo} columnSchema={selectUnidadeTableSchema} rowSize={12} setCurrentState={props} filters={false} />
        </div>
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