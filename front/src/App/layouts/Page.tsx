import { Outlet } from 'react-router-dom';

import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import './Page.css';

export function Page() {
    return (
        <div className='layout'>
            <Header />
            <main className='main'><Outlet /></main>
            <Footer />
        </div>
    )
}