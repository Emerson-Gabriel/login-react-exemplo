import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";

export const Private = () => {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h4>
                Página Privada
            </h4>
            Olá {auth.user?.name} bem vindo.
        </div>
    );
}