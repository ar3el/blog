import { IBlog, IFullBlog } from '../types';
import { publicApi } from './http';

export async function fetchBlogs() {
    return publicApi.get<IBlog[]>('/blogs');
}

export async function fetchBlog(blogId: string) {
    return publicApi.get<IFullBlog>(`/blog/${blogId}`);
}