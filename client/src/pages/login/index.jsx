import React, { useState, useRef } from 'react'
import './indexStyle.css'
import logoSenacoin from '../../assets/imgs/logoSenacoinADM.png'
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const inputPassword = useRef()

  const changeVisibility = () => {
    showPassword? inputPassword.current.type = "text" : inputPassword.current.type = "password"
    setShowPassword(!showPassword)
  }

  return (
    <div className='row g-0 d-flex no-gutters'>
      <div className="col-7 leftSide">
        <img src={ logoSenacoin } className='logoSenacoinLogin' alt="Senacoin" />
      </div>

      <div className='col-5 no-gutters rigthSide' >
        <div className="containerLogin">
          <h2 className='titleLogin'>Login</h2>

          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3 containerPassword">
              <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
              <input type="password" className="form-control" id="exampleInputPassword1" ref={inputPassword} />

              {/* Icon to show password */}
              {showPassword? <BsFillEyeSlashFill className='showPasswordIcon' size={20} onClick={changeVisibility} />: <BsFillEyeFill className='showPasswordIcon' size={20} onClick={changeVisibility} />}
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input inputPassword" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">Mantenha-me logado</label>
            </div>
            <div className='text-center'>
              <button type="submit" className="btn btn-primary btnSubmitLogin">Entrar</button>
            </div>
          </form>
          <div className='containerForgotPassword'>
            <legend className='forgotPasswordText'>Esqueceu sua senha? <span className='forgotPassword'>Clique aqui!</span></legend>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;