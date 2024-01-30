import { Link } from 'react-router-dom';

import './BlogCard.css';

interface Props {
    id: string,
    image: string
    title: string
}
export function BlogCard({ image, title, id }: Props) {
    return (
        <div className="blog-card">
            <Link to={`blog/${id}`}>
                <img className='blog-card__image' src={image} alt='' />
                <div className='blog-card__title'>
                    {title}
                </div>
            </Link>
        </div>
    )
}