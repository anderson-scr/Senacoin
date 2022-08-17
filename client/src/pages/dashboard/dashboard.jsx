import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
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
    <section className='container col'>
      <div className='h-100'>
        <nav className='navCadItem d-flex justify-content-around align-items-end mb-5'>
          <NavLink className="containerTabOption" to="/Dashboard/Tabela" >Geral</NavLink>
          <NavLink className="containerTabOption tabCenter" to="/Dashboard/Calendario" >Calendário</NavLink>
        </nav>

        <div>
          <Outlet />
        </div>
      </div>
    </section>
  )
}

export default Dashboard