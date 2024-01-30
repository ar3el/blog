import { IUser } from '../types';
import { privateApi } from './http';

export async function fetchUsers() {
    return privateApi.get<IUser[]>('/users');
}