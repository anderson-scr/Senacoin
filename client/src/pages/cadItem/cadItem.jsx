import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import './cadItemStyle.css'

const CadItem = () => {
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
    <div className='container col'>
      <div className='teste h-100 row'>
        <nav className='navCadItem d-flex justify-content-around align-items-end mb-5'>
          <NavLink className="containerTabOption" to="/CadastroItem/Produto" >Produto</NavLink>
          <NavLink className="containerTabOption tabCenter" to="/CadastroItem/Servico" >Serviço</NavLink>
          <NavLink className="containerTabOption" to="/CadastroItem/Evento" >Evento</NavLink>
        </nav>
        <section className='containerForm'>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default CadItem