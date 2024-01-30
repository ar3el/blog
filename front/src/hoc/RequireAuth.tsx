import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type Props = { children: ReactElement }

export function RequireAuth({ children }: Props) {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to='/login' replace={true} state={{fromPage: location.pathname}} />
    }

    return children;
}