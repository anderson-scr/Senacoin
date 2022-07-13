import React, { useEffect, useRef } from 'react'
import { verificaSessao } from 'auth/login/verificaSessao'
import { useNavigate } from 'react-router-dom'
import { NavLink, Outlet } from 'react-router-dom'


const CadQrcode = () => {
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
          <NavLink className="containerTabOption" to="/CadastroQrcode/Livre" >Livre</NavLink>
          <NavLink className="containerTabOption tabCenter" to="/CadastroQrcode/Vinculado" >Vinculado</NavLink>
        </nav>
        <section className='containerForm'>
          <Outlet />
        </section>
      </div>
    </div>
  )
}

export default CadQrcode