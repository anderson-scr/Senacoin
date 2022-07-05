import React from 'react'
import './indexStyle.css'
import { BsList } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { componentsSideBar } from './components/options/exports'

const BarraLateral = () => {
  return (
    <aside className='barraLateral'>
      {/* Hamburger menu */}
      <div className='iconeMenuContainer'>
        <BsList className='icon' size={35} />
      </div>
      <nav className='navBarraLateral'>
        <ul>
          <li className='tooltipHover' data-tooltipName='Dashboard'>
            <VscGraph className='icon' size={30} />
          </li>

          <div className='containerCadastros' >
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.CadUsuario}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.CadItens}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.CadPromocoes}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.CardQrCode}
            </li>
          </div>

            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.GerUsuario}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.GerRelatorio}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.GerPromocoes}
            </li>
            <li className='tooltipHover' data-tooltipName='Dashboard'>
              {componentsSideBar.GerExtratoPontos}
            </li>
        </ul>
      </nav>
      <section className='userSection'>
        
      </section>
    </aside>
  )
}

export default BarraLateral