import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import "./gerUsuarioStyle.css"
import { useNavigate } from 'react-router-dom'

const GerUsuario = () => {
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
    <div>GerUsuario</div>
  )
}

export default GerUsuario