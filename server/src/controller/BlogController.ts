import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ApiError } from '../errors';
import { BlogService } from '../service';

class BlogController {
    async getBlogs(req: Request, res: Response, next: NextFunction) {
        try {
            const blogs = await BlogService.getAllBlogs();
            return res.header({ 'Cache-Control': 'max-age=604800' }).json(blogs);
        } catch (error) {
            next(error);
        }
    }

    async getBlog(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.ValidationError(errors.array())
            }
            const { blogId } = req.params;
            const blog = await BlogService.getBlog(blogId);
            return res.header({ 'Cache-Control': 'max-age=604800' }).json(blog);
        } catch (error) {
            next(error);
        }
    }
}

export default new BlogController();