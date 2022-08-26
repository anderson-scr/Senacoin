import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import { callQrcodeAPI } from 'api/qrcode/apiQrcode'
import Table from 'common/table/tableIndex'
import { gerQrcodeTableSchema } from 'common/table/schemas/gerQrcode'

const GerQrcode = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()

  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
  
      return () => effectOnce.current = false
    }
  }, [navigate])


  return (
    <Table apiRoute={callQrcodeAPI.todos} area={false} ativo={true} subcategoria={false} columnSchema={gerQrcodeTableSchema} rowSize={12} />
  )
}

export default GerQrcode