import React from 'react'

// Modal imports
import Modal from 'common/modal/modalIndex'
import ModalHeader from 'common/modal/components/modalHead'
import ModalBody from 'common/modal/components/modalBody'

// Cad for edit
import EditProduto from './components/editProduto'

const ModalEditItem = (props) => {
  return (
    <Modal>
      <ModalHeader>
        <h3>Editar Produto</h3>
      </ModalHeader>

      <ModalBody>
        <div className='text-start' style={{width: '65vw'}} >
          <EditProduto closeModal={props.close} />
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ModalEditItem