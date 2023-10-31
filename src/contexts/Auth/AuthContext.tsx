import * as React from 'react';
import { createContext } from 'react';
import { User } from '../../types/User';

/* quando vc usa o export vc pode usar em outros lugares */
/* type determina qual o tipo que terá aqui dentro do context */
export type AuthContextType = {
    user: User | null; /* se não tiver usuario logado será null */
    signin: (email: string, password: string, device_name: string) => Promise<boolean>;
    signout: () => void;
}

/* exclamação aqui só vai parar a reclamação */
export const AuthContext = createContext<AuthContextType>(null!); 