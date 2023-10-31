/* tudo referente à requisição será feito aqui dentro */
import axios from "axios";
import { User } from "../types/User";

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {'Content-Type': 'application/json'}
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        /* 
            por hora a validação do token nao vamos fazer,
            vamos apenas verificar se o usuário já existe no Storage e se sim iremos retornar aqui
        */
        const retorno = {retuser: <User | null>(null)};
        let id = localStorage.getItem('user.id');
        let name = localStorage.getItem('user.name');
        let email = localStorage.getItem('user.email');

        if (id !== null) {
            retorno.retuser = { 'id': parseInt(id, 10), 'name': name, 'email': email } as User;
        }
        return retorno;
       
        /* return {
            user: {id: 3, name: "João", email: "joao@gmail.com"}
        } */
        /* const response = await api.post('/validate', {token});
        return response.data; */
    },
    signin: async (email: string, password: string, device_name: string) => {
        const ret = {ok: false, retuser: <User | null>(null), token: ''};

        try {
            /* await axios.get('/sanctum/csrf-cookie'); */

            const response = await api.post('/login', {email, password, device_name});
            /* consultando as informações do usuário */
            const usuario = await api.get('/usuarios/' + response.data.id, {
                headers: {Authorization: 'Bearer ' + response.data.token }
            });
            ret.ok = true;
            ret.token = response.data.token;
            ret.retuser = usuario.data.data;
            return ret;
        } catch (error) {
            console.log('Ocorreu o seguinte erro ao tentar realizar o login:');
            console.log(error);
            ret.ok = false;
            return ret;
        }
    },
    logout: async () => {
        /* se for fazer o logout então devemos retornar o status */
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
})

/* lá fora iremos usar apenas essas funções */