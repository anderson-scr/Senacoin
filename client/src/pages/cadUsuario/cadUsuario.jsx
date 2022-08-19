import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'

// API's
import { callUsuarioAPI } from 'api/usuario/callUsuarios'
import { callPerfilAPI } from 'api/common/callPerfil'

// Form validation and more
import { yupSchemaCadUsuario } from 'utils/validation/schemas/cadUsuario'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

// Form tooltip
import QuestionTooltip from 'common/tooltips/questionTooltip'
import AddTooltip from 'common/tooltips/addTooltip'

// CSS
import './cadUsuarioStyle.css'

// Modal Imports
import ModalService from 'common/modal/services/modalService'
import ModalCadUnidade from 'common/preMadeModal/cadUnidade'
import ModalSelecionarUnidade from 'common/preMadeModal/selects/modalSelecionarUnidade'

// Contexts
import { AuthContext } from 'contexts/authContext'


const CadUsuario = () => {
  const effectOnce = useRef(true)
  const [selectedUnidades, setSelectedUnidades] = useState([])
  const [perfis, setPerfil] = useState([])
  const {permissions} = useContext(AuthContext)
  const [permissoes, setPermissoes] = useState({
    cad_areas: false,
    cad_itens: false,
    cad_perfis: false,
    cad_promocoes: false,
    cad_qrcodes: false,
    cad_subcategorias: false,
    cad_unidades: false,
    cad_usuarios: false,
    ger_itens: false,
    ger_promocoes: false,
    ger_qrcodes: false,
    ger_usuarios: false,
    relatorios: false
  })
  const [checkSelectedUni, setCheckSelectedUni] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadUsuario)
  })

  // Verifica sessão de usuário
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }

      // Fill dropDows unidades
      (async () => {
        setPerfil(await callPerfilAPI.ativo())
      })()
      return () => effectOnce.current = false
    }
  }, [navigate])

  // Modal cad unidades
  const openModalCadUnidade = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalCadUnidade)
  }
  // Modal select unidades
  const openModalSelectUnidade = (evt) => {
    evt.preventDefault()
    ModalService.open(ModalSelecionarUnidade, {}, setSelectedUnidades)
  }


  async function cadastrarUsuario(dados) {
    await verificaUnidade()
    if(checkSelectedUni) {
      // Fixing object structure in somme keys to send to the back
      dados.senha = dados.nome.toLowerCase() + '1234'
      dados.nome = dados.nome + ' ' + dados.sobrenome
      dados.cpf = dados.cpf + ' '
      dados.id_unidade = selectedUnidades
      dados.permissoes = {...permissoes}
      
      // After restructuring the object, we delete what is not needed in the back end
      delete dados.sobrenome
      delete dados.perfil
      console.log(dados)
      callUsuarioAPI.novo(dados)
    }
  }

  // Change the default perfil value
  const changePerfil = (evt) => {
    let tempoPerfil = {...perfis[evt.target.value -1].permissoes}
    setPermissoes(tempoPerfil)
  }

  // Permits to change the current value of permissao state
  const changePermissao = (evt) => {
    const tempPermissao = {...permissoes}
    tempPermissao[evt.target.id] = !tempPermissao[evt.target.id]
    setPermissoes({...tempPermissao})
  }

  // We needed this custom verify func cause the react form cannot check the state on selectedUnidades and send to yup.
  const verificaUnidade = async () => {
    selectedUnidades.length > 0? await setCheckSelectedUni(true) : await setCheckSelectedUni(false)
  }

  return (
    <section>
      <form onSubmit={handleSubmit(cadastrarUsuario, verificaUnidade)}>

        {/* First row */}
        <div className='container row mx-auto'>

          {/* First col */}
          <div className='col'>
            <div className="mb-2">
              <label htmlFor="iptNome" className="form-label">Nome</label>
              <input type="text" className="form-control" id="nome" {...register('nome')} />
              <div style={{height: '25px'}}>
                {errors?.nome?.type &&
                  <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                }
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptSobrenome" className="form-label">Sobrenome</label>
              <input type="text" className="form-control" id="sobrenome" {...register('sobrenome')} />
              <div style={{height: '25px'}}>
                {errors?.sobrenome?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder='exemplo@email.com' {...register('email')} />
              <div style={{height: '25px'}}>
                {errors?.email?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptCpf" className="form-label">CPF</label>
              <input type="text" className="form-control" id="cpf" placeholder='000.000.000-00' {...register('cpf')} />
              <div style={{height: '25px'}}>
                {errors?.cpf?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>

            <div className="mb-2">
              <label htmlFor="iptNumeroMatricula" className="form-label">Numero de matricula</label>
              <input type="text" className="form-control" id="matricula" placeholder='000.000/000.00-00' {...register('matricula')} />
              <div style={{height: '25px'}}>
                {errors?.matricula?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
            </div>
          </div>

          {/* Second Col */}
          <div className='col'>

            {/* Second Col - first row */}
            <div>
              <div className='mb-2 overflow-visible'>
                <AddTooltip label='Unidade' permission={permissions.cad_unidades} msg='Criar uma nova unidade.' onClickFunc={openModalCadUnidade} />
                <input type="button" onClick={evt => openModalSelectUnidade(evt)} className="form-control" id="id_unidade" aria-describedby="emailHelp" value={selectedUnidades.length + ' unidade(s) selecionada(s)'}/>
                <div style={{height: '25px'}}>
                {checkSelectedUni &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
              </div>

              <div className='mb-2 overflow-visible'>
                <QuestionTooltip label='Perfil' msg='Permissões definidas pelo sistema. Voce pode escolher e editar.' />
                <select className="form-select" id='perfil' aria-label="Default select example" defaultValue="DEFAULT" onChangeCapture={evt => changePerfil(evt)} {...register('perfil')}>
                  <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um perfil</option>
                  {perfis.length > 1 &&
                    perfis.map((perfil, idx) => {
                      return <option key={idx} value={idx + 1}>{perfil.nome}</option>
                    })
                  }
                </select>
                <div style={{height: '25px'}}>
                {errors?.perfil?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
              </div>
            </div>

          
            {/* Second Col - second row */}
            <div className='row d-flex justify-content-center'>
              {/* Second Col - second row - first col */}
              <div className='col-5'>
                <h4>Cadastros</h4>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadUsuario" id="cad_usuarios" onClick={evt => changePermissao(evt)} checked={permissoes.cad_usuarios} {...register('permissoes.cad_usuarios')} />
                  <label className="form-check-label" htmlFor="checkboxCadUsuario">
                    Usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadItems" id="cad_itens" onClick={evt => changePermissao(evt)} checked={permissoes.cad_itens} {...register('permissoes.cad_itens')} />
                  <label className="form-check-label" htmlFor="checkboxCadItems">
                    Items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadAreas" id="cad_areas" onClick={evt => changePermissao(evt)} checked={permissoes.cad_areas} {...register('permissoes.cad_areas')} />
                  <label className="form-check-label" htmlFor="checkboxCadAreas">
                    Areas
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadSubcategorias" id="cad_subcategorias" onClick={evt => changePermissao(evt)} checked={permissoes.cad_subcategorias} {...register('permissoes.cad_subcategorias')} />
                  <label className="form-check-label" htmlFor="checkboxCadSubcategorias">
                    Subcategorias
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadSubcategorias" id="cad_perfis" onClick={evt => changePermissao(evt)} checked={permissoes.cad_perfis} {...register('permissoes.cad_perfis')} />
                  <label className="form-check-label" htmlFor="checkboxCadSubcategorias">
                    Perfis
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadPromocoes" id="cad_promocoes" onClick={evt => changePermissao(evt)} checked={permissoes.cad_promocoes} {...register('permissoes.cad_promocoes')} />
                  <label className="form-check-label" htmlFor="checkboxCadPromocoes">
                    Promoções
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadQRcodes" id="cad_qrcodes" onClick={evt => changePermissao(evt)} checked={permissoes.cad_qrcodes} {...register('permissoes.cad_qrcodes')} />
                  <label className="form-check-label" htmlFor="checkboxCadQRcodes">
                    QRcodes
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadQRcodes" id="cad_unidades" onClick={evt => changePermissao(evt)} checked={permissoes.cad_unidades} {...register('permissoes.cad_unidades')} />
                  <label className="form-check-label" htmlFor="checkboxCadQRcodes">
                    Unidades
                  </label>
                </div>

              </div>

              {/* Second Col - second row - second col */}
              <div className='col-5'>
                <h4>Gerenciamento</h4>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_usuarios" onClick={evt => changePermissao(evt)} checked={permissoes.ger_usuarios} {...register('permissoes.ger_usuarios')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault1">
                    Gerenciar usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_itens" onClick={evt => changePermissao(evt)} checked={permissoes.ger_itens} {...register('permissoes.ger_itens')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_promocoes" onClick={evt => changePermissao(evt)} checked={permissoes.ger_promocoes} {...register('permissoes.ger_promocoes')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Promoções
                  </label>
                </div> 
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_qrcodes" onClick={evt => changePermissao(evt)} checked={permissoes.ger_qrcodes} {...register('permissoes.ger_qrcodes')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Qrcode
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="relatorios" onClick={evt => changePermissao(evt)} checked={permissoes.relatorios} {...register('permissoes.relatorios')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Emitir relatórios
                  </label>
                </div> 
              </div>
            </div>

          </div>

          {/* Second row */}
          <div className='row mx-auto mt-5'>
            <div className='col d-flex p-0'>
              <button type="button" className="btn btnCancelar btn-outline-secondary w-50">Cancelar</button>
            </div>
            <div className='col d-flex justify-content-end p-0'>
              <button type="submit" className="btn btnSalvar btn-primary w-50">Salvar</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  )
}

export default CadUsuario;