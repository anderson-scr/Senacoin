import React from 'react'
<<<<<<< HEAD
import './cadProdutoStyle.css'

const CadProduto = () => {
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

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Titulo</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Este campo e obrigatório.</div>
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
=======

const CadProduto = () => {
  return (
    <form>
      <div>
        <select className="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
        <select className="form-select" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
>>>>>>> origin/Diego
    </form>
  )
}

export default CadProduto