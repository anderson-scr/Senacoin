import React from 'react'

// Modal imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"

// API
import { callUnidadeAPI } from 'api/common/callUnidades'

// Form
import { useForm } from 'react-hook-form'
import { yupSchemaCadUnidade } from 'utils/validation/schemas/cadUnidade'
import { yupResolver } from '@hookform/resolvers/yup'

const ModalCadUnidade = (props) => {
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadUnidade)
  })

  function cadastrarUnidade(data) {
    callUnidadeAPI.novo(data)
  }

  return (
    <Modal>
      <ModalHeader>
        <div className='container text-start'>
          <h3>Cadastro de Unidade</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <form className='container text-start' onSubmit={handleSubmit(cadastrarUnidade)} style={{width: '50vw'}}>
          <div className='row'>
            <div className="mb-3 flex-grow-1">
              <label htmlFor="nomeUnidade" className="form-label" >Nome</label>
              <input type="text" className="form-control" id="nomeUnidade" {...register("nome")}/>
              <div style={{height: '25px'}}>
                {errors?.nome?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="mb-3 col-9">
              <label htmlFor="nomeCidade" className="form-label" >Cidade</label>
              <input type="text" className="form-control" id="nomeCidade" {...register("cidade")}/>
              <div style={{height: '25px'}}>
                {errors?.cidade?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="UF" className="form-label" >UF</label>
              <input type="text" className="form-control" id="UF" maxLength='2' {...register("uf")} />
              <div style={{height: '25px'}}>
                {errors?.uf?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="mb-3 col-9">
              <label htmlFor="logradouro" className="form-label" >Logradouro</label>
              <input type="text" className="form-control" id="logradouro" {...register("logradouro")} />
              <div style={{height: '25px'}}>
                {errors?.logradouro?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
            <div className="mb-3 col-3">
              <label htmlFor="numero" className="form-label" >Numero</label>
              <input type="number" className="form-control" id="numero" {...register("numero")} />
              <div style={{height: '25px'}}>
                {errors?.numero?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="mb-3 col-6">
              <label htmlFor="telefone" className="form-label" >Telefone</label>
              <input type="text" className="form-control" id="telefone" {...register("telefone")} />
              <div style={{height: '25px'}}>
                {errors?.telefone?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
            </div>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="responsavel" className="form-label" >Responsável</label>
              <input type="text" className="form-control" id="responsavel" {...register("responsavel")} />
              <div style={{height: '25px'}}>
                {errors?.responsavel?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className="row">
            <div className='col-6'>
              <button className="btn btnCancelar btn-outline-secondary w-50" onClick={ props.close } >Cancelar</button>
            </div>
            <div className='col-6 d-flex justify-content-end'>
              <button type='submit' className="btn btnSalvar btn-primary w-50" >Salvar</button>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ModalCadUnidade