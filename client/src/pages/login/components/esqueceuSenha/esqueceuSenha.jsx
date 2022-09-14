import React, { useRef } from 'react'
import './esqueceuSenhaStyle.css'
import { NavLink } from 'react-router-dom';
import { getFormData } from 'utils/getFormData/loginForm'
import { verificaLogin } from 'auth/login/verificarLogin';

// Modal components
import ModalService from 'common/modal/services/modalService';
import ModalEsqueceuSenha from './modal/modalEsqueceuSenha';
import ModalEmailIncompativel from './modal/modalEmailIncompativel';
import ModalEmailInvalido from './modal/modalEmailInvalido';


const EsqueceuSenha = () => {
  const iptPrimeiroEmail = useRef()
  const iptSegundoEmail = useRef()

  const checkEmail = (evt) => {
    evt.preventDefault()

    const infoEmail = getFormData()
    if(infoEmail.primeiroEmail === infoEmail.segundoEmail) {
      if(verificaLogin.verificarEmail(infoEmail.primeiroEmail)) {
        ModalService.open(ModalEsqueceuSenha);
      } else {
        ModalService.open(ModalEmailInvalido)
        iptPrimeiroEmail.current.value = ''
        iptSegundoEmail.current.value = ''
      }

    } else {
      ModalService.open(ModalEmailIncompativel)
      iptSegundoEmail.current.value = ''
    }
  }


  return (
    <>
      <h2 className='titleLoginEsqueceuSenha'>Recuperar senha</h2>

      <p className='infoResetSenha'>
        Iremos enviar ao email informado as novas informações de acesso.
      </p>

      <form>
        <div className="mb-3">
          <label htmlFor="recuperarEmail1" className="form-label" >Email</label>
          <input ref={iptPrimeiroEmail} name='primeiroEmail' type="email" className="form-control" id="recuperarEmail1" />
        </div>
        <div className="mb-3 containerPassword">
          <label htmlFor="recuperarEmail2" className="form-label" >Confirmar email</label>
          <input ref={iptSegundoEmail} name='segundoEmail' type="email" className="form-control" id="recuperarEmail2" />
        </div>

        <div className='text-center containerBtnEnviar'>
          <button type="submit" value="Submit" onClick={evt => checkEmail(evt)} className="btn btn-primary btnSubmitLoginEsqueceuSenha" >Enviar</button>
        </div>
      </form>

      <div className='containerForgotPassword'>
        <NavLink to="/Login" className='forgotPassword'>Voltar</NavLink>
      </div>
    </>
  )
}

export default EsqueceuSenha;