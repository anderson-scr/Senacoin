import React from 'react'

// Modal imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"

// Form
import { useForm } from 'react-hook-form'
import { yupSchemaCadSubcategoria } from 'utils/validation/schemas/cadSubcategoria'
import { yupResolver } from '@hookform/resolvers/yup'

// API
import { callSubcategoriaAPI } from 'api/common/callSubcategoria'

const ModalCadSubcategoria = (props) => {
  // Form info
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadSubcategoria)
  })

  function cadastrarSubcategoria(data) {
    console.log(data)
    callSubcategoriaAPI.novo(data)
  }

  return (
    <Modal>
      <ModalHeader>
        <h3>Cadastro de Subcategoria</h3>
      </ModalHeader>
      <ModalBody>
      <form className='container text-start' onSubmit={handleSubmit(cadastrarSubcategoria)} >
          <div className='row'>
            <div className="mb-3 flex-grow-1">
              <label htmlFor="nomeArea" className="form-label" >Nome</label>
              <input type="text" className="form-control" id="nomeArea" {...register("nome")} />
              <div style={{height: '25px'}}>
                {errors?.nome?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row mb-3'>
            <div className="mb-3 flex-grow-1" >
              <label htmlFor="iptDescricao" className="form-label">Descrição</label>
              <textarea type="text" className="iptDescricao form-control" id="iptDescricao" {...register("descricao")} />
            </div>
          </div>
          <div className="row">
            <div className='col' >
              <button className="btn btnCancelar btn-outline-secondary w-75" onClick={ props.close } >Cancelar</button>
            </div>
            <div className='col d-flex justify-content-end'>
              <button type='submit' className="btn btnSalvar btn-primary w-75" >Salvar</button>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ModalCadSubcategoria