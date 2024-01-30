import { useEffect, useState } from 'react';
import { IUser } from '../types'

export function useUser() {
    const [user, setUser] = useState<IUser | null>(() => {
        const userStr = localStorage.getItem('user') || 'null';
        let user: IUser | null = null;

        try {
            user = JSON.parse(userStr);
        } catch (dontCare) {}
        return user;
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user]);

    return [user, setUser] as const;
}
