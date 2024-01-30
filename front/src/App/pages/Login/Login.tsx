import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../elements';

import './Login.css';

export function Login() {
    const { user, signin, signout } = useAuth();
    const navigate = useNavigate()
    const location = useLocation();

    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const loginHandler = (event: any) => {
        event.preventDefault();
        signin(name, password, error => {
            if (error) {
                console.error(error);
                setErrorMessage(error);
            } else {
                const fromPage = location.state?.fromPage || '/'
                console.log('fromPage', fromPage);
                navigate(fromPage === '/login' ? '/' : fromPage);
                setErrorMessage(null);
            }
        });
    }

    const logoutHandler = () => {
        signout(() => {

        })
    }

    if (user) {
        return (
            <>
                <p>{user.name}</p>
                <button onClick={logoutHandler}>logout</button>
                <Link to={'/admin'}>Go to admin</Link>
            </>
        )
    } else {
        return (
            <div className='login-container'>
                <form className='login-form' onSubmit={loginHandler}>
                    <span className='login-form__title'>
                        Войти в личный кабинет
                    </span>
                    <label className='login-form__input-label'>Имя</label>
                    <input
                        className='login-form__input' 
                        type="text"
                        placeholder='Введите admin'
                        autoComplete="username"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    <label className='login-form__input-label'>Пароль</label>
                    <input
                        className='login-form__input'
                        placeholder='Введите admin'
                        type="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <Button className='login-form__button' type='submit'>Войти</Button>
                    {errorMessage &&
                        <div className='login-form__error'>
                            Ошибка: {errorMessage}
                        </div>
                    }
                </form>
            </div>
        )
    }
}