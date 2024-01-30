import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useRef, useState } from 'react';

import './Header.css';
import Logo from '../../../icons/logo.svg';

import { useAuth } from '../../../context/AuthContext';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

export function Header() {
    const { user, signout } = useAuth();
    const navigate = useNavigate();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);

    const logout = () => {
        setOpenProfileMenu(false);
        signout(() => {});
    }

    const goToAdmin = () => {
        setOpenProfileMenu(false);
        navigate('/admin');
    }

    const ref = useRef(null);
    const outsideClickHandler = useCallback(() => {
        setOpenProfileMenu(false);
    }, []);
    useOutsideClick(ref, outsideClickHandler);

    let profileMenu;
    if (openProfileMenu) {
        profileMenu = (
            <ul className='profile-menu'>
                <li onClick={goToAdmin}>Aдмин панель</li>
                <li onClick={logout}>Выйти</li>
            </ul>
        )
    }

    return (
        <header className='header'>
            <div className='header__item'>
                <Link to={'/'}>
                    <img className='header__item-logo' src={Logo} alt='Logotype' />
                </Link>
            </div>
            <div className='header__item'>
                <Link className='header__item-link' to={'/'}>Главная</Link>
            </div>
            <div className='header__item'>
                { user ?
                    <div className='header-item__profile' ref={ref}>
                        <span onClick={() => {
                            setOpenProfileMenu(prevOpen => !prevOpen)
                        }}>Профиль</span>
                        {profileMenu}
                    </div>
                    :<Link className='header__item-link' to={'/login'}>Войти</Link>
                }
            </div>
        </header>
    )
}