import * as React from 'react';
import {Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Private } from './pages/Private';
import { RequireAuth } from './contexts/Auth/RequireAuth';
import { AuthContext } from './contexts/Auth/AuthContext';

function App() {
  const auth = React.useContext(AuthContext);
  const navigate = useNavigate(); /* usando navigate para redirecionar para o home após logout */

  const handleLogout = async () => {
    await auth.signout();
    window.location.href = window.location.href;
    /* navigate('/'); */ /* redirecionando para o home */
  }

  return (
    <div className="App">
      <header>
        <h1>
          Cabeçalho do projeto
        </h1>
        <nav>
          <Link to="/">Home</Link>{ ' ' }
          <Link to="/private">Página Privada</Link>
          {auth.user && <a href='#' onClick={handleLogout}>Sair</a>}
        </nav>
      </header>
      <hr />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* então enviamos o componente private pra dentro do requireAuth */}
        <Route path="/private" element={<RequireAuth><Private/></RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
