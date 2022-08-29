import React, { useState } from 'react'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { yupSchemaCadAdministrador } from 'utils/validation/schemas/relatorios/yupSchemaCadAdministrador'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const AlunosForm = () => {
  const [status, setStatus] = useState()
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadAdministrador)
  })


  const gerarRelatorio = (dados) => {
    console.log(dados)
  }

  return (
    <form className='container mt-5' onSubmit={handleSubmit(gerarRelatorio)}>
      <div className='mb-2' style={{height: '42vh'}}>
        <QuestionTooltip label='Status' msg='Definir se o relatório sera de usuários com status de ativo ou inativo.' />
        <select className="form-select" id='status' aria-label="Dropdown de relatórios" onChangeCapture={evt => setStatus(evt.target.value)} defaultValue="DEFAULT" {...register('status')}>
          <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um status</option>
          <option value="0">Inativo</option>
          <option value="1">Ativo</option>
        </select>
        <div style={{height: '25px'}}>
          {errors?.status?.type &&
            <div className="form-text text-danger">Preencha o campo corretamente.</div>
          }
        </div>
      </div>
      <div className='row mx-auto mt-5'>
        <div className='col d-flex justify-content-end p-0'>
          <button type="submit" className="btn btnSalvar btn-primary w-25 mx-3">Gerar XLS</button>
          <button type="submit" className="btn btnSalvar btn-primary w-25">Gerar PDF</button>
        </div>
      </div>
    </form>
  )
}

export default AlunosForm