import './styles/App.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/auth/AuthGuard';


function App() {

  return (

    <BrowserRouter>
      <AuthProvider>
        <AuthGuard />
      </AuthProvider>
    </BrowserRouter>

  );
}

export default App
