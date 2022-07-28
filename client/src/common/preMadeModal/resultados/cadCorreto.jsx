import React from 'react'

// Icon
import { BsCheckSquare } from "react-icons/bs";
// Modal imports
import Modal from "common/modal/modalIndex"
import ModalBody from "common/modal/components/modalBody"
import ModalFooter from 'common/modal/components/modalFooter'

const ModalCadCorreto = (props) => {
  return (
    <Modal>
      <ModalBody>
          <h3 className='mb-5'>Cadastro efetuado com sucesso!</h3>
          <div className='d-flex justify-content-center mb-4' style={{width: '30vw'}}>
            <BsCheckSquare size={120} style={{color: '#28A745'}} />
          </div>
      </ModalBody>
      <ModalFooter>
        <div className="w-100 d-flex justify-content-center">
          <button className="btn btnSalvar btn-primary w-75" onClick={ props.close } >Ok</button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCadCorreto