import React, { useState } from 'react'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { yupSchemaCadAdministrador } from 'utils/validation/schemas/relatorios/yupSchemaCadAdministrador'

// Modal Imports
import ModalService from 'common/modal/services/modalService'
import ModalSelecionarUnidade from 'common/preMadeModal/selects/modalSelecionarUnidade'

const AdministradoresForm = () => {
  const [status, setStatus] = useState()
  const [selectedUnidades, setSelectedUnidades] = useState([])
  const [checkSelectedUni, setCheckSelectedUni] = useState(false)
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadAdministrador)
  })

  // Modal select unidades
  const openModalSelectUnidade = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalSelecionarUnidade, {}, setSelectedUnidades)
  }

  const gerarRelatorio = async (dados) => {
    await verificaUnidade()
    if(!checkSelectedUni) return

    console.log(dados)
  }
  
  // We needed this custom verify func cause the react form cannot check the state on selectedUnidades and send to yup.
  const verificaUnidade = async () => {
    console.log(selectedUnidades.length)
    selectedUnidades.length > 0? await setCheckSelectedUni(false) : await setCheckSelectedUni(true)
  }

  return (
    <form className='container mt-5' onSubmit={handleSubmit(gerarRelatorio, verificaUnidade)}>
      <div className='row' style={{height: '42vh'}}>
        <div className='mb-2 col-6'>
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

        <div className='mb-2 col-6'>
          <QuestionTooltip label='Unidade' msg='Definir de quais unidades irão ser usadas para gerar o relatório.' />
          <input type="button" onClick={evt => openModalSelectUnidade(evt)} className="form-control" id="id_unidade" aria-describedby="emailHelp" value={selectedUnidades.length + ' unidade(s) selecionada(s)'}/>
          <div style={{height: '25px'}}>
          {checkSelectedUni &&
            <div className="form-text text-danger">Preencha o campo corretamente.</div>
          }
          </div>
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

export default AdministradoresForm