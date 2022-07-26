import React, { useRef, useEffect, useState } from 'react'
import ModalSelecionarItem from './modal/modalSelecionaItem'
import ModalService from 'common/modal/services/modalService'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { yupSchemaCadQrcodeVinculado } from 'utils/validation/schemas/qrcode/vinculado'
import QuestionTooltip from 'common/tooltips/questionTooltip'


const QrcodeVinculado = () => {
  const navigate = useNavigate()
  const effectOnce = useRef(true)

  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadQrcodeVinculado)
  });

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      return () => effectOnce.current = false
    }
  }, [navigate])


  const abrirModal = (evt) => {
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
          <QuestionTooltip label='Item(s) vinculado ao Qrcode' msg='Selecionar quais items irão receberem a promoção.' />
          <input type="button" value="Selecionar item" onClick={evt => abrirModal(evt)} className="form-control" id="iptNome" {...register("item_vinculado")}/>
          <div style={{height: '25px'}}>
            {errors?.item_vinculado?.type &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
          </div>
        </div>

        <div className='mb-2'>
          <div className='mb-2'>
            <p>Tipo de uso</p>
          </div>
          <div className='d-flex justify-content-between mb-4'>
            <div className="form-check  ">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" {...register("unico")} defaultChecked/>
              <QuestionTooltip label='Único' msg='O Qrcode so pode ser utilizado uma unica vez.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("diario")} />
              <QuestionTooltip label='Diário' msg='O Qrcode poderá ser utilizado uma vez por dia por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("semanal")} />
              <QuestionTooltip label='Semanal' msg='O Qrcode poderá ser semanalmente por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" {...register("mensal")} />
              <QuestionTooltip label='Mensal' msg='O Qrcode poderá ser utilizado uma vez por mes por cada usuário.' />
            </div>
          </div>
        </div>

        <div className='containerDouble d-flex'>
          <div className="mb-2 flex-grow-1">
            <QuestionTooltip label='Data inicial' msg='Define a data inicial do período em que o Qrcode estará disponível.' />
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicial")} />
            <div style={{height: '25px'}}>
              {errors?.data_inicio?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              } 
            </div>
          </div>
          <div className="mb-2 flex-grow-1">
            <QuestionTooltip label='Data final' msg='Define a data final do período em que o Qrcode estará disponível.' />
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_final")} />
            <div style={{height: '25px'}}>
              {errors?.data_fim?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
        </div>
        
        <div className="mb-2 flex-grow-1 containerDesc" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <input type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("descricao")} />
        </div>
      </div>

      {/* Second row */}
      <div className='containerBtns row mt-5'>
        <div className='col d-flex'>
          <button type="submit" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end'>
          <button type="submit" className="btn btnSalvar   btn-primary w-50">Salvar</button>
        </div>
      </div>

    </form>
  )
}

export default QrcodeVinculado