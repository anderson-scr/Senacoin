import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'
import QuestionTooltip from 'common/tooltips/questionTooltip'

// Table
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form"
import { yupSchemaCadQrcodeVinculado } from 'utils/validation/schemas/qrcode/vinculado'

// Modal
import ModalSelecionarItem from 'common/preMadeModal/selects/modalSelecionaItem'
import ModalService from 'common/modal/services/modalService'

// API
import { callQrcodeAPI } from 'api/qrcode/apiQrcode'

const QrcodeVinculado = () => {
  const navigate = useNavigate()
  const effectOnce = useRef(true)
  const [itemsVinculados, setItemsVinculados] = useState([])
  const [checkSelectedItem, setCheckSelectedItem] = useState(false)
  const radioUnico = useRef()
  const radioDiario = useRef()
  const radioSemanal = useRef()
  const radioMensal = useRef()

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
    ModalService.open(ModalSelecionarItem, {}, setItemsVinculados, 0)
  }

  function cadastrarQrcodeVinculado(qrcodeData) {
    verifySelectedItems()
    if(!checkSelectedItem) {
      qrcodeData.item_vinculado = itemsVinculados
      qrcodeData.unico = radioUnico.current.checked
      qrcodeData.diario = radioDiario.current.checked
      qrcodeData.semanal = radioSemanal.current.checked
      qrcodeData.mensal = radioMensal.current.checked
      console.log(qrcodeData)
      // callQrcodeAPI.novo(qrcodeData)
    }
  }
    // We needed this custom verify func cause the react form cannot check the state on selectedUnidades and send to yup.
    const verifySelectedItems = () => {
      itemsVinculados.length > 0? setCheckSelectedItem(false) : setCheckSelectedItem(true)
    }

  return (
    <form className='form container' onSubmit={handleSubmit(cadastrarQrcodeVinculado, verifySelectedItems)}>
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
          <input type="button" value={`${itemsVinculados.length} item(s) selecionado(s)`} onClick={evt => abrirModal(evt)} className="form-control" id="iptNome" {...register("item_vinculado")}/>
          <div style={{height: '25px'}}>
            {checkSelectedItem &&
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
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" ref={radioUnico} defaultChecked/>
              <QuestionTooltip label='Único' msg='O Qrcode so pode ser utilizado uma unica vez.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" ref={radioDiario} />
              <QuestionTooltip label='Diário' msg='O Qrcode poderá ser utilizado uma vez por dia por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" ref={radioSemanal} />
              <QuestionTooltip label='Semanal' msg='O Qrcode poderá ser semanalmente por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" ref={radioMensal} />
              <QuestionTooltip label='Mensal' msg='O Qrcode poderá ser utilizado uma vez por mes por cada usuário.' />
            </div>
          </div>
        </div>

        <div className='containerDouble d-flex'>
          <div className="mb-2 flex-grow-1">
            <QuestionTooltip label='Data inicial' msg='Define a data inicial do período em que o Qrcode estará disponível.' />
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicio")} />
            <div style={{height: '25px'}}>
              {errors?.data_inicio?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              } 
            </div>
          </div>
          <div className="mb-2 flex-grow-1">
            <QuestionTooltip label='Data final' msg='Define a data final do período em que o Qrcode estará disponível.' />
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
          <textarea type="text" className="iptDescricao form-control" id="exampleInputEmail1" style={{height: '120px'}} aria-describedby="emailHelp" {...register("descricao")} />
        </div>
      </div>

      {/* Second row */}
      <div className='containerBtns row mt-5'>
        <div className='col d-flex justify-content-end'>
          <button type="submit" className="btn btnSalvar btn-primary w-25">Salvar</button>
        </div>
      </div>

    </form>
  )
}

export default QrcodeVinculado