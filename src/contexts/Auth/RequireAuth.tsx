import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Login } from "../../pages/Login";

/* este children indica que terá um componente dentro deste componente  (neste caso será a página) */
export const RequireAuth = ({ children } : {children: JSX.Element}) => {
    /* aqui teremos que acessar o context para verificar se ja existe um usuario logado */
    const auth = useContext(AuthContext);
    /* aqui usamos o useContext que é um hook do proprio react */

    if (!auth.user){
        return <Login />;
    }

    return children;
}