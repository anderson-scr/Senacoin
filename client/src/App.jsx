import React, { useState, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router,  Routes, Route, Navigate } from 'react-router-dom';

// Components
import TelaLogin from './pages/login/index';
import EsqueceuSenha from './pages/login/components/esqueceuSenha/esqueceuSenha';
import FormLogin from './pages/login/components/formLogin/formLogin';
import Home from './pages/home';
import RequireAuth from 'auth/protectedRoutes/protectedRoutes';
import Layout from 'common/layout/layout';
import { AuthContext } from 'contexts/authContext';


function App() {
  const [userAuth, setUserAuth] = useState(localStorage.accessToken? true : false);

  useEffect(() => {
    localStorage.accessToken? console.log('yes') : console.log('no')
  }, [])

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
          <Route path='/' element={<Navigate replace to='/Home' />} />
          <Route path='/' element={<RequireAuth />} >
            <Route path='/' element={<Layout />}>
              <Route path='/Home' element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
