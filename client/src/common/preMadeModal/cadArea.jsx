import React, {useState, useEffect, useRef} from 'react'

// Modal imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"

// Form
import { useForm } from 'react-hook-form'
import { yupSchemaCadArea } from 'utils/validation/schemas/cadAreas'
import { yupResolver } from '@hookform/resolvers/yup'

// API
import { callAreaAPI } from 'api/common/callArea'
import { callUnidadeAPI } from 'api/common/callUnidades'

const ModalCadArea = (props) => {
  const effectOnce = useRef(true)
  const [unidades, setUnidades] = useState([])
  
  useEffect(() => {
    if(effectOnce.current) {

      // Fill dropDows unidades
      (async () => {
        setUnidades(await callUnidadeAPI.ativo())
      })()
      return () => effectOnce.current = false
    }
  }, [])

  // Form info
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadArea)
  })

  function cadastrarArea(data) {
    data.id_unidade = [unidades[data.id_unidade - 1]._id]
    callAreaAPI.novo(data)
  }

  return (
    <Modal>
      <ModalHeader>
        <h3>Cadastro de Area</h3>
      </ModalHeader>
      <ModalBody>
        <form className='container text-start' onSubmit={handleSubmit(cadastrarArea)} >
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
            <div className='mb-3 flex-grow-1'>
              <label htmlFor="dropUnidade" className="form-label">Unidade</label>
              <select className="form-select" id='dropUnidade' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_unidade")}>
                <option value="DEFAULT" disabled style={{display: "none"}}>Selecione</option>
                {unidades.length > 1 &&
                  unidades.map((unidade, idx) => {
                    return <option key={idx} value={idx + 1}>{unidade.nome}</option>
                  })
                }
              </select>
              <div style={{height: '25px'}}>
                {errors?.id_unidade?.type &&
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

export default ModalCadArea