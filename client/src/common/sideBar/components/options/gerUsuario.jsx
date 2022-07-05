import React from 'react'
import { FaUserCog } from "react-icons/fa";

const GerUsuario = () => {
  return (
    <li className='tooltipHover' data-tooltipName='Gerenciar Usuários'>
      <FaUserCog className='icon' size={30} />
    </li>
  )
}

export default GerUsuario