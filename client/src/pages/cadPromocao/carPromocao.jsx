import React, { useState, useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaCadPromocao } from 'utils/validation/schemas/cadPromocao';
import ModalSelecionarItem from './modal/modalSelecionaItem';
import ModalService from 'common/modal/services/modalService';


const CadPromocao = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadPromocao)
  });

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
  
      return () => effectOnce.current = false
    }
  }, [navigate])

  const teste = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalSelecionarItem)
  }
  function salvarInfo(data) {
    console.log(data)
  }
  function deuRuim(data) {
    console.log(data)
  }

  return (
    <form className='container' onSubmit={handleSubmit(salvarInfo, deuRuim)}>

      <div className='row'>
        <div className='mb-3 col-6'>
          <label htmlFor="dropArea" className="form-label">Item(s) vinculado a promoção</label>
          <input type="button" onClick={evt => teste(evt)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value="Selecionar item(s)" />
          <div style={{height: '25px'}}>
            {errors?.item?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputEmail1" className="form-label">Desconto Senacoin</label>
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='200 Senacoins' {...register("desconto")}/>
          <div style={{height: '25px'}}>
            {errors?.desconto?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputPassword1" className="form-label" >Titulo promoção</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="100" {...register("nome")}/>
          <div style={{height: '25px'}}>
            {errors?.nome?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputPassword1" className="form-label" >Quantidade</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="300" {...register("quantidade")} />
          <div style={{height: '25px'}}>
            {errors?.quantidade?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputPassword1" className="form-label" >Data inicial</label>
          <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicio")} />
          <div style={{height: '25px'}}>
            {errors?.data_inicio?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputPassword1" className="form-label" >Data final</label>
          <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_fim")} />
          <div style={{height: '25px'}}>
            {errors?.data_fim?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 flex-grow-1" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <textarea type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("descricao")} />
        </div>
        <div className="mb-3 ">
          <label htmlFor="formFile" className="form-label">Imagem da promoção</label> 
          <input className="form-control" type="file" id="formFile" {...register("imagem")} />
        </div>
      </div>

      <div className='containerBtns row mt-5'>
        <div className='col d-flex'>
          <button type="submit" className="btn btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end'>
          <button type="submit" className="btn btn-primary w-50">Salvar</button>
        </div>
      </div>
    </form>
  )
}

export default CadPromocao