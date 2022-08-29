import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { yupSchemaCadProduto } from 'utils/validation/schemas/itens/cadProduto'
import { verificaSessao } from 'auth/login/verificaSessao'
import { callSubcategoriaAPI } from 'api/common/callSubcategoria'
import setImageName from 'utils/setImageName'
import QuestionTooltip from 'common/tooltips/questionTooltip'

// APIs
import { callUnidadeAPI } from 'api/common/callUnidades'
import { callProdutoAPI } from 'api/item/apiProduto'
import { callAreaAPI } from 'api/common/callArea'

// Modal Imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"

const ModalEditProduto = (props) => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [unidades, setUnidades] = useState([])
  const [areas, setAreas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [file, setFile] = useState()
  const [produtosInfo, setProdutosInfo] = useState(false)

  // React for with Yup for validation and saving the user entry
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadProduto)
  });
  
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Fill dropDows unidades
      (async () => {
        await setUnidades(await callUnidadeAPI.ativo())
        await setAreas(await callAreaAPI.ativo())
        await setSubcategorias(await callSubcategoriaAPI.ativo())
        await setProdutosInfo(await callProdutoAPI.buscaProduto(props.funcs._id))
      })()

      return () => effectOnce.current = false
    }
  }, [navigate])

  // useEffect(() => {
  //   console.log(produtosInfo)
  //   console.log(areas)
  // }, [produtosInfo])

  const setDropDownValueUnidade = () => {
    if(unidades.length === 0 || !produtosInfo) return

    unidades.forEach((unidade, idx) => {
      if (unidade._id === produtosInfo.id_unidade[0]._id) return (idx + 1).toString()
    })
  }
  const setDropDownValueArea = () => {
    if(areas.length === 0 || !produtosInfo) return

    areas.forEach((area, idx) => {
      if (area._id === produtosInfo.id_area._id) {
        return (idx + 1).toString()
      }
    })
  }
  const setDropDownValueSubcategorias = () => {
    if(subcategorias.length === 0 || !produtosInfo) return

    subcategorias.forEach((subcategoria, idx) => {
      if (subcategoria._id === produtosInfo.id_subcategoria._id) {
        return (idx + 1).toString()
      } 
    })
  }

  const submitForm = (dados) => {
    // Set the ids from each item in dados
    dados.id_unidade = [unidades[(parseInt(dados.id_unidade) - 1)]._id]
    dados.id_area = areas[parseInt(dados.id_area) - 1].id_unidade[0]
    dados.id_subcategoria = subcategorias[parseInt(dados.id_subcategoria) - 1]._id
    dados.id_categoria = '62d017a1181c3910ccfd43d1'

    // Change the file name to a unique name.
    const fileName = setImageName(file.name)
    const newFile = new File([file], fileName)
    
    // Save the file name to send to item route
    dados.imagem = fileName

    callProdutoAPI.novo(dados, newFile)
  }


  return (
    <Modal>
      <ModalHeader>
        <h2>
          Editar Produto
        </h2>
      </ModalHeader>
      <ModalBody>
        <form className='container mt-3' onSubmit={handleSubmit(submitForm)} encType="multipart/form-data" style={{width: '60vw', textAlign: 'start'}}>
          <div className='row'>

            <div className='mb-3 col'>
              <QuestionTooltip label='Area' msg='Escolha a area do produto.' />
              <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue={setDropDownValueArea()} {...register('id_area')}>
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
            <div className='mb-3 col'>
              <QuestionTooltip label='Subcategoria' msg='Escolha a subcatgoria do produto.' />
              <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={setDropDownValueSubcategorias} {...register('id_subcategoria')}>
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
          </div>

          <div className='row'>
            <div className="mb-3 col">
              <label htmlFor="exampleInputEmail1" className="form-label">Titulo</label>
              <input type="text" className="form-control" id="exampleInputEmail1" defaultValue={produtosInfo.nome} aria-describedby="emailHelp" {...register('nome')}/>
              {errors?.nome?.type &&
                <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
              }
            </div>
            <div className='mb-3 col'>
              <QuestionTooltip label='Unidade' msg='Escolha a unidade do produto.' />
              <select className="form-select" id='dropUnidade' aria-label="dropDown de unidades" defaultValue={setDropDownValueUnidade} {...register('id_unidade')}>
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
            <div className="mb-3 col">
              <QuestionTooltip label='Senacoins' msg='Quantos Senacoins um produto vai custar.' />
              <input type="number" className="form-control" id="exampleInputPassword1" defaultValue={produtosInfo.pontos} placeholder="100" {...register('pontos')}/>
              <div style={{height: '25px'}}>
                {errors?.pontos?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>

            </div>
            <div className="mb-3 col">
              <QuestionTooltip label='Quantidade' msg='Quantidade do produto disponível em estoque.' />
              <input type="number" className="form-control" id="exampleInputPassword1" defaultValue={produtosInfo.quantidade} placeholder="300" {...register('quantidade')}/>
              <div style={{height: '25px'}}>
                {errors?.quantidade?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="mb-3 col" >
              <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
              <textarea type="text" defaultValue={produtosInfo.descricao} className="iptDescricao form-control" id="exampleInputEmail1" style={{height: '120px'}} {...register('descricao')} />
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="formFile" className="form-label">Imagem</label>
              <input className="form-control" type="file" id="formFile" onChangeCapture={evt => setFile(evt.target.files[0])} {...register('imagem')} />
            </div>
          </div>

          <div className='row mx-auto mt-5'>
            {/* <div className='col d-flex p-0 justify-content-start p-0'>
              <button type="button" className="btn btn-outline-danger w-50" >Inativar Usuario</button>
            </div> */}
            <div className='col d-flex p-0 justify-content-start p-0'>
              <button type="button" className="btn btn-outline-success w-50" >Ativar Usuário</button>
            </div>
            <div className='col d-flex p-0 justify-content-end'>
              <button type="button" onClick={ props.close } className="btn btnCancelar btn-outline-secondary w-75">Cancelar</button>
            </div>
            <div className='col d-flex justify-content-end p-0'>
              <button type="submit" className="btn btnSalvar btn-primary w-75">Salvar</button>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ModalEditProduto