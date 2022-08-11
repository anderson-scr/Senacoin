import React, { useState, useContext, useEffect, useRef } from 'react'
import GenericOption from './components/genericOption'
import logoSenacoinWhite from 'assets/imgs/logoSenacoinAdmWhite.png'
import { useNavigate } from 'react-router-dom'

// CSS
import './indexStyle.css'

// Icons
import { FaUserCog } from "react-icons/fa"
import { MdOutlineLogout } from "react-icons/md"
import { GoGraph } from "react-icons/go";
import { AiFillTags } from "react-icons/ai"
import { MdCategory } from "react-icons/md"
import { HiOutlineQrcode, HiQrcode } from "react-icons/hi"
import { BsList, BsClipboardCheck, BsPencilSquare, BsPersonPlusFill } from "react-icons/bs"

// Contexts
import { pageInContext } from 'contexts/pageInContext'
import { AuthContext } from 'contexts/authContext'

const BarraLateral = () => {
  const [isOpen, setIsOpen] = useState(false)
  const effectOne = useRef(true)
  const { setPageIn } = useContext(pageInContext)
  const { permissions, setPermissions } = useContext(AuthContext)
  const navigation = useRef()
  const navigate = useNavigate()

  const openSideBar = () => {
    setIsOpen(!isOpen)
  }
  const changePageTitle = (evt) => {
    setPageIn(evt.target.closest("li").getAttribute("data-datatooltip"))
  }

  useEffect(() => {
    if(effectOne.current) {
      (async () => {
        // Check if the permissions has ben filled. If not, get from localStorage
        if(permissions.length === 0) {
          await setPermissions(JSON.parse(localStorage.getItem('permissions')))
        }
        
        // Save in the context the current page the user is on. In case of reload or anything, so we can keep track of his location
        setPageIn(navigation.current.querySelector(".active > li").getAttribute("data-datatooltip"))
      })()

      return () => effectOne.current = false
    }
  }, [])

  const logoutUser = () => {
    localStorage.removeItem("accessToken")
    navigate("/Login", {replace: true})
  }

  return (
    <aside className='barraLateral' style={ isOpen? {width: '285px'} : {width: '70px'}}>
      <section className='containerNav'>
        {/* Hamburger menu? */}
        <div className='iconeMenuContainer'>
          <BsList size={30} className="animatedMenu" onClick={openSideBar} />
          <img src={ logoSenacoinWhite } alt="Senacoin" className='logoSenacoin' style={isOpen? 
            {opacity: '1', transitionDelay: '.3s'}
              : 
            {opacity: '0', transitionDelay: '0s'}} />
        </div>


        <nav className='navBarraLateral' ref={navigation}>
          <ul>
            <GenericOption icon={<GoGraph className='icon' size={30} />} dataToolTip="Dashboard" path="/Dashboard" isOpen={isOpen} click={changePageTitle} />
            
            {permissions.cad_usuarios && 
              <GenericOption icon={<BsPersonPlusFill className='icon' size={30} />} dataToolTip="Cadastrar Usuário" path="/CadastroUsuario" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.cad_itens && 
              <GenericOption icon={<MdCategory className='icon' size={30} />} dataToolTip="Cadastrar Item" path="/CadastroItem" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.cad_promocoes && 
              <GenericOption icon={<AiFillTags className='icon' size={30} />} dataToolTip="Cadastrar Promoção" path="/CadastroPromocao" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.cad_qrcodes && 
              <GenericOption icon={<HiOutlineQrcode className='icon' size={30} />} dataToolTip="Cadastrar Qrcode" path="/CadastroQrcode" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.ger_usuarios && 
              <GenericOption icon={<FaUserCog className='icon' size={30} />} dataToolTip="Gerenciar Usuarios" path="/GerenciarUsuarios" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.ger_itens && 
              <GenericOption icon={<BsPencilSquare className='icon' size={30} />} dataToolTip="Gerenciar Items" path="/GerenciarItems" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.ger_qrcodes && 
              <GenericOption icon={<HiQrcode className='icon' size={30} />} dataToolTip="Gerenciar Qrcodes" path="/GerenciarQrcodes" isOpen={isOpen} click={changePageTitle} /> }
            {permissions.relatorios && 
              <GenericOption icon={<BsClipboardCheck className='icon' size={30} />} dataToolTip="Relatórios" path="/Relatorios" isOpen={isOpen} click={changePageTitle} /> }

          </ul>
        </nav>
      </section>
      
      <section className='userSection'>
        <div className='containerLogout' onClick={logoutUser}>
          <MdOutlineLogout className='icon rotateIcon' size={30} />  
        </div>
      </section>
    </aside>
  )
}

export default BarraLateral