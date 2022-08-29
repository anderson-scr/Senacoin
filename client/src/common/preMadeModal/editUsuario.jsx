import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { verificaSessao } from 'auth/login/verificaSessao'

// API's
import { callPerfilAPI } from 'api/common/callPerfil'
import { callUnidadeAPI } from 'api/common/callUnidades'
import { callUsuarioAPI } from 'api/usuario/callUsuarios'

// Form validation and more
import { yupSchemaCadUsuario } from 'utils/validation/schemas/cadUsuario'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'

// Form tooltip
import QuestionTooltip from 'common/tooltips/questionTooltip'

// Modal Imports
import Modal from "common/modal/modalIndex"
import ModalHeader from "common/modal/components/modalHead"
import ModalBody from "common/modal/components/modalBody"

// Table
import Table from "common/table/tableIndex"
import { selectUnidadeTableSchema } from 'common/table/schemas/selectUnidade'


const ModalEditUsuario = (props) => {
  const effectOnce = useRef(true)
  const [selectedUnidades, setSelectedUnidades] = useState([])
  const [perfis, setPerfil] = useState([])
  const [userInfo, setUserInfo] = useState(false)
  const [showTable, setShowTable] = useState(false)
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
  const navigate = useNavigate()
  const { register, handleSubmit, formState: {
    errors
  } } = useForm({
    resolver: yupResolver(yupSchemaCadUsuario)
  });

  // Verifica sessão de usuário
  useEffect(() => {
    if(effectOnce.current) {
      if(!verificaSessao()) {
        navigate("/Login", {replace: true})
      }
      
      // Fill dropDows unidades
      (async () => {
        await setPerfil(await callPerfilAPI.ativo())
        await setUserInfo(await callUsuarioAPI.buscaUsuario(props.funcs._id))
      })()
      return () => effectOnce.current = false
    }
  }, [navigate, props.funcs._id])

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

  function cadastrarUsuario(dados) {
    // Fixing object structure in somme keys to send to the back
    dados.nome = dados.nome + ' ' + dados.sobrenome
    dados.cpf = dados.cpf + ' '
    dados.id_unidade = selectedUnidades.length === 0? userInfo.id_unidade : selectedUnidades
    dados.permissoes = {...permissoes}
    
    // After restructuring the object, we delete what is not needed in the back end
    delete dados.sobrenome
    delete dados.perfil

    callUsuarioAPI.atualizarUsuario(userInfo._id, dados)
  }

  const inativarUsuario = () => {
    callUsuarioAPI.inativaUsuario(userInfo._id)
  }
  const ativarUsuario = () => {
    let updateUserInfo = userInfo
    updateUserInfo.ativo = true
    callUsuarioAPI.atualizarUsuario(userInfo._id, updateUserInfo)
  }
  // When we receive the userInfo from the API, we set it to the new state that will be sent for the update
  useEffect(() => {
    setPermissoes({...userInfo.permissoes})
  }, [userInfo])

  return (
    <Modal>
      <ModalHeader>
        <h2>
          Editar Usuario
        </h2>
      </ModalHeader>
      <ModalBody>
        <form className='text-start' onSubmit={handleSubmit(cadastrarUsuario)} style={{width: '72vw'}}>

          {/* First row */}
          <div className='container row mx-auto'>

            {/* First col */}
            <div className='col'>
              <div className="mb-2">
                <label htmlFor="iptNome" className="form-label">Nome</label>
                <input type="text" className="form-control" id="nome" defaultValue={props.funcs.nome.split(' ')[0]} {...register('nome')} />
                <div style={{height: '25px'}}>
                  {errors?.nome?.type &&
                    <div className="form-text text-danger m-0">Preencha o campo corretamente.</div>
                  }
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="iptSobrenome" className="form-label">Sobrenome</label>
                <input type="text" className="form-control" id="sobrenome" defaultValue={props.funcs.nome.substring(props.funcs.nome.indexOf(' ') + 1)} {...register('sobrenome')} />
                <div style={{height: '25px'}}>
                  {errors?.sobrenome?.type &&
                    <div className="form-text text-danger">Preencha o campo corretamente.</div>
                  }
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="iptEmail" className="form-label">Email</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" defaultValue={props.funcs.email} {...register('email')} />
                <div style={{height: '25px'}}>
                  {errors?.email?.type &&
                    <div className="form-text text-danger">Preencha o campo corretamente.</div>
                  }
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="iptCpf" className="form-label">CPF</label>
                <input type="text" className="form-control" id="cpf" defaultValue={props.funcs.cpf.slice(0, -1)} {...register('cpf')} />
                <div style={{height: '25px'}}>
                  {errors?.cpf?.type &&
                    <div className="form-text text-danger">Preencha o campo corretamente.</div>
                  }
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="iptNumeroMatricula" className="form-label">Numero de matricula</label>
                <input type="text" className="form-control" id="matricula" defaultValue={props.funcs.matricula} {...register('matricula')} />
                <div style={{height: '25px'}}>
                  {errors?.matricula?.type &&
                    <div className="form-text text-danger">Preencha o campo corretamente.</div>
                  }
                </div>
              </div>
            </div>

            <div className='col'>
              <div className='container'>
                <QuestionTooltip label={'Unidade'} msg={'Quais unidades o usuario faz parte.'} />
                <input type="button" className="form-control" id="id_unidade" aria-describedby="unidade" onClick={() => setShowTable(true)} value='Clique aqui para escolher as unidades' />
                {showTable &&
                  <Table apiRoute={callUnidadeAPI.ativo} columnSchema={selectUnidadeTableSchema} rowCount={8} resizeContainer={true} enablePagination={false} filters={false} setCurrentState={{funcs: setSelectedUnidades}} />
                }
              </div>
            </div>

            <div className='col'>
              <div>
                <div className='mb-2 overflow-visible'>
                  <QuestionTooltip label='Perfil' msg='Permissões definidas pelo sistema. Voce pode escolher e editar.' />
                  <select className="form-select" id='perfil' aria-label="Default select example" defaultValue="777" onChangeCapture={evt => changePerfil(evt)} {...register('perfil')}>
                    <option value="777"  disabled style={{display: "none"}}>Selecione um perfil</option>
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
                {userInfo &&
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
                }

                {userInfo &&
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
                }
              </div>

            </div>

            {/* Second row */}
            <div className='row mx-auto mt-5'>
              {userInfo.ativo &&
                <div className='col d-flex p-0 justify-content-start'>
                  <button type="button" className="btn btn-outline-danger w-50" onClick={inativarUsuario}>Inativar Usuario</button>
                </div>
              }
              {!userInfo.ativo &&
                <div className='col d-flex p-0 justify-content-start'>
                  <button type="button" className="btn btn-outline-success w-50" onClick={ativarUsuario}>Ativar Usuario</button>
                </div>
              }
              <div className='col d-flex p-0 justify-content-end'>
                <button type="button" onClick={ props.close } className="btn btnCancelar btn-outline-secondary w-75">Cancelar</button>
              </div>
              <div className='col d-flex justify-content-end p-0'>
                <button type="submit" className="btn btnSalvar btn-primary w-75">Salvar</button>
              </div>
            </div>
          </div>
        </form>
      </ModalBody>
    </Modal>
  )
}

export default ModalEditUsuario