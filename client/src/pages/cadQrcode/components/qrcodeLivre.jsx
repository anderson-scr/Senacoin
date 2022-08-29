import React, {useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { yupSchemaCadQrcodeLivre } from 'utils/validation/schemas/qrcode/livre'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { callQrcodeAPI } from 'api/qrcode/apiQrcode'

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


  function cadastrarQrcodeLivre(qrcodeData) {
    console.log(qrcodeData)
    // callQrcodeAPI.novo(qrcodeData)
  }

  return (
    <form className='form container' onSubmit={handleSubmit(cadastrarQrcodeLivre)}>

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

        <div className='mb-4'>
          <div className='mb-2'>
            <p>Tipo de uso</p>
          </div>
          <div className='d-flex justify-content-between mb-2'>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="defaultRadio" id='radio1' defaultChecked {...register("unico")} />
              <QuestionTooltip label='Único' msg='O Qrcode so pode ser utilizado uma unica vez.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="defaultRadio" id='radio2' {...register("diario")} />
              <QuestionTooltip label='Diário' msg='O Qrcode poderá ser utilizado uma vez por dia por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="defaultRadio" id='radio3' {...register("semanal")} />
              <QuestionTooltip label='Semanal' msg='O Qrcode poderá ser semanalmente por cada usuário.' />
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="defaultRadio" id='radio4' {...register("mensal")} />
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

export default QrcodeLivre