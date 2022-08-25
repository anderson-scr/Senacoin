import React, { useState } from 'react'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { yupSchemaCadAdministrador } from 'utils/validation/schemas/relatorios/yupSchemaCadAdministrador'

// Modal Imports
import ModalService from 'common/modal/services/modalService'
import ModalSelecionarUnidade from 'common/preMadeModal/selects/modalSelecionarUnidade'
import ModalSelecionarArea from 'common/preMadeModal/selects/modalSelecionarArea'
import ModalSelecionarSubcategoria from 'common/preMadeModal/selects/modalSelecionarSubcategoria'

const ProdutosForm = () => {
  const [status, setStatus] = useState()
  const [selectedUnidades, setSelectedUnidades] = useState([])
  const [selectedAreas, setSelectedAreas] = useState([])
  const [selectedSubcategorias, setSelectedSubcategorias] = useState([])
  const [checkSelectedUni, setCheckSelectedUni] = useState(false)
  const [checkSelectedAre, setCheckSelectedAre] = useState(false)
  const [checkSelectedSub, setCheckSelectedSub] = useState(false)
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
  const openModalSelectArea = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalSelecionarArea, {}, setSelectedAreas)
  }
  const openModalSelectSubcategoria = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalSelecionarSubcategoria, {}, setSelectedSubcategorias)
  }

  const gerarRelatorio = async (dados) => {
    await verificaUnidade()
    if(!checkSelectedUni) return

    console.log(dados)
  }
  
  // We needed this custom verify func cause the react form cannot check the state on selectedUnidades and send to yup.
  const verificaUnidade = async () => {
    selectedUnidades.length > 0? await setCheckSelectedUni(false) : await setCheckSelectedUni(true)
    selectedAreas.length > 0? await setCheckSelectedAre(false) : await setCheckSelectedAre(true)
    selectedSubcategorias.length > 0? await setCheckSelectedSub(false) : await setCheckSelectedSub(true)
  }

  
  return (
    <form className='container mt-5' onSubmit={handleSubmit(gerarRelatorio, verificaUnidade)}>
      <div style={{height: '42vh'}}>
        <div className='row'>
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
            <QuestionTooltip label='Unidade' msg='Definir quais unidades irão ser utilizadas para gerar o relatório.' />
            <input type="button" onClick={evt => openModalSelectUnidade(evt)} className="form-control" id="id_unidade" aria-describedby="emailHelp" value={selectedUnidades.length + ' unidade(s) selecionada(s)'}/>
            <div style={{height: '25px'}}>
            {checkSelectedUni &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='mb-2 col-6'>
            <QuestionTooltip label='Area' msg='Definir quais areas irão ser utilizadas para gerar o relatório.' />
            <input type="button" onClick={evt => openModalSelectArea(evt)} className="form-control" id="id_unidade" aria-describedby="emailHelp" value={selectedAreas.length + ' unidade(s) selecionada(s)'}/>
            <div style={{height: '25px'}}>
            {checkSelectedAre &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
            </div>
          </div>

          <div className='mb-2 col-6'>
            <QuestionTooltip label='Subcategoria' msg='Definir quais subcategorias irão ser utilizadas para gerar o relatório.' />
            <input type="button" onClick={evt => openModalSelectSubcategoria(evt)} className="form-control" id="id_unidade" aria-describedby="emailHelp" value={selectedSubcategorias.length + ' unidade(s) selecionada(s)'}/>
            <div style={{height: '25px'}}>
            {checkSelectedSub &&
              <div className="form-text text-danger">Preencha o campo corretamente.</div>
            }
            </div>
          </div>
        </div>
      </div>

      <div className='row mx-auto mt-5'>
        <div className='col d-flex p-0'>
          <button type="button" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end p-0'>
          <button type="submit" className="btn btnSalvar btn-primary w-50 mx-3">Gerar XLS</button>
          <button type="submit" className="btn btnSalvar btn-primary w-50">Gerar PDF</button>
        </div>
      </div>
    </form>
  )
}

export default ProdutosForm