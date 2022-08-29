import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import Table from 'common/table/tableIndex'
import { gerItemTableSchema } from 'common/table/schemas/gerItem'
import { callTodosItemsAPI } from 'api/item/apiTodos'
import ModalEditProduto from 'common/preMadeModal/editProduto'

const GerItem = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate('/Login', {replace: true})
      }
      return () => effectOnce.current = false
    }
  }, [navigate])

  return (
    <div>
      <Table apiRoute={callTodosItemsAPI.todos} modal={ModalEditProduto} columnSchema={gerItemTableSchema} rowSize={12} />
    </div>
  )
}

export default GerItem