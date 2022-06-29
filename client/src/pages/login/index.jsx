import React, { useState } from 'react'
import './indexStyle.css'
import logoSenacoin from '../../assets/imgs/logoSenacoinADM.png'
import ModalEsqueceuSenha from './components/esqueceuSenha/modal/modalEsqueceuSenha';
import { Outlet } from 'react-router-dom';


const TelaLogin = () => {

  return (
    <div className='row g-0 d-flex no-gutters'>

      <div className="col-7 leftSide">
        <img src={ logoSenacoin } className='logoSenacoinLogin' alt="Senacoin" />
      </div>

      <div className='col-5 no-gutters rigthSide' >
        <div className="containerLogin">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default TelaLogin;