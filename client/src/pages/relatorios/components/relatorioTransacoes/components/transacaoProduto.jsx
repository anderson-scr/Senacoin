import React, { useEffect, useRef, useState } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import Table from 'common/table/tableIndex'
import { callProdutoAPI } from 'api/item/apiProduto'
import { transacaoProdutoTableSchema } from 'common/table/schemas/transacaoProduto'

const TransacaoProduto = () => {
  const [selectedAdm, setSelectedAdm] = useState([])
  const effectOnce = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Verifica sessao do usuario
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
  
      return () => effectOnce.current = false
    }
  }, [navigate])


  return (
    <div>
      <Table apiRoute={callProdutoAPI.todos} editColumn={true} unidade={false} resizeContainer={true} setCurrentState={{funcs: setSelectedAdm}} columnSchema={transacaoProdutoTableSchema} rowCount={5} subcategoria={false} area={false} ativo={false}/>
      <div className='row mx-auto mt-5'>
        <div className='col d-flex p-0'>
          <button type="button" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
        </div>
        <div className='col d-flex justify-content-end p-0'>
          <button type="submit" className="btn btnSalvar btn-primary w-50 mx-3">Gerar XLS</button>
          <button type="submit" className="btn btnSalvar btn-primary w-50">Gerar PDF</button>
        </div>
      </div>
    </div>
  )
}

export default TransacaoProduto