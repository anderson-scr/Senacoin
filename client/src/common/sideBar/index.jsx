import React, { useState } from 'react'
import './indexStyle.css'
import GenericOption from './components/genericOption';
// Icons
import { FaUserCog } from "react-icons/fa"
import { VscGraph } from "react-icons/vsc";
import { AiFillTags } from "react-icons/ai"
import { MdCategory } from "react-icons/md"
import { HiOutlineQrcode } from "react-icons/hi"
import { BsList, BsClipboardCheck, BsPencilSquare, BsFillPersonFill } from "react-icons/bs"

const BarraLateral = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openSideBar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className='barraLateral' style={ isOpen? {width: '265px'} : {width: '70px'}}>

      <section className='containerNav'>
        {/* Hamburger menu */}
        <div className='iconeMenuContainer' >
          <BsList className='icon' size={35} onClick={openSideBar} />
        </div>

        <nav className='navBarraLateral'>
          <ul>
            <GenericOption icon={<VscGraph className='icon' size={30} />} datatooltip="Dashboard" path="/Dashboard" isOpen={isOpen} />
            
            <div className='justLine lineT'></div>
            <GenericOption icon={<BsFillPersonFill className='icon' size={30} />} datatooltip="Cadastrar Usuário" path="/Dashboard" isOpen={isOpen} />
            <GenericOption icon={<MdCategory className='icon' size={30} />} datatooltip="Cadastrar Item" path="/Dashboard" isOpen={isOpen} />
            <GenericOption icon={<AiFillTags className='icon' size={30} />} datatooltip="Cadastrar Promoção" path="/Dashboard" isOpen={isOpen} />
            <GenericOption icon={<HiOutlineQrcode className='icon' size={30} />} datatooltip="Cadastrar Qrcode" path="/Dashboard" isOpen={isOpen} />
            <div className='justLine lineB'></div>

            <div className='justLine lineT'></div>
            <GenericOption icon={<FaUserCog className='icon' size={30} />} datatooltip="Gerenciar Usuarios" path="/Dashboard" isOpen={isOpen} />
            <GenericOption icon={<BsPencilSquare className='icon' size={30} />} datatooltip="Gerenciar Items" path="/Dashboard" isOpen={isOpen} />
            <GenericOption icon={<BsClipboardCheck className='icon' size={30} />} datatooltip="Gerenciar Qrcodes" path="/Dashboard" isOpen={isOpen} />
            <div className='justLine lineB'></div>

          </ul>
        </nav>
      </section>
      
      <section className='userSection'>
        
      </section>
    </aside>
  )
}

export default BarraLateral