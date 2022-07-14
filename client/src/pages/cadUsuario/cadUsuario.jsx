import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificaSessao } from 'auth/login/verificaSessao';
import { getFormData } from 'utils/getFormData/getFormData';
import './cadUsuarioStyle.css';


const CadUsuario = () => {
  const effectOnce = useRef(true)
  const navigate = useNavigate()


  // Verifica sessão de usuário
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
  
      return () => effectOnce.current = false
    }
  }, [navigate])

  const getInfo = (evt) => {
    evt.preventDefault()
    getFormData()
  }

  return (
    <section>
      <form>

        {/* First row */}
        <div className='containerForm container row'>

          {/* First col */}
          <div className='col'>
            <div className="mb-2">
              <label htmlFor="iptNome" className="form-label">Nome</label>
              <input type="text" className="form-control" id="iptNome" />
              <div id="iptNomeNeeded" className="textObrigatorio form-text">Este campo e obrigatório.</div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptSobrenome" className="form-label">Sobrenome</label>
              <input type="text" className="form-control" id="iptSobrenome" />
              <div id="iptSobrenomeNeeded" className="textObrigatorio form-text">Este campo e obrigatório.</div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="iptEmail" aria-describedby="emailHelp" placeholder='exemplo@email.com' />
              <div id="iptEmailNeeded" className="textObrigatorio form-text">Este campo e obrigatório.</div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptCpf" className="form-label">CPF</label>
              <input type="number" className="form-control" id="iptCpf" placeholder='000.000.000-00' />
              <div id="iptCpfNeeded" className="textObrigatorio form-text">Este campo e obrigatório.</div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptNumeroMatricula" className="form-label">Numero de matricula</label>
              <input type="number" className="form-control" id="iptNumeroMatricula" placeholder='000.000/000.00-00'/>
              <div id="emailHelp" className="textObrigatorio form-text">Este campo e obrigatório.</div>
            </div>
          </div>

          {/* Second Col */}
          <div className='teste2 col'>

            {/* Second Col - first row */}
            <div className='row arrumaSapoha'>
              <label htmlFor="dropPerfil" className="form-label">Unidade</label>
              <select className="form-select" id='unidade' aria-label="Default select example">
                <option defaultValue={0}>Open this select menu</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>

            <div className='row arrumaSapoha2'>
              <label htmlFor="dropPerfil" className="form-label">Perfil</label>
              <select className="form-select" id='perfil' aria-label="Default select example">
                <option defaultValue={0}>Open this select menu</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
            </div>
          
            {/* Second Col - second row */}
            <div className='containerChecks row h-75'>
              {/* Second Col - second row - first col */}
              <div className='columnCheks col-5 mx-auto'>
                <h4>Cadastros</h4>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadUsuario" id="cadUsuario" />
                  <label className="form-check-label" htmlFor="checkboxCadUsuario">
                    Usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadItems" id="cadItems" />
                  <label className="form-check-label" htmlFor="checkboxCadItems">
                    Items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadAreas" id="cadAreas" />
                  <label className="form-check-label" htmlFor="checkboxCadAreas">
                    Areas
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadSubcategorias" id="cadSubcategorias" />
                  <label className="form-check-label" htmlFor="checkboxCadSubcategorias">
                    Subcategorias
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadPromocoes" id="cadPromocoes" />
                  <label className="form-check-label" htmlFor="checkboxCadPromocoes">
                    Promoções
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadQRcodes" id="cadQrcodes" />
                  <label className="form-check-label" htmlFor="checkboxCadQRcodes">
                    QRcodes
                  </label>
                </div>

              </div>

              {/* Second Col - second row - second col */}
              <div className='columnCheks col-5 mx-auto'>
                <h4>Gerenciamento</h4>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="gerUsuario" />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault1">
                    Gerenciar usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="gerItems" />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="gerPromocoes" />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Promoções
                  </label>
                </div> 
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="gerQrcode" />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Qrcode
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="gerRelatorios" />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Emitir relatórios
                  </label>
                </div> 
              </div>
            </div>

          </div>

          {/* Second row */}
          <div className='containerBtns container row mt-5'>
            <div className='col d-flex'>
              <button type="submit" className="btn btn-outline-secondary w-50">Cancelar</button>
            </div>
            <div className='col d-flex justify-content-end'>
              <button type="submit" className="btn btn-primary w-50" onClick={evt => getInfo(evt)}>Salvar</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CadUsuario;