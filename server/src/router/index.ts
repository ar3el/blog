import { Router } from 'express';
import { body, param } from 'express-validator';
import { AuthController, BlogController, UserController } from '../controller';
import { ApiError } from '../errors';
import AuthMiddlewares from '../middlewares/auth';

const router = Router();

router.post('/registration',
    body('name').isString(),
    body('password').isString(),
    AuthController.registration
);
router.post('/signin',
    body('name').isString(),
    body('password').isString(),
    AuthController.signin
);
router.post('/refresh', AuthController.refresh);
router.post('/signout', AuthController.signout);
router.get('/users', AuthMiddlewares, UserController.getAllUsers);
router.get('/blogs', BlogController.getBlogs);
router.get('/blog/:blogId',
    param('blogId').isInt({ gt: 0 }),
    BlogController.getBlog
);
router.use('*', () => { throw ApiError.NotFound(); })
export default router;
