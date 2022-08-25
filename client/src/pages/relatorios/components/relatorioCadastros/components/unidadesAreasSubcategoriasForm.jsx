import React, { useState } from 'react'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { yupSchemaCadAreaSubUni } from 'utils/validation/schemas/relatorios/yupScremaCadAreaSubUni'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

const UnidadesAreasSubcategoriasForm = () => {
  const [status, setStatus] = useState()
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadAreaSubUni)
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
            <QuestionTooltip label='Tipo' msg='Definir os tipos a serem emitidos no relatório.' />
            <select className="form-select" id='status' aria-label="Dropdown de relatórios" onChangeCapture={evt => setStatus(evt.target.value)} defaultValue="DEFAULT" {...register('tipo')}>
              <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um tipo</option>
              <option value="0">Unidades</option>
              <option value="1">Areas</option>
              <option value="2">Subcategorias</option>
              <option value="3">Todos</option>
            </select>
            <div style={{height: '25px'}}>
              {errors?.tipo?.type &&
                <div className="form-text text-danger">Preencha o campo corretamente.</div>
              }
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='row mx-auto mt-5'>
          <div className='col d-flex p-0'>
            <button type="button" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
          </div>
          <div className='col d-flex justify-content-end p-0'>
            <button type="submit" className="btn btnSalvar btn-primary w-50 mx-3">Gerar XLS</button>
            <button type="submit" className="btn btnSalvar btn-primary w-50">Gerar PDF</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default UnidadesAreasSubcategoriasForm