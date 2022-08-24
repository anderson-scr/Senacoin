import React from 'react'

const RelatorioTransacoes = () => {
  return (
    <section className='container'>
      <form>
        <div className='col'>
          <div className="mb-2">
            <label htmlFor="iptNome" className="form-label">Nome</label>
            <input type="text" className="form-control" id="nome"/>
            <div style={{height: '25px'}}>
              <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
            </div>
          </div>

          <div className="mb-2">
            <label htmlFor="iptSobrenome" className="form-label">Sobrenome</label>
            <input type="text" className="form-control" id="sobrenome" />
            <div style={{height: '25px'}}>
              <div className="form-text text-danger">Preencha o campo corretamente.</div>  
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default RelatorioTransacoes