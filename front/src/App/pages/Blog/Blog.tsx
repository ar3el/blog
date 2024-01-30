import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import { IFullBlog } from '../../../types';
import { Loader, Oops } from '../../elements';

import './Blog.css';

export function Blog() {
    let params = useParams<{blogId: string}>();
    const blogId = params.blogId;
    const [isLoading, setIsLoading] = useState(true);
    const [blog, setBlog] = useState<IFullBlog>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await api.blog.fetchBlog(blogId!);
                if (!isCancelled) {
                    setBlog(result.data);
                }
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };

        if (blogId) {
            fetchData();
        }
        return () => {
            isCancelled = true;
        }
    }, [blogId])

    if (isLoading) {
        return <Loader />;
    }

    if (!blog || !blogId || isError) {
        return <Oops />;
    }

    const paragraphs = blog.paragraphs.map(paragraph => {
        return (
            <p>{paragraph}</p>
        )
    })

    return (
        <div className='blog'>
            <img className='blog__image' src={blog.image} alt='' />
            <div className='blog__content'>
                <div className='blog__title'>{blog.title}</div>
                <article className='blog__paragraphs'>{paragraphs}</article>
            </div>
        </div>
    );
}