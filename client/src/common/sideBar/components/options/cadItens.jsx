import React from 'react'
import { MdCategory } from "react-icons/md";


const CadItens = () => {
  return (
    <li className='tooltipHover' data-tooltipName='Cadastrar Item'>
      <MdCategory className='icon' size={30} />
    </li>
  )
}

export default CadItens