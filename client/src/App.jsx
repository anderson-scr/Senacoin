import './App.css';
import { BrowserRouter as Router,  Routes, Route } from 'react-router-dom';
import TelaLogin from './pages/login/index';
import EsqueceuSenha from './pages/login/components/esqueceuSenha/esqueceuSenha';
import FormLogin from './pages/login/components/formLogin/formLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TelaLogin />}>
          <Route path='/' element={<FormLogin />} />
          <Route path='EsqueceuSenha' element={<EsqueceuSenha />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
