import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'

const CadPromocao = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
  
      return () => effectOnce.current = false
    }
  }, [])

  
  return (
    <form className='container'>

      <div className='containerDouble d-flex'>
        <div className='mb-3 col-8'>
          <label htmlFor="dropArea" className="form-label">Item vinculado a promoção</label>
          <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue={0}>
            <option value={0} disabled>Selecione</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
          </select>
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputEmail1" className="form-label">Desconto Senacoin</label>
          <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='200 Senacoins' />
          <div id="emailHelp" className="form-text">1800 Senacoins (Valor original: 2000 Senacoins)</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Titulo promoção</label>
          <input type="text" className="form-control" id="exampleInputPassword1" placeholder="100" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Quantidade</label>
          <input type="number" className="form-control" id="exampleInputPassword1" placeholder="300" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Data inicial</label>
          <input type="date" className="form-control" id="exampleInputPassword1" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
        <div className="mb-3 flex-grow-1">
          <label htmlFor="exampleInputPassword1" className="form-label" >Data final</label>
          <input type="date" className="form-control" id="exampleInputPassword1" />
          <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
        </div>
      </div>

      <div className='containerDouble d-flex'>
        <div className="mb-3 flex-grow-1" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <input type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 ">
          <label htmlFor="formFile" className="form-label">Imagem da promoção</label> 
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

export default CadPromocao