import React from "react"
import Table from "common/table/tableIndex"
import { selectItemTableSchema } from "common/table/schemas/selectItem"
import { callTodosItemsAPI } from "api/item/apiTodos"

// Imports do modal
import Modal from 'common/modal/modalIndex'
import ModalHeader from 'common/modal/components/modalHead'
import ModalBody from 'common/modal/components/modalBody'
import ModalFooter from 'common/modal/components/modalFooter'


export default function ModalSelecionarItem(props) {
  return (
    <Modal>
      <ModalHeader>
        <h3>Selecione um item</h3>
      </ModalHeader>

      <ModalBody>
        <Table apiRoute={callTodosItemsAPI.ativos} columnSchema={selectItemTableSchema} setCurrentState={props} categoria={true} offset={props} />
      </ModalBody>

      <ModalFooter>
        <div className="w-100 d-flex justify-content-between">
          <button className="btn btnCancelar btn-outline-secondary w-25" onClick={ props.close } >Cancelar</button>
          <button className="btn btnSalvar btn-primary w-25" onClick={ props.close } >Salvar</button>
        </div>
      </ModalFooter>
    </Modal>
  );
}