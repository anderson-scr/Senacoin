import React from 'react'
import './indexStyle.css'
import { BsGearFill, BsPersonFill, BsFillHouseFill, BsPencilSquare, BsList } from "react-icons/bs";
import { HiOutlineQrcode } from "react-icons/hi";


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
            <BsFillHouseFill className='icon' size={30} />
          </li>

          <li className='tooltipHover' data-tooltipName='Cadastrar Item'>
            <BsPencilSquare className='icon' size={30} />
          </li>
          
          <li className='tooltipHover' data-tooltipName='Cadastrar Usuário'>
            <BsPersonFill className='icon' size={30} />
          </li>

          <li className='tooltipHover' data-tooltipName='Cadastrar Qrcode'>
            <HiOutlineQrcode className='icon' size={30} />
          </li>
        </ul>
      </nav>
      <section className='userSection'>
        
      </section>
    </aside>
  )
}

export default BarraLateral