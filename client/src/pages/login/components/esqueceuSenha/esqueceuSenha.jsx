import React, { useState } from 'react'
import './esqueceuSenhaStyle.css'
import { NavLink } from 'react-router-dom';
import ModalEsqueceuSenha from './modal/modalEsqueceuSenha'


const EsqueceuSenha = () => {


  return (
    <>
      <h2 className='titleLoginEsqueceuSenha'>Recuperar senha</h2>

      <p className='infoResetSenha'>
        Iremos enviar ao email informado um link de acesso para redefinir a senha.
      </p>

      <form>
        <div className="mb-3">
          <label htmlFor="recuperarEmail1" className="form-label" placeholder='ex: email@gmail.com'>Email</label>
          <input type="email" className="form-control" id="recuperarEmail1" />
        </div>
        <div className="mb-3 containerPassword">
          <label htmlFor="recuperarEmail2" className="form-label" placeholder='ex: email@gmail.com'>Confirmar email</label>
          <input type="email" className="form-control" id="recuperarEmail2" />
        </div>

        <div className='text-center containerBtnEnviar'>
          <button type="submit" className="btn btn-primary btnSubmitLoginEsqueceuSenha" >Enviar</button>
        </div>
      </form>

      <div className='containerForgotPassword'>
        <NavLink to="/" className='forgotPassword'>Voltar</NavLink>
      </div>
    </>
  )
}

export default EsqueceuSenha;