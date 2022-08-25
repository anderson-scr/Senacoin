import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

// Tooltips
import QuestionTooltip from 'common/tooltips/questionTooltip'

const RelatorioCadastros = () => {
  const navigate = useNavigate()
  const formsRoutes = [
    '/Relatorios/Cadastros/Administradores',
    '/Relatorios/Cadastros/Alunos',
    '/Relatorios/Cadastros/Produtos',
    '/Relatorios/Cadastros/Servicos',
    '/Relatorios/Cadastros/Eventos',
    '/Relatorios/Cadastros/Promocoes',
    '/Relatorios/Cadastros/Qrcodes',
    '/Relatorios/Cadastros/UnidadesAreas'
  ]

  // Render the selected form
  const setForm = (evt) => {
    navigate(formsRoutes[evt.target.value], {replace: true} )
  }

  return (
    <section className='container'>
      <div className='mb-2 overflow-visible'>
        <QuestionTooltip label='Emitir relatorio de' msg='Define o que sera emitido no relatório.' />
        <select className="form-select" id='perfil' aria-label="Dropdown de relatorios" onChangeCapture={evt => setForm(evt)} defaultValue="DEFAULT">
          <option value="DEFAULT"  disabled style={{display: "none"}}>Selecione um perfil</option>
          <option value="0">Administradores</option>
          <option value="1">Alunos</option>
          <option value="2">Produtos</option>
          <option value="3">Serviços</option>
          <option value="4">Eventos</option>
          <option value="5">Promoções</option>
          <option value="6">Qrcodes</option>
          <option value="7">Unidades, Areas e Subcategorias</option>
        </select>
      </div>
      <hr />
      <section className='container'>
          <Outlet/>
      </section>
    </section>
  )
}

export default RelatorioCadastros