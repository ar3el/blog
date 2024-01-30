import { createContext, PropsWithChildren, useContext } from 'react';

import { IUserContext } from '../types'
import { useUser } from '../hooks/useUser'
import api from '../api'

const AuthContext = createContext<IUserContext>({
    user: null,
    signin: () => {throw new Error('The component does not wrap "AuthProvider"')},
    signout: () => {throw new Error('The component does not wrap "AuthProvider"')}
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useUser();
    
    const signin: IUserContext['signin'] = async (username, password, cb) => {
        try {
            const response = await api.auth.signin(username, password);
            localStorage.setItem('acessToken', response.data.acessToken);
            setUser(response.data.user);
            cb();
        } catch (error) {
            cb((error as any).message);
        }
    }

    const signout: IUserContext['signout'] = async (cb) => {
        try {
            setUser(null);
            await api.auth.signout();
            localStorage.removeItem('acessToken');
            cb();
        } catch (error) {
            cb((error as any).response?.data?.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}