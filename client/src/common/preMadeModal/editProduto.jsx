import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { verificaSessao } from 'auth/login/verificaSessao'
import { callSubcategoriaAPI } from 'api/common/callSubcategoria'
import QuestionTooltip from 'common/tooltips/questionTooltip'

// APIs
import { callUnidadeAPI } from 'api/common/callUnidades'
import { callProdutoAPI } from 'api/item/apiProduto'
import { callAreaAPI } from 'api/common/callArea'
import { callTodosItemsAPI } from 'api/item/apiTodos'

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
  } } = useForm();
  
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

  const atualizarItem = (dados) => {
    // Verify if the user has changed any off the options and save the original ID, or change to the new one
    dados.id_area === '777'? dados.id_area = produtosInfo.id_area._id : dados.id_unidade = [unidades[(parseInt(dados.id_unidade) - 1)]._id]
    dados.id_subcategoria === '777'? dados.id_subcategoria = produtosInfo.id_subcategoria._id : dados.id_area = areas[parseInt(dados.id_area) - 1]._id
    dados.id_unidade === '777'? dados.id_unidade = produtosInfo.id_unidade[0]._id : dados.id_subcategoria = subcategorias[parseInt(dados.id_subcategoria) - 1]._id
    
    // Saves the new file
    dados.imagem = produtosInfo.imagem
    const newFile = dados.imagem.length? new File([file], dados.imagem) : false
    
    callTodosItemsAPI.atualizarItem(produtosInfo._id, dados, newFile, 'produto')
  }
  
  const inativaItem = () => {
    callTodosItemsAPI.inativaItem(produtosInfo._id)
  }
  
  const ativaProduto = () => {
    let updateProdutoInfo = produtosInfo
    updateProdutoInfo.ativo = true
    callTodosItemsAPI.ativarItem(produtosInfo._id, updateProdutoInfo)
  }


  return (
    <Modal>
      <ModalHeader>
        <h2>
          Editar Item
        </h2>
      </ModalHeader>
      <ModalBody>
        <form className='container mt-3' onSubmit={handleSubmit(atualizarItem)} encType="multipart/form-data" style={{width: '60vw', textAlign: 'start'}}>
          <div className='row'>

            <div className='mb-3 col'>
              <QuestionTooltip label='Area' msg='Escolha a area do produto.' />
              {areas.length > 1 && produtosInfo &&
                <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue='777' {...register('id_area')}>
                  <option value="777" disabled style={{display: "none"}}>{produtosInfo.id_area.nome}</option>
                    {areas.map((area, idx) => {
                      return <option key={idx} value={idx + 1}>{area.nome}</option>
                    })}
                </select>
              }
              <div style={{height: '25px'}}>
                {errors?.id_area?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
            <div className='mb-3 col'>
              <QuestionTooltip label='Subcategoria' msg='Escolha a subcatgoria do produto.' />
              {subcategorias.length > 1 && produtosInfo &&
                <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue='777' {...register('id_subcategoria')}>
                  <option value="777" disabled style={{display: "none"}}>{produtosInfo.id_subcategoria.nome}</option>
                    {subcategorias.map((subcategoria, idx) => {
                      return <option key={idx} value={idx + 1}>{subcategoria.nome}</option>
                    })}
                </select>
              }
              <div style={{height: '25px'}}>
                {errors?.id_subcategoria?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          <div className='row'>
            <div className="mb-3 col">
              <label htmlFor="nome_item" className="form-label">Titulo</label>
              {produtosInfo &&
                <input type="text" className="form-control" id="nome_item" defaultValue={produtosInfo.nome} aria-describedby="Titulo do item" {...register('nome')}/>
              }
              {errors?.nome?.type &&
                <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
              }
            </div>
            <div className='mb-3 col'>
              <QuestionTooltip label='Unidade' msg='Escolha a unidade do produto.' />
              {unidades.length > 1 && produtosInfo &&
                <select className="form-select" id='dropUnidade' aria-label="dropDown de unidades" defaultValue='777' {...register('id_unidade')}>
                  <option value="777" disabled style={{display: "none"}}>{produtosInfo.id_unidade[0].nome}</option>
                    {unidades.map((unidade, idx) => {
                      return <option key={idx} value={idx + 1}>{unidade.nome}</option>
                    })}
                </select>
              }
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
              {produtosInfo &&
                <input type="number" className="form-control" id="Senacoins" defaultValue={produtosInfo.pontos} placeholder="100" {...register('pontos')}/>
              }
              <div style={{height: '25px'}}>
                {errors?.pontos?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>

            </div>
            <div className="mb-3 col">
              <QuestionTooltip label='Quantidade' msg='Quantidade do produto disponível em estoque.' />
              {produtosInfo &&
                <input type="number" className="form-control" id="exampleInputPassword1" defaultValue={produtosInfo.quantidade} placeholder="10" {...register('quantidade')}/>
              }
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
              {produtosInfo &&
                <textarea type="text" defaultValue={produtosInfo.descricao} className="iptDescricao form-control" id="exampleInputEmail1" style={{height: '120px'}} {...register('descricao')} />
              }
            </div>
            <div className="mb-3 col-4">
              <label htmlFor="formFile" className="form-label">Imagem</label>
              <input className="form-control" type="file" id="formFile" onChangeCapture={evt => setFile(evt.target.files[0])} {...register('imagem')} />
            </div>
          </div>

          <div className='row mx-auto mt-5'>
            {produtosInfo.ativo &&
              <div className='col d-flex p-0 justify-content-start p-0'>
                <button type="button" onClick={inativaItem} className="btn btn-outline-danger w-50" >Inativar Usuario</button>
              </div>
            }
            {!produtosInfo.ativo &&
              <div className='col d-flex p-0 justify-content-start p-0'>
                <button type="button" onClick={ativaProduto} className="btn btn-outline-success w-50" >Ativar Usuário</button>
              </div>
            }
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