import React, {useState, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { yupSchemaCadProduto } from 'utils/validation/schemas/itens/cadProduto';
import { callUnidadeAPI } from 'api/common/callUnidades';
import { verificaSessao } from 'auth/login/verificaSessao';
import './cadProdutoStyle.css'


const CadProduto = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()
  const [unidades, setUnidades] = useState([])
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
      })()

      return () => effectOnce.current = false
    }
  }, [navigate])


  return (
    <form className='container'>
      <div className='containerDouble d-flex'>

        <div className='mb-3 flex-grow-1'>
          <label htmlFor="dropArea" className="form-label">Area</label>
          <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue={0}>
            <option value={0} disabled>Selecione</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className='mb-3 flex-grow-1'>
          <label htmlFor="dropSubcategoria" className="form-label">Subcategoria</label>
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={0}>
            <option value={0} disabled>Selecione</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Titulo</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className='mb-3 flex-grow-1'>
          <label htmlFor="dropSubcategoria" className="form-label">Unidade</label>
          <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={0}>
            <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma unidade.</option>
            {unidades.length > 1 &&
              unidades.map((unidade, idx) => {
                return <option key={idx} value={idx + 1}>{unidade.nome}</option>
              })
            }
          </select>
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Senacoins</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="100" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Quantidade</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="300" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <input type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 ">
          <label htmlFor="formFile" className="form-label">Default file input example</label>
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