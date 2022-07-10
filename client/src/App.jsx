import React, { useState } from 'react'
import './App.css';
import { BrowserRouter as Router,  Routes, Route, Navigate } from 'react-router-dom';
import RequireAuth from 'auth/protectedRoutes/protectedRoutes';
import { AuthContext } from 'contexts/authContext';

// Components
import TelaLogin from './pages/login/login';
import EsqueceuSenha from './pages/login/components/esqueceuSenha/esqueceuSenha';
import FormLogin from './pages/login/components/formLogin/formLogin';
import Dashboard from './pages/dashboard/dashboard';
import CadUsuario from 'pages/cadUsuario/cadUsuario';
import CadItem from 'pages/cadItem/cadItem';
import CadPromocao from 'pages/cadPromocao/carPromocao';
import CadQrcode from 'pages/cadQrcode/cadQrcode';
import GerUsuario from 'pages/gerUsuario/gerUsuario';
import GerItem from 'pages/gerItem/gerItem';
import GerQrcode from 'pages/gerQrcode/gerQrcode';
import Layout from 'common/layout/layout';
import Relatorios from 'pages/relatorios/relatorios';


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
              <Route path='/CadastroItem' element={<CadItem />} />
              <Route path='/CadastroPromocao' element={<CadPromocao />} />
              <Route path='/CadastroQrcode' element={<CadQrcode />} />
              <Route path='/GerenciarUsuarios' element={<GerUsuario />} />
              <Route path='/GerenciarItems' element={<GerItem />} />
              <Route path='/GerenciarQrcodes' element={<GerQrcode />} />
              <Route path='/Relatorios' element={<Relatorios />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
