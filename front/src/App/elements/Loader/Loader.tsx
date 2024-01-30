import './Loader.css';

export function Loader() {
    return (
        <div className='loader-container'>
            <div className='loader'>
                <span>Идет загрузка</span>
                <span className='spinner'></span>
            </div>
        </div>
    )
}