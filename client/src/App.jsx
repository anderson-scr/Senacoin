import React, { useState } from 'react'
import { BrowserRouter as Router,  Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from 'auth/protectedRoutes/protectedRoutes'
import { AuthContext } from 'contexts/authContext'

// General styles
import './App.css'
import 'common/style/tooTips.css'
import 'common/style/btns.css'

// Components
<<<<<<< HEAD
import TelaLogin from 'pages/login/login';
import EsqueceuSenha from 'pages/login/components/esqueceuSenha/esqueceuSenha';
import FormLogin from 'pages/login/components/formLogin/formLogin';
import Dashboard from 'pages/dashboard/dashboard';
import CadUsuario from 'pages/cadUsuario/cadUsuario';
import CadItem from 'pages/cadItem/cadItem';
import CadPromocao from 'pages/cadPromocao/carPromocao';
import CadQrcode from 'pages/cadQrcode/cadQrcode';
import GerUsuario from 'pages/gerUsuario/gerUsuario';
import GerItem from 'pages/gerItem/gerItem';
import GerQrcode from 'pages/gerQrcode/gerQrcode';
import Layout from 'common/layout/layout';
import Relatorios from 'pages/relatorios/relatorios';
import CadEvento from 'pages/cadItem/components/cadEvento/cadEvento';
import CadProduto from 'pages/cadItem/components/cadProdutos/cadProduto';
import CadServico from 'pages/cadItem/components/cadServico/cadServico';
import QrcodeLivre from 'pages/cadQrcode/components/qrcodeLivre';
import QrcodeVinculado from 'pages/cadQrcode/components/qrcodeVinculado';
import teste from 'pages/teste/teste';
import Teste from 'pages/teste/teste';
=======
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

>>>>>>> Diego

function App() {
  const [userAuth, setUserAuth] = useState(localStorage.accessToken? true : false);

  return (
    <Router>
      <AuthContext.Provider value={{
        userAuth, setUserAuth
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
              <Route path='/Relatorios' element={<Relatorios />} />
              <Route path='/Teste' element={<Teste />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
