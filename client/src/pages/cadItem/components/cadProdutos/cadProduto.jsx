import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaCadProduto } from 'utils/validation/schemas/itens/cadProduto';
import { callUnidadeAPI } from 'api/common/callUnidades';
import { verificaSessao } from 'auth/login/verificaSessao';
import { callAreaAPI } from 'api/common/callArea';
import { callSubcategoriaAPI } from 'api/common/callSubcategoria';
import { callProdutoAPI } from 'api/item/apiProduto';
import './cadProdutoStyle.css'


const CadProduto = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [unidades, setUnidades] = useState([])
  const [areas, setAreas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])

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
        setUnidades(await callUnidadeAPI.ativo())
        setAreas(await callAreaAPI.ativo())
        setSubcategorias(await callSubcategoriaAPI.ativo())
      })()

      return () => effectOnce.current = false
    }
  }, [navigate])

  const certo = (dados) => {
    dados.id_unidade = unidades[(parseInt(dados.id_unidade) - 1)]._id
    dados.id_area = areas[parseInt(dados.id_area) - 1].id_unidade[0]
    // console.log(areas)
    // console.log(subcategorias)
    // console.log(unidades)
    dados.id_subcategoria = subcategorias[parseInt(dados.id_subcategoria) - 1]._id

    console.log(dados)
    // callProdutoAPI.novo(dados)
  }
  const errado = (dados) => {
    console.log(dados)
  }

  return (
    <form className='container' onSubmit={handleSubmit(certo, errado)}>
      <div className='containerDouble d-flex'>

        <div className='mb-3 col'>
          <label htmlFor="dropArea" className="form-label">Area</label>
          <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue="DEFAULT" {...register('id_area')}>
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
          <label htmlFor="dropSubcategoria" className="form-label">Subcategoria</label>
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register('id_subcategoria')}>
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

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('nome')}/>
          {errors?.nome?.type &&
            <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
          }
        </div>
        <div className='mb-3 flex-grow-1'>
          <label htmlFor="dropSubcategoria" className="form-label">Unidade</label>
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue="DEFAULT" {...register('id_unidade')}>
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

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Senacoins</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="100" {...register('pontos')}/>
          <div style={{height: '25px'}}>
            {errors?.pontos?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>

        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Quantidade</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="300" {...register('quantidade')}/>
          <div style={{height: '25px'}}>
            {errors?.quantidade?.type &&
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            }
          </div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <textarea type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" {...register('descricao')} />
        </div>
        <div className="mb-3 ">
          <label htmlFor="formFile" className="form-label">Imagem</label>
          <input className="form-control" type="file" id="formFile" />
        </div>
      </div>

      <div className='containerBtns row mt-5'>
        <div className='col d-flex'>
          <button type="submit" className="btn btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end'>
          <button type="submit" className="btn btn-primary w-50">Salvar</button>
        </div>
      </div>
    </form>
  )
}

export default CadProduto