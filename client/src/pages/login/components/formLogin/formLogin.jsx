import React, { useState, useRef } from 'react'
import './formLoginStyle.css'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { NavLink, useNavigate } from 'react-router-dom';
import { getFormData } from '../../../../common/getFormData/getFormData'
import { verificaLogin } from '../../../../auth/login/verificarLogin';


// Modal
import ModalService from '../../../../common/modal/services/modalService';
import LoginInvalido from './modal/loginInvalido';
import LoginCampos from './modal/loginCampos';



const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const inputPassword = useRef()
  const navigate = useNavigate()

  const checkLogin = (evt) => {
    evt.preventDefault()
    const infoLogin = getFormData()
    
    if(!verificaLogin.verificarEmail(infoLogin.emailLogin) || !verificaLogin.verificarSenha(infoLogin.senhaLogin)) {
      ModalService.open(
        infoLogin.emailLogin.length === 0 || infoLogin.senhaLogin.length === 0? LoginCampos : LoginInvalido
      )
      inputPassword.current.value = ''
    } else {
      navigate("/Home", {replace: true} )
    }
  }

  const changeVisibility = () => {
    showPassword? inputPassword.current.type = "text" : inputPassword.current.type = "password"
    setShowPassword(!showPassword)
  }

  return (
    <>
      <h2 className='titleLogin'>Login</h2>

      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
          <input name="emailLogin" type="email" className="form-control" id="emailLogin" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 containerPassword">
          <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
          <input name="senhaLogin" type="password" className="form-control inputPassword" id="senhaLogin" ref={inputPassword} />

          {/* Icon to show password */}
          {showPassword? <BsFillEyeFill className='showPasswordIcon' size={20} onClick={changeVisibility} />: <BsFillEyeSlashFill className='showPasswordIcon' size={20} onClick={changeVisibility} />}
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Mantenha-me logado</label>
        </div>
        <div className='text-center'>
          <button onClick={evt => checkLogin(evt)} type="submit" value="Submit" className="btn btn-primary btnSubmitLogin">Entrar</button>
        </div>
      </form>
      <div className='containerForgotPassword'>
        <legend className='forgotPasswordText'>Esqueceu sua senha? <NavLink to="/EsqueceuSenha" className='forgotPassword'>Clique aqui!</NavLink></legend>
      </div>
    </>
  )
}

export default FormLogin;