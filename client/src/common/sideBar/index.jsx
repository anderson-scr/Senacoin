import React, { useState } from 'react'
import './indexStyle.css'
import GenericOption from './components/genericOption';
import logoSenacoinWhite from 'assets/imgs/logoSenacoinAdmWhite.png'


// Icons
import { FaUserCog } from "react-icons/fa"
import { GoGraph } from "react-icons/go";
import { AiFillTags } from "react-icons/ai"
import { MdCategory } from "react-icons/md"
import { HiOutlineQrcode, HiQrcode } from "react-icons/hi"
import { BsList, BsClipboardCheck, BsPencilSquare, BsPersonPlusFill } from "react-icons/bs"


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
          <BsList size={30} className="animatedMenu" onClick={openSideBar} />
          <img src={ logoSenacoinWhite } alt="Senacoin" className='logoSenacoin' style={isOpen? 
            {opacity: '1', transitionDelay: '.3s'}
              : 
            {opacity: '0', transitionDelay: '0s'}} />
        </div>


        <nav className='navBarraLateral'>
          <ul>
            <GenericOption icon={<GoGraph className='icon' size={30} />} dataToolTip="Dashboard" path="/Dashboard" isOpen={isOpen} />
            
            <GenericOption icon={<BsPersonPlusFill className='icon' size={30} />} dataToolTip="Cadastrar Usuário" path="/CadastroUsuario" isOpen={isOpen} />
            <GenericOption icon={<MdCategory className='icon' size={30} />} dataToolTip="Cadastrar Item" path="/CadastroItem" isOpen={isOpen} />
            <GenericOption icon={<AiFillTags className='icon' size={30} />} dataToolTip="Cadastrar Promoção" path="/CadastroPromocao" isOpen={isOpen} />
            <GenericOption icon={<HiOutlineQrcode className='icon' size={30} />} dataToolTip="Cadastrar Qrcode" path="/CadastroQrcode" isOpen={isOpen} />

            <GenericOption icon={<FaUserCog className='icon' size={30} />} dataToolTip="Gerenciar Usuarios" path="/GerenciarUsuarios" isOpen={isOpen} />
            <GenericOption icon={<BsPencilSquare className='icon' size={30} />} dataToolTip="Gerenciar Items" path="/GerenciarItems" isOpen={isOpen} />
            <GenericOption icon={<HiQrcode className='icon' size={30} />} dataToolTip="Gerenciar Qrcodes" path="/GerenciasQrcoes" isOpen={isOpen} />
            <GenericOption icon={<BsClipboardCheck className='icon' size={30} />} dataToolTip="Relatórios" path="/GerenciasQrcoes" isOpen={isOpen} />

          </ul>
        </nav>
      </section>
      
      <section className='userSection'>
        
      </section>
    </aside>
  )
}

export default BarraLateral