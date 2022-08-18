import React, { useEffect, useRef, useState } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'

// Components
import Calendar from './components/calendar/calendar'
import ItemsAlertTable from './components/itemsAlertTable'

// API's 
import { callTodosItemsAPI } from 'api/item/apiTodos'

// Table 
import Table from 'common/table/tableIndex'
import { baixoEstoqueTableSchema } from 'common/table/schemas/baixoEstoque'

const Dashboard = () => {
  const effectOnce = useRef(true)
  const [itemLowStorage, setItemLowStorage] = useState([])
  const navigate = useNavigate()
  
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Call promocao API
      (async () => {
        setItemLowStorage(await callTodosItemsAPI.baixoEstoque(0))
      })()
      
      return () => effectOnce.current = false
    }
  }, [navigate])

  useEffect(() => {
    console.log(itemLowStorage)
  }, [itemLowStorage])

  return (
    <section className='container'>
      <div className='row mb-5' style={{maxHeight: '35vh'}} >
        <div className='col-5 mt-3' >
          <h3 className='mb-3'>Areas mais acessadas</h3>
          <ItemsAlertTable />
        </div>
        <div className='col-7 mt-3'>
          <Calendar />
        </div>
      </div>
      <div className='row'>
        <h3 className='mt-5' style={{margin: '0'}}>Estoque baixo</h3>
        <Table filters={false} rowCount={10} resizeContainer={true} apiRoute={callTodosItemsAPI.baixoEstoque} columnSchema={baixoEstoqueTableSchema} editColumn={false} />
      </div>
    </section>
  )
}

export default Dashboard