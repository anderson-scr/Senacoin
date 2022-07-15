import React from 'react'

const QrcodeLivre = () => {

  return (
    <form className='form container'>

      {/* First row */}
      <div className='col'>
        <div className="mb-2">
          <label htmlFor="iptNome" className="form-label">Titulo</label>
          <input type="text" className="form-control" id="iptNome" />
          <div id="iptNomeNeeded" className="textObrigatorio form-text">Campo obrigatório.</div>
        </div>
        <div className="mb-2">
          <label htmlFor="iptNome" className="form-label">Senacoins</label>
          <input type="text" className="form-control" id="iptNome" />
          <div id="iptNomeNeeded" className="textObrigatorio form-text">Campo obrigatório.</div>
        </div>

        <div className='mb-2'>
          <div className='mb-2'>
            <p>Tipo de uso</p>
          </div>
          <div className='d-flex justify-content-between mb-2'>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Uso único
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Uso diário
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Uso semanal
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Uso ilimitado
              </label>
            </div>
          </div>
          <div id="emailHelp" className="textObrigatorio form-text">Campo obrigatório.</div>
        </div>

        <div className='containerDouble d-flex'>
          <div className="mb-2 flex-grow-1">
            <label htmlFor="exampleInputPassword1" className="form-label" >Data inicial</label>
            <input type="date" className="form-control" id="exampleInputPassword1" />
            <div id="emailHelp" className="textObrigatorio form-text">Campo obrigatório.</div>
          </div>
          <div className="mb-2 flex-grow-1">
            <label htmlFor="exampleInputPassword1" className="form-label" >Data final</label>
            <input type="date" className="form-control" id="exampleInputPassword1" />
            <div id="emailHelp" className="textObrigatorio form-text">Campo obrigatório.</div>
          </div>
        </div>
        
        <div className="mb-2 flex-grow-1 containerDesc" >
          <label htmlFor="exampleInputEmail1" className="form-label">Descrição</label>
          <input type="text" className="iptDescricao form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
      </div>

      {/* Second row */}
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

export default QrcodeLivre