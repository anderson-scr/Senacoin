import React from 'react'

// Modal imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"
import ModalFooter from "common/modal/components/modalFooter"


const ModalCadSubcategoria = (props) => {
  return (
    <Modal>
      <ModalHeader>
        <h3>Cadastro de Subcategoria</h3>
      </ModalHeader>
      <ModalBody>
        <form className='container text-start'>
          <div className='row'>
            <div className="mb-3 flex-grow-1">
              <label htmlFor="nomeSubcategoria" className="form-label" >Nome</label>
              <input type="text" className="form-control" id="nomeSubcategoria" />
              <div style={{height: '25px'}}>
                {/* {errors?.nome?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                } */}
              </div>
            </div>
          </div>
          <div className='row'>
            <div className="mb-3 flex-grow-1" >
              <label htmlFor="iptDescricao" className="form-label">Descrição</label>
              <textarea type="text" className="iptDescricao form-control" id="iptDescricao" />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="w-100 d-flex justify-content-between">
          <button className="btn btnCancelar btn-outline-secondary w-25" onClick={ props.close } >Cancelar</button>
          <button className="btn btnSalvar btn-primary w-25" >Salvar</button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default ModalCadSubcategoria