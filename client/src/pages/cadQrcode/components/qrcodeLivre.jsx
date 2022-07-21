import React, {useEffect, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { yupSchemaCadQrcodeLivre } from 'utils/validation/schemas/qrcode/livre';

const QrcodeLivre = () => {
  const navigate = useNavigate()
  const effectOnce = useRef(true)

  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadQrcodeLivre)
  });

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      return () => effectOnce.current = false
    }
  }, [navigate])


  function salvarInfo(data) {
    console.log(data)
  }
  function deuRuim(data) {
    console.log(data)
  }


  return (
    <form className='form container' onSubmit={handleSubmit(salvarInfo, deuRuim)}>

      {/* First row */}
      <div className='col'>
        <div className="mb-2">
          <label htmlFor="iptNome" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="iptNome" {...register("nome")} />
          <div style={{height: '25px'}}>
            {errors?.nome?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="iptNome" className="form-label">Senacoins</label>
          <input type="text" className="form-control" id="iptNome" {...register("pontos")} />
          <div style={{height: '25px'}}>
            {errors?.pontos?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>

        <div className='mb-2'>
          <div className='mb-2'>
            <p>Tipo de uso</p>
          </div>
          <div className='d-flex justify-content-between mb-2'>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked {...register("unico")} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Único
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("diario")} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Diário
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("semanal")} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Semanal
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("mensal")} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Mensal
              </label>
            </div>
          </div>
          <div id="emailHelp" className="textObrigatorio form-text">Campo obrigatório.</div>
        </div>

        <div className='containerDouble d-flex'>
          <div className="mb-2 flex-grow-1">
            <label htmlFor="exampleInputPassword1" className="form-label" >Data inicial</label>
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicio")} />
            <div style={{height: '25px'}}>
            {errors?.data_inicio?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
          </div>
          <div className="mb-2 flex-grow-1">
            <label htmlFor="exampleInputPassword1" className="form-label" >Data final</label>
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_fim")} />
            <div style={{height: '25px'}}>
            {errors?.data_fim?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
          </div>
        </div>
        
        <div className="mb-2 flex-grow-1 containerDesc" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <textarea type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("descricao")} />
        </div>
      </div>

      {/* Second row */}
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

export default QrcodeLivre