import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../../types/User";
import { useApi } from "../../hooks/useApi";

/* o provider vai usar o context para acessar os dados da aplicação */
export const AuthProvider = ({ children } : {children: JSX.Element }) => {
    /* iremos criar um State para monitorar o dado do usuario logado e alterar/controlar */
    const [user, setUser] = useState<User | null>(null);
    const api = useApi();

    /* useEfect é executado toda vez quando um componente é carregado */
    useEffect(() => {
        /* dentro da useEfect criamos a função abaixo para ser executada todas vez que o componente recarregar */
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                /* aqui ele valida se o Token é valido */
                const data = await api.validateToken(storageData);
                setUser(data.retuser);
                
                
                /* if (data.user.name) {

                } */
            }
        }
        validateToken();
    }, []);

    const signin = async (email: string, password: string, device_name: string) => {
        /* a requisição será feita aqui dentro */
        /* veja que aqui estamos usando os processos criados dentro do hook */
        const data = await api.signin(email, password, device_name);
        /* usando o await devemos colocar a função como async */
        if (data.ok) {
            setUser(data.retuser);
            if (data.retuser != null) {
                /* salvando o usuário no loclaStorage */
                localStorage.setItem('user.id', data.retuser.id.toString());
                localStorage.setItem('user.name', data.retuser.name);
                localStorage.setItem('user.email', data.retuser.email);
            }
            setToken(data.token);
            return true;
        }
        return false;
    }

    const signout = async () => {
        setUser(null);
        setToken('');/* limpando o token do Storage */
        await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children} {/* toda a aplicação vai dentro do provider */}
        </AuthContext.Provider>
    );
}