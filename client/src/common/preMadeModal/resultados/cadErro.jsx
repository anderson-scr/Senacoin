import React from 'react'

// Modal imports
import Modal from "common/modal/modalIndex"
import ModalBody from "common/modal/components/modalBody"
import ModalFooter from 'common/modal/components/modalFooter'

// Icon
import { TbFaceIdError } from 'react-icons/tb'


const ModalCadErro = (props) => {
  return (
    <Modal>
      <ModalBody>
          <h3>Oops! Houve algum problema.</h3>
          <legend className='mb-4'>Por favor, tente novamente.</legend>
          <div className='d-flex justify-content-center mb-4' style={{width: '30vw'}}>
            <TbFaceIdError size={140} style={{color: '#DC3545'}} />
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

export default ModalCadErro