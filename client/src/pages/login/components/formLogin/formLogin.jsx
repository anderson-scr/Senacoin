import React, { useState, useRef } from 'react'
import './formLoginStyle.css'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { NavLink } from 'react-router-dom';

const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(true);
  const inputPassword = useRef()

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
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3 containerPassword">
          <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
          <input type="password" className="form-control inputPassword" id="exampleInputPassword1" ref={inputPassword} />

          {/* Icon to show password */}
          {showPassword? <BsFillEyeFill className='showPasswordIcon' size={20} onClick={changeVisibility} />: <BsFillEyeSlashFill className='showPasswordIcon' size={20} onClick={changeVisibility} />}
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Mantenha-me logado</label>
        </div>
        <div className='text-center'>
          <button type="submit" className="btn btn-primary btnSubmitLogin">Entrar</button>
        </div>
      </form>
      <div className='containerForgotPassword'>
        <legend className='forgotPasswordText'>Esqueceu sua senha? <NavLink to="/EsqueceuSenha" className='forgotPassword'>Clique aqui!</NavLink></legend>
      </div>
    </>
  )
}

export default FormLogin;