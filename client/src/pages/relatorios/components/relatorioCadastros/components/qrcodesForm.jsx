import React, { useState } from 'react'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { yupSchemaCadPromocao } from 'utils/validation/schemas/relatorios/yupSchemaCadPromocao'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const QrcodesForm = () => {
  const [status, setStatus] = useState()
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadPromocao)
  })

  const gerarRelatorio = (dados) => {
    console.log(dados)
  }

  
  return (
    <form className='container mt-5' onSubmit={handleSubmit(gerarRelatorio)}>
      <div  style={{height: '42vh'}}>
        <div className='row'>
          <div className='col-6'>
            <QuestionTooltip label='Status' msg='Definir se o relatório sera de usuários com status de ativo ou inativo.' />
            <select className="form-select" id='status' aria-label="Dropdown de relatórios" onChangeCapture={evt => setStatus(evt.target.value)} defaultValue="DEFAULT" {...register('status')}>
              <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um status</option>
              <option value="0">Inativo</option>
              <option value="1">Ativo</option>
              <option value="3">Todos</option>
            </select>
            <div style={{height: '25px'}}>
              {errors?.status?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
          <div className="col-6">
            <QuestionTooltip label='Tipo de uso' msg='Definir os tipos de usos de Qrcodes a serem emitidos no relatório.' />
            <select className="form-select" id='status' aria-label="Dropdown de relatórios" onChangeCapture={evt => setStatus(evt.target.value)} defaultValue="DEFAULT" {...register('status')}>
              <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um status</option>
              <option value="0">Unico</option>
              <option value="1">Diaro</option>
              <option value="2">Semanal</option>
              <option value="3">Mensal</option>
              <option value="4">Todos</option>
            </select>
            <div style={{height: '25px'}}>
              {errors?.status?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="mb-3 col-6">
            <QuestionTooltip label='Data inicial' msg='Define a data inicial do período em que o relatório ira buscar pelos eventos.' />
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicio")} />
            <div style={{height: '25px'}}>
              {errors?.data_inicio?.type &&
                <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
          <div className="mb-3 col-6">
            <QuestionTooltip label='Data final' msg='Define a data final do período em que o relatório ira buscar pelos eventos.' />
            <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_fim")} />
            <div style={{height: '25px'}}>
              {errors?.data_fim?.type &&
                <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
        </div>
      </div>


      <div className='row'>
        <div className='row mx-auto mt-5'>
          <div className='col d-flex justify-content-end p-0'>
            <button type="submit" className="btn btnSalvar btn-primary w-25 mx-3">Gerar XLS</button>
            <button type="submit" className="btn btnSalvar btn-primary w-25">Gerar PDF</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default QrcodesForm