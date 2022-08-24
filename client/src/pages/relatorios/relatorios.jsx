import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

const Relatorios = () => {
  return (
    <div className='container col'>
      <div className='h-100 row'>
        <nav className='navCadItem d-flex justify-content-around align-items-end mb-5'>
          <NavLink className="containerTabOption" to="/Relatorios/Cadastros" >Cadastros</NavLink>
          <NavLink className="containerTabOption tabCenter" to="/Relatorios/Transacoes" >Transações</NavLink>
        </nav>
        <section className='containerForm'>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default Relatorios