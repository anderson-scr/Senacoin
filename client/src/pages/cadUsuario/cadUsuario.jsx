import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificaSessao } from 'auth/login/verificaSessao';
import { callUnidadeAPI } from 'api/cadastros/callUnidade';
import { callPerfilAPI } from 'api/cadastros/callPerfil';
import { yupSchemaCadUsuario } from 'utils/validation/schemas/cadUsuario';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { callUsuarioAPI } from 'api/cadUsuario/callUsuarios';
import './cadUsuarioStyle.css';


const CadUsuario = () => {
  const effectOnce = useRef(true)
  const [unidades, setUnidades] = useState([])
  const [perfis, setPerfil] = useState([])
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
        setUnidades(await callUnidadeAPI.ativo())
        setPerfil(await callPerfilAPI.ativo())
      })()

      return () => effectOnce.current = false
    }
  }, [navigate])

  function certo(dados) {
    // Arrumando a estrutura do objeto para enviar pro post de usuario
    dados.senha = dados.nome.toLowerCase() + '1234'
    dados.nome = dados.nome + ' ' + dados.sobrenome
    dados.cpf = dados.cpf + ' '
    dados.id_unidade = unidades[parseInt(dados.id_unidade) - 1]._id
    dados = {...dados, ...dados.gerenciar}
    dados = {...dados, ...dados.cadastros}

    // Depois dos spreads, deleto os desnecessários
    delete dados.sobrenome
    delete dados.gerenciar 
    delete dados.cadastros
    delete dados.perfil

    console.log(dados)
    callUsuarioAPI.novo(dados)
  }

  return (
    <section>
      <form onSubmit={handleSubmit(certo)}>

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
              <div className='mb-2'>
                <label htmlFor="dropPerfil" className="form-label">Unidade</label>
                <select className="form-select" id='id_unidade' aria-label="Default select example" defaultValue={'DEFAULT'} {...register('id_unidade')}>
                  <option value="DEFAULT" disabled style={{display: "none"}}>Selecione uma unidade</option>
                  {unidades.length > 1 &&
                    unidades.map((unidade, idx) => {
                      return <option key={idx} value={idx + 1}>{unidade.nome}</option>
                    })
                  }
                </select>
                <div style={{height: '25px'}}>
                {errors?.id_unidade?.type &&
                  <div className="form-text text-danger">Preencha o campo corretamente.</div>
                }
              </div>
              </div>

              <div className='mb-2'>
                <label htmlFor="dropPerfil" className="form-label">Perfil</label>
                <select className="form-select" id='perfil' aria-label="Default select example" defaultValue={'DEFAULT'} {...register('perfil')}>
                  <option value="DEFAULT" disabled style={{display: "none"}}>Selecione um perfil</option>
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
                  <input className="form-check-input" type="checkbox" name="checkboxCadUsuario" id="cad_usuarios" {...register('cadastros.cad_usuarios')} />
                  <label className="form-check-label" htmlFor="checkboxCadUsuario">
                    Usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadItems" id="cad_itens" {...register('cadastros.cad_itens')} />
                  <label className="form-check-label" htmlFor="checkboxCadItems">
                    Items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadAreas" id="cad_areas" {...register('cadastros.cad_areas')} />
                  <label className="form-check-label" htmlFor="checkboxCadAreas">
                    Areas
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadSubcategorias" id="cad_subcategorias" {...register('cadastros.cad_subcategoria')} />
                  <label className="form-check-label" htmlFor="checkboxCadSubcategorias">
                    Subcategorias
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadSubcategorias" id="cad_perfis" {...register('cadastros.cad_perfis')} />
                  <label className="form-check-label" htmlFor="checkboxCadSubcategorias">
                    Perfis
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadPromocoes" id="cad_promocoes" {...register('cadastros.cad_promocoes')} />
                  <label className="form-check-label" htmlFor="checkboxCadPromocoes">
                    Promoções
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadQRcodes" id="cad_qrcode" {...register('cadastros.cad_qrcode')} />
                  <label className="form-check-label" htmlFor="checkboxCadQRcodes">
                    QRcodes
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="checkboxCadQRcodes" id="cad_unidades" {...register('cadastros.cad_unidades')} />
                  <label className="form-check-label" htmlFor="checkboxCadQRcodes">
                    Unidades
                  </label>
                </div>

              </div>

              {/* Second Col - second row - second col */}
              <div className='col-5'>
                <h4>Gerenciamento</h4>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_usuarios" {...register('gerenciar.ger_usuarios')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault1">
                    Gerenciar usuários
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_itens" {...register('gerenciar.ger_itens')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar items
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_promocoes" {...register('gerenciar.ger_promocoes')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Promoções
                  </label>
                </div> 
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_qrcode" {...register('gerenciar.ger_qrcode')} />
                  <label className="form-check-label" htmlFor="flexcheckboxDefault2">
                    Gerenciar Qrcode
                  </label>
                </div>
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" name="flexcheckboxDefault" id="ger_relatorios" {...register('gerenciar.relatorios')} />
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