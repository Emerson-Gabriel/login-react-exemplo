/* tudo referente à requisição será feito aqui dentro */
import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: {id: 3, name: "João", email: "joao@gmail.com"}
        }
        /* por hora a validação do token nao vamos fazer */
        /* const response = await api.post('/validate', {token});
        return response.data; */
    },
    signin: async (email: string, password: string) => {
        return {
            user: {id: 3, name: "João", email: "joao@gmail.com"},
            token: '987564564867453'
        }

        const response = await api.post('/signin', {email, password});
        return response.data;
    },
    logout: async () => {
        /* se for fazer o logout então devemos retornar o status */
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
})

/* lá fora iremos usar apenas essas funções */