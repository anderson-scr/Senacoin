import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import Table from 'common/table/tableIndex'
import { callUsuarioAPI } from 'api/usuario/callUsuarios'
import { gerUsuarioTabelaSchema } from 'common/table/schemas/gerUsuario'


const GerUsuario = () => {
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
    <Table apiRoute={callUsuarioAPI.todos} columnSchema={gerUsuarioTabelaSchema} rowSize={12} />
  )
}

export default GerUsuario