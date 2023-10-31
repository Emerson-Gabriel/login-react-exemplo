import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Login = () => {
    const auth = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email && password) {
            /* quem vai lidar com salvar token/validação e tudo mnais será o contet */
            const isLogged = await auth.signin(email, password);
            if (isLogged) {
                /* se o login foi efetuado então vamos redirecionar para a página inicial */
                navigate('/');
            } else {
                alert('Login ou senha inválido.');
            }
        }
    }

    return (
        <div>
            <h2>Página não acessível, realize o login.</h2>
            <form>
                <input type="text" value={email}  placeholder="Digite seu e-mail" onChange={e => setEmail(e.target.value)}/>
                <br />
                <input name="password" autoComplete="on" type="password" value={password}  placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/>
                <button onClick={handleLogin}>
                    Entrar
                </button>
            </form>
        </div>
    )
}