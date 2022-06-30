import React from 'react'
import './esqueceuSenhaStyle.css'
import { NavLink } from 'react-router-dom';
import { getFormData } from '../../../../common/getFormData/getFormData'

// Modal components
import ModalService from '../../../../common/modal/services/modalService';
import ModalEsqueceuSenha from './modal/modalEsqueceuSenha';

const EsqueceuSenha = () => {

  const checkEmail = (evt) => {
    evt.preventDefault()

    const infoEmail = getFormData()
    console.log(infoEmail)
  }

  const addModal = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalEsqueceuSenha);
  };

  return (
    <>
      <h2 className='titleLoginEsqueceuSenha'>Recuperar senha</h2>

      <p className='infoResetSenha'>
        Iremos enviar ao email informado um link de acesso para redefinir a senha.
      </p>

      <form>
        <div className="mb-3">
          <label htmlFor="recuperarEmail1" className="form-label" >Email</label>
          <input name='primeiraSenha' type="email" className="form-control" id="recuperarEmail1" />
        </div>
        <div className="mb-3 containerPassword">
          <label htmlFor="recuperarEmail2" className="form-label" >Confirmar email</label>
          <input name='segundaSenha' type="email" className="form-control" id="recuperarEmail2" />
        </div>

        <div className='text-center containerBtnEnviar'>
          <button type="submit" value="Submit" onClick={evt => checkEmail(evt)} className="btn btn-primary btnSubmitLoginEsqueceuSenha" >Enviar</button>
        </div>
      </form>

      <div className='containerForgotPassword'>
        <NavLink to="/" className='forgotPassword'>Voltar</NavLink>
      </div>
    </>
  )
}

export default EsqueceuSenha;