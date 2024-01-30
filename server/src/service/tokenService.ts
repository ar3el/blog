import jwt, { JwtPayload } from 'jsonwebtoken';

interface ITokenPayload {
    id: number
    name: string
}

class TokenService {
    generateTokens(payload: ITokenPayload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET || '', { expiresIn: '30m' });
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET || '', { expiresIn: '30d' });
        
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken: string) {
        try {
            const jwtPayload = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET || '') as ITokenPayload & JwtPayload;
            return jwtPayload;
        } catch (dontCare) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const jwtPayload = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET || '') as ITokenPayload & JwtPayload;
            return jwtPayload;
        } catch (dontCare) {
            return null;
        }
    }
}

export default new TokenService();