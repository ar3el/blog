import DB from '../db';
import { ApiError } from '../errors';

class BlogService {
    async getAllBlogs() {
        return DB.blogsAll()
    }

    async getBlog(blogId: number | string) {
        const blog = await DB.blogFindOne(Number(blogId));
        if (!blog) {
            throw ApiError.BadRequest(`Blog not found`);
        }

        return blog;
    }
}

export default new BlogService();