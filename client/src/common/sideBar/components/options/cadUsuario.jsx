import React from 'react'
import { BsFillPersonFill } from "react-icons/bs";

const CadUsuario = () => {
  return (
    <li className='tooltipHover' data-tooltipName='Cadastrar Usuário'>
      <BsFillPersonFill className='icon' size={30} />
    </li>
  )
}

export default CadUsuario