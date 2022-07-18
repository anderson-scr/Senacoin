import React from 'react'

const Teste = () => {
  return (
    <form className='container'>
    <div className='containerDouble d-flex'>

      <div className='mb-3 flex-grow-1'>
        <label htmlFor="dropArea" className="form-label">Selecione a unidade</label>
        <select className="form-select" id='dropArea' aria-label="Default select example" defaultValue={0}>
          <option value={0} disabled>Selecione</option>
          <option value={1}>Senac Hub Academy</option>
          <option value={2}>Senac Gastronomia</option>
          <option value={3}>Senac teste 1</option>
        </select>
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>
      <div className='mb-3 flex-grow-1'>
        <label htmlFor="dropSubcategoria" className="form-label">Cidade</label>
        <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={0}>
          <option value={0} disabled>Selecione</option>
          <option value={1}>Campo Grande </option>
          <option value={2}>Três Lagoas</option>
          <option value={3}>São Paulo</option>
        </select>
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>

    </div>
    <div className='containerDouble d-flex'>
      <div className="mb-3 flex-grow-1">
        <label htmlFor="exampleInputEmail1" className="form-label">Endereço</label>
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>
      <div className='mb-3 flex-grow-1'>
        <label htmlFor="dropSubcategoria" className="form-label">UF</label>
        <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={0}>
          <option value={0} disabled>Selecione</option>
          <option value={1}>MS</option>
          <option value={2}>SP</option>
          <option value={3}>Teste 1</option>
          <option value={3}>Teste 2</option>
        </select>
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>
    </div>

  




        <div className='containerDouble d-flex'>
      <div className="mb-3 flex-grow-1">
        <label htmlFor="exampleInputEmail1" className="form-label">Responsavel</label>
        <input type="text" className="form-control"  placeholder="Nome do responsalve da unidade" />
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>
      <div className='mb-3 flex-grow-1'>
        <label htmlFor="dropSubcategoria" className="form-label">Status</label>
        <select className="form-select" id='dropSubcategoria' aria-label="Default select example" defaultValue={0}>
          <option value={0} disabled>Selecione</option>
          <option value={1}>Ativa</option>
          <option value={2}>Inativa</option>
       
        </select>
        <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
      </div>
    </div>


    <div className="mb-3 flex-grow-1 col-3">
          <label htmlFor="exampleInputPassword1" className="form-label" >Telefone</label>
          <input type="text" className="form-control"  placeholder="(00)000-0000" />
          <div id="emailHelp" className="form-text">Este campo é obrigatório.</div>
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
    
export default Teste