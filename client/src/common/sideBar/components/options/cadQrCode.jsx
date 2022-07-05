import React from 'react'
import { HiOutlineQrcode } from "react-icons/hi";

const CardQrCode = () => {
  return (
    <li className='tooltipHover' data-tooltipName='Cadastrar Qrcode'>
      <HiOutlineQrcode className='icon' size={30} />
    </li>
  )
}

export default CardQrCode