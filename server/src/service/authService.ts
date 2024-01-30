import bcrypt from 'bcrypt';
import DB from '../db';
import { ApiError } from '../errors';
import TokenService from './tokenService';

class AuthService {
    async registration(name: string, password: string) {
        const user = await DB.userfindOne(name);
        if (user) {
            throw ApiError.BadRequest(`Person with name=${name} already exists`);
        }
        
        const hashPassword = await bcrypt.hash(password, 2);
        const newUser = await DB.userCreate({ name, password: hashPassword });
        const tokens = TokenService.generateTokens({ name: newUser.name, id: newUser.id });
        await DB.userRefreshTokenSave(newUser.id, tokens.refreshToken);
    
        return {
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: newUser.id,
                name: newUser.name
            }
        };
    }

    async signin(name: string, password: string) {
        const user = await DB.userfindOne(name);
        if (!user) {
            throw ApiError.BadRequest(`Invalid name or password`);
        }

        const isPasswordEquals = await bcrypt.compare(password, user.password);
        if (!isPasswordEquals) {
            throw ApiError.BadRequest(`Invalid name or password`);
        }

        const tokens = TokenService.generateTokens({ name: user.name, id: user.id });
        await DB.userRefreshTokenSave(user.id, tokens.refreshToken);
        
        return {
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                name: user.name
            }
        };
    }

    async refresh(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }

        const userFromToken = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await DB.userRefreshTokenFind(refreshToken);
        if (!userFromToken || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await DB.userfindOne(userFromToken.name);
        if (!user) {
            throw ApiError.UnauthorizedError();
        }

        const tokens = TokenService.generateTokens({ name: user.name, id: user.id });
        await DB.userRefreshTokenSave(user.id, tokens.refreshToken);
        
        return {
            acessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                name: user.name
            }
        };

    }

    async signout(refreshToken: string) {
        await DB.userRefreshTokenDelete(refreshToken);
    }
}

export default new AuthService();