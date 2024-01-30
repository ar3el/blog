import axios from 'axios';
import { IAuthResponse } from '../types';

const BASE_API_URL = 'http://localhost:3001/api'

const privateApi = axios.create({ baseURL: BASE_API_URL });
const publicApi = axios.create({ baseURL: BASE_API_URL });

privateApi.interceptors.request.use(
    request => {
        request.headers['Authorization'] = `Bearer ${localStorage.getItem('acessToken')}`
        return request;
    }
)

privateApi.interceptors.response.use(
    response => response,
    async error => {
        if (error.response?.status === 403 && error.config && !error.config._isRetry) {
            error.config._isRetry = true;
            const response = await privateApi.post<IAuthResponse>('refresh', { withCredentials: true});
            const acessToken = response.data.acessToken;
            localStorage.setItem('acessToken', acessToken);
            return privateApi.request(error.congif);
        }
        throw error;
    }
)
export { privateApi, publicApi }