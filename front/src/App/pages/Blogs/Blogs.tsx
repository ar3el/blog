import { useEffect, useState } from 'react';
import api from '../../../api';
import { IBlog } from '../../../types';
import { Loader, Oops } from '../../elements';
import { BlogCard  } from './BlogCard/BlogCard';

import './Blogs.css';

export function Blogs() {

    const [blogs, setBlogs] = useState<IBlog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        const fetchBlogs = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const response = await api.blog.fetchBlogs();
                if (!isCancelled) {
                    setBlogs(response.data);
                }
            } catch (error) {
                setIsError(true);
            }
            
            setIsLoading(false);
        }

        fetchBlogs();
        return () => {
            isCancelled = true;
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <Oops />;
    }

    const Blogs = blogs.map(blog =>
        <BlogCard
            key={blog.id}
            id={blog.id}
            image={blog.image}
            title={blog.title}
        />
    );

    return (
        <div className='blogs-container'>
            {Blogs}
        </div>
    )
}