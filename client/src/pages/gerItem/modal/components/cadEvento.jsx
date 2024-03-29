import React, { useState, useEffect, useRef } from 'react'
import { callEventoAPI } from 'api/item/apiEvento'
import { yupSchemaCadServico } from 'utils/validation/schemas/itens/cadServico'
import { useNavigate } from 'react-router-dom'
import { callUnidadeAPI } from 'api/common/callUnidades'
import { verificaSessao } from 'auth/login/verificaSessao'
import { callAreaAPI } from 'api/common/callArea'
import { callSubcategoriaAPI } from 'api/common/callSubcategoria'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import QuestionTooltip from 'common/tooltips/questionTooltip'
import AddTooltip from 'common/tooltips/addTooltip'


// Modal Imports
import ModalService from 'common/modal/services/modalService'
import ModalCadArea from 'common/preMadeModal/cadArea'
import ModalCadSubcategoria from 'common/preMadeModal/cadSubcategoria'
import ModalCadUnidade from 'common/preMadeModal/cadUnidade'

const CadEvento = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [areas, setAreas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [unidades, setUnidades] = useState([])

  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadServico)
  });

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Fill dropDows unidades
      (async () => {
        setUnidades(await callUnidadeAPI.ativo())
        setAreas(await callAreaAPI.ativo())
        setSubcategorias(await callSubcategoriaAPI.ativo())
      })()

      return () => effectOnce.current = false
    }
  }, [navigate])


  // Modal funcs
  const modalCadArea = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalCadArea)
  }
  const modalCadSubcategoria = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalCadSubcategoria)
  }
  const modalCadUnidade = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalCadUnidade)
  }


  const certo = (dados) => {
    dados.id_unidade = unidades[(parseInt(dados.id_unidade) - 1)]._id
    dados.id_area = areas[parseInt(dados.id_area) - 1].id_unidade[0]
    dados.id_subcategoria = subcategorias[parseInt(dados.id_subcategoria) - 1]._id

    callEventoAPI.novo(dados)
  }
  const ruim = (dados) => {
    console.log(dados)
    console.log("deu ruim")
  }
  
  
  return (
    <form className='container mx-auto mt-3' onSubmit={handleSubmit(certo, ruim)} encType="multipart/form-data">
      <div className='row'>

        <div className='mb-3 col-4'>
          <AddTooltip label='Areas' onClickFunc={modalCadArea} msg='Criar uma nova area para cadastros.' />
          <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_area")}>
            <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma area</option>
            {areas.length > 1 &&
              areas.map((area, idx) => {
                return <option key={idx} value={idx + 1}>{area.nome}</option>
              })
            }
          </select>
          <div style={{height: '25px'}}>
            {errors?.id_area?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className='mb-3 col-4 '>
          <AddTooltip label='Subcategoria' onClickFunc={modalCadSubcategoria} msg='Criar nova subcategoria para cadastros.' /> 
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_subcategoria")}>
            <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma subcategoria</option>
            {subcategorias.length > 1 &&
              subcategorias.map((subcategoria, idx) => {
                return <option key={idx} value={idx + 1}>{subcategoria.nome}</option>
              })
            }
          </select>
          <div style={{height: '25px'}}>
            {errors?.id_subcategoria?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className='mb-3 col-4 '>
          <AddTooltip label='Unidade' onClickFunc={modalCadUnidade} msg='Criar uma nova unidade para cadastros.' />
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register("id_unidade")}>
            <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma unidade</option>
            {unidades.length > 1 &&
              unidades.map((unidade, idx) => {
                return <option key={idx} value={idx + 1}>{unidade.nome}</option>
              })
            }
          </select>
          <div style={{height: '25px'}}>
            {errors?.id_unidade?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInputEmail1" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("nome")} />
          <div style={{height: '25px'}}>
            {errors?.nome?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-3 col-6">
          <QuestionTooltip label='Senacoins' msg='Quantidade do produto disponível em estoque.' />
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("pontos")} />
          <div style={{height: '25px'}}>
            {errors?.pontos?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 col-6">
          <QuestionTooltip label='Data inicial' msg='Define a data inicial do período em que o serviço estará disponível.' />
          <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_inicio")} />
          <div style={{height: '25px'}}>
            {errors?.data_inicio?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
        <div className="mb-3 col-6">
          <QuestionTooltip label='Data final' msg='Define a data final do período em que o serviço estará disponível.' />
          <input type="date" className="form-control" id="exampleInputPassword1" {...register("data_fim")} />
          <div style={{height: '25px'}}>
            {errors?.data_fim?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="mb-3 col-6" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <textarea type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register("descricao")} />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="formFile" className="form-label">Default file input example</label>
          <input className="form-control" type="file" id="formFile" {...register("imagem")} />
        </div>
      </div>

      <div className='containerBtns row mt-5'>
        <div className='col d-flex'>
          <button type="submit" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end'>
          <button type="submit" className="btn btnSalvar btn-primary w-50">Salvar</button>
        </div>
      </div>
    </form>
  )
}

export default CadEvento