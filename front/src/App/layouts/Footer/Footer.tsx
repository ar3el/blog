import './Footer.css';

export function Footer() {
    return (
        <footer className='footer'>
            <p>Тестовый сайт</p>
            <p>
                <span>Исходный код сайта: </span>
                <a rel='noreferrer' target='_blank' href='https://github.com/axios/axios#axios-api'>github</a>
            </p>
        </footer>
    )
}