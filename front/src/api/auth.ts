import { IAuthResponse } from '../types';
import { privateApi } from './http';

export async function signin(username: string, password: string) {
    return privateApi.post<IAuthResponse>('/signin', { name: username, password })
        .catch(error => {
            if (error.message) {
                throw new Error(error.message);
            } else if (error.request) {
                throw new Error(error.request);
            } else if (error.response?.data?.message) {
                throw new Error(error.response?.data?.message);
            }
            throw error;
        });
}

export async function signout() {
    return privateApi.post<void>('/signout');
}