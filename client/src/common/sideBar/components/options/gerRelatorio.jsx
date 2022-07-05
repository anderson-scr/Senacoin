import React from 'react'
import { BsClipboardCheck } from "react-icons/bs";

const GerRelatorio = () => {
  return (
    <li className='tooltipHover' data-tooltipName='Relatórios'>
      <BsClipboardCheck className='icon' size={30} />
    </li>
  )
}

export default GerRelatorio