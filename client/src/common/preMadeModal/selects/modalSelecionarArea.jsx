import React from 'react'

// Table
import Table from "common/table/tableIndex"
import { selectAreaTableSchema } from 'common/table/schemas/selectArea'

// Imports do modal
import Modal from 'common/modal/modalIndex'
import ModalHeader from 'common/modal/components/modalHead'
import ModalBody from 'common/modal/components/modalBody'
import ModalFooter from 'common/modal/components/modalFooter'

// API
import { callAreaAPI } from 'api/common/callArea'

const ModalSelecionarArea = (props) => {
  return (
    <Modal>
      <ModalHeader>
        <h3>Selecionar Area(s)</h3>
      </ModalHeader>

      <ModalBody>
        <div className='container' style={{width: '55vw'}}>
          <Table apiRoute={callAreaAPI.ativo} columnSchema={selectAreaTableSchema} rowSize={12} setCurrentState={props} filters={false} />
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

export default ModalSelecionarArea