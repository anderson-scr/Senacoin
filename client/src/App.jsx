import './App.css';
import { BrowserRouter as Router,  Routes, Route, Navigate } from 'react-router-dom';

// Components
import TelaLogin from './pages/login/index';
import EsqueceuSenha from './pages/login/components/esqueceuSenha/esqueceuSenha';
import FormLogin from './pages/login/components/formLogin/formLogin';
import Home from './pages/home';

// Auth
import RequireAuth from './auth/protectedRoute/protectedRoute';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path='/' element={<TelaLogin />}>
          <Route path='/Login' element={<FormLogin />} />
          <Route path='/EsqueceuSenha' element={<EsqueceuSenha />} />
        </Route>


        {/* Protect this route */}
        <Route element={<RequireAuth />}>
          <Route path='/Home' element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
