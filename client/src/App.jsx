import React, { useState } from 'react'
import { BrowserRouter as Router,  Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from 'auth/protectedRoutes/protectedRoutes'
import { AuthContext } from 'contexts/authContext'

// General styles
import './App.css'
import 'common/style/tooTips.css'
import 'common/style/btns.css'

// Components
import TelaLogin from 'pages/login/login'
import EsqueceuSenha from 'pages/login/components/esqueceuSenha/esqueceuSenha'
import FormLogin from 'pages/login/components/formLogin/formLogin'
import Dashboard from 'pages/dashboard/dashboard'
import CadUsuario from 'pages/cadUsuario/cadUsuario'
import CadItem from 'pages/cadItem/cadItem'
import CadPromocao from 'pages/cadPromocao/cadPromocao'
import CadQrcode from 'pages/cadQrcode/cadQrcode'
import GerUsuario from 'pages/gerUsuario/gerUsuario'
import GerItem from 'pages/gerItem/gerItem'
import GerQrcode from 'pages/gerQrcode/gerQrcode'
import Layout from 'common/layout/layout'
import Relatorios from 'pages/relatorios/relatorios'
import CadEvento from 'pages/cadItem/components/cadEvento/cadEvento'
import CadProduto from 'pages/cadItem/components/cadProdutos/cadProduto'
import CadServico from 'pages/cadItem/components/cadServico/cadServico'
import QrcodeLivre from 'pages/cadQrcode/components/qrcodeLivre'
import QrcodeVinculado from 'pages/cadQrcode/components/qrcodeVinculado'
import RelatorioTransacoes from 'pages/relatorios/components/relatorioTransacoes/relatorioTransacoes'
import RelatorioCadastros from 'pages/relatorios/components/relatorioCadastros/relatorioCadastros'
import AdministradoresForm from 'pages/relatorios/components/relatorioCadastros/components/administradoresForm'
import AlunosForm from 'pages/relatorios/components/relatorioCadastros/components/alunosForm'
import EventosForm from 'pages/relatorios/components/relatorioCadastros/components/eventosForm'
import ProdutosForm from 'pages/relatorios/components/relatorioCadastros/components/produtosForm'
import PromocoesForm from 'pages/relatorios/components/relatorioCadastros/components/promocoesForm'
import QrcodesForm from 'pages/relatorios/components/relatorioCadastros/components/qrcodesForm'
import ServicosForm from 'pages/relatorios/components/relatorioCadastros/components/servicosForm'
import UnidadesAreasSubcategoriasForm from 'pages/relatorios/components/relatorioCadastros/components/unidadesAreasSubcategoriasForm'
import TransacaoAdministrador from 'pages/relatorios/components/relatorioTransacoes/components/transacaoAdministrador'
import TransacaoAluno from 'pages/relatorios/components/relatorioTransacoes/components/transacaoAluno'
import TransacaoEvento from 'pages/relatorios/components/relatorioTransacoes/components/transacaoEvento'
import TransacaoProduto from 'pages/relatorios/components/relatorioTransacoes/components/transacaoProduto'
import TransacaoQrcode from 'pages/relatorios/components/relatorioTransacoes/components/transacaoQrcode'
import TransacaoServico from 'pages/relatorios/components/relatorioTransacoes/components/transacaoServico'
import TransacaoPromocao from 'pages/relatorios/components/relatorioTransacoes/components/transacaoPromocao'

function App() {
  const [userAuth, setUserAuth] = useState(localStorage.accessToken? true : false)
  const [permissions, setPermissions] = useState([])

  return (
    <Router>
      <AuthContext.Provider value={{
        userAuth, setUserAuth, // It'll be true if the user has sucssefuly authenticated
        permissions, setPermissions // What the user has permission access or not
      }}>

        <Routes>
          <Route element={<TelaLogin />}>
            <Route path='/Login' element={<FormLogin />} />
            <Route path='/EsqueceuSenha' element={<EsqueceuSenha />} />
          </Route>


          {/* Protect routes */}
          <Route path='/' element={<Navigate replace to='/Dashboard' />} />
          <Route path='/' element={<RequireAuth />} >
            <Route path='/' element={<Layout />}>
              <Route path='/Dashboard' element={<Dashboard />} />
              <Route path='/CadastroUsuario' element={<CadUsuario />} />

              <Route path='/CadastroItem' element={<Navigate replace to='/CadastroItem/Produto' />} />
              <Route path='/CadastroItem' element={<CadItem />} >
                <Route path='/CadastroItem/Produto' element={<CadProduto />} />
                <Route path='/CadastroItem/Evento' element={<CadEvento />} />
                <Route path='/CadastroItem/Servico' element={<CadServico />} />
              </Route>
              <Route path='/CadastroPromocao' element={<CadPromocao />} />

              <Route path='/CadastroQrcode' element={<Navigate replace to='/CadastroQrcode/Livre' />} />
              <Route path='/CadastroQrcode' element={<CadQrcode />} >
                <Route path='/CadastroQrcode/Livre' element={<QrcodeLivre />} />
                <Route path='/CadastroQrcode/Vinculado' element={<QrcodeVinculado />} />
              </Route>
              <Route path='/GerenciarUsuarios' element={<GerUsuario />} />
              <Route path='/GerenciarItems' element={<GerItem />} />
              <Route path='/GerenciarQrcodes' element={<GerQrcode />} />
              
              <Route path='/Relatorios' element={<Navigate replace to='/Relatorios/Cadastros' />} />
              <Route path='/Relatorios' element={<Relatorios />}>
                <Route path='/Relatorios/Cadastros' element={<RelatorioCadastros />} >
                  <Route path='/Relatorios/Cadastros/Administradores' element={<AdministradoresForm />} />
                  <Route path='/Relatorios/Cadastros/Alunos' element={<AlunosForm />} />
                  <Route path='/Relatorios/Cadastros/Eventos' element={<EventosForm />} />
                  <Route path='/Relatorios/Cadastros/Produtos' element={<ProdutosForm />} />
                  <Route path='/Relatorios/Cadastros/Promocoes' element={<PromocoesForm />} />
                  <Route path='/Relatorios/Cadastros/Qrcodes' element={<QrcodesForm />} />
                  <Route path='/Relatorios/Cadastros/Servicos' element={<ServicosForm />} />
                  <Route path='/Relatorios/Cadastros/UnidadesAreas' element={<UnidadesAreasSubcategoriasForm />} />
                </Route>
                <Route path='/Relatorios/Transacoes' element={<RelatorioTransacoes />} >
                <Route path='/Relatorios/Transacoes/Administradores' element={<TransacaoAdministrador />} />
                  <Route path='/Relatorios/Transacoes/Alunos' element={<TransacaoAluno />} />
                  <Route path='/Relatorios/Transacoes/Eventos' element={<TransacaoEvento />} />
                  <Route path='/Relatorios/Transacoes/Produtos' element={<TransacaoProduto />} />
                  <Route path='/Relatorios/Transacoes/Promocoes' element={<TransacaoPromocao />} />
                  <Route path='/Relatorios/Transacoes/Qrcodes' element={<TransacaoQrcode />} />
                  <Route path='/Relatorios/Transacoes/Servicos' element={<TransacaoServico />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
