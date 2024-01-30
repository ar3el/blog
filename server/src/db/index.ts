import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

interface IBlog {
    id: number,
    title: string,
    image: string,
    paragraphs: string[]
}

interface IUser {
    id: number,
    name: string,
    password: string
}

interface IUserToken {
    userId: number,
    refreshToken: string | null,
}

interface IDB {
    blogs: IBlog[]
    users: IUser[],
    userTokens: IUserToken[]
}

class DB {
    private db: IDB;
    private pathname: string;

    constructor(pathname: string) {
        this.pathname = path.format({dir: __dirname, base: pathname});
        this.db = JSON.parse(readFileSync(this.pathname, 'utf-8'))
    }

    async userfindOne(name: string) {
        return this.db.users.find((user:IUser) => user.name === name);
    }

    async userAll() {
        return this.db.users.map(user => ({ name: user.name, id: user.id }));
    }

    async userCreate(user: Omit<IUser, 'id'>) {
        const id = this.db.users.length + 1;
        const length = this.db.users.push({...user, id }) || 0;
        writeFileSync(this.pathname, JSON.stringify(this.db, null, " "));
        return this.db.users[length - 1];
    }

    async userRefreshTokenSave(userId: number, refreshToken: string | null) {
        const user = this.db.userTokens.find(user => user.userId === userId);
        if (user) {
            user.refreshToken = refreshToken;
        } else {
            this.db.userTokens.push({ userId, refreshToken });
        }
        writeFileSync(this.pathname, JSON.stringify(this.db, null, " "));
    }

    async userRefreshTokenDelete(refreshToken: string) {
        const userTokens = this.db.userTokens.filter(user => user.refreshToken !== refreshToken);
        this.db.userTokens = userTokens;
        writeFileSync(this.pathname, JSON.stringify(this.db, null, " "));
    }

    async userRefreshTokenFind(refreshToken: string) {
        const userTokens = this.db.userTokens.find(user => user.refreshToken === refreshToken);
        return userTokens && userTokens.refreshToken || null;
    }

    async blogsAll() {
        return this.db.blogs.map(blog => {
            return {
                id: blog.id,
                title: blog.title,
                image: `http://localhost:${process.env.PORT}/static/${blog.image}`
            }
        });
    }

    async blogFindOne(blogId: number) {
        const blog = this.db.blogs.find(blog => blog.id === blogId);
        if (!blog) {
            return blog;
        }

        return {
            id: blog.id,
            title: blog.title,
            image: `http://localhost:${process.env.PORT}/static/${blog.image}`,
            paragraphs: blog.paragraphs
        }
    }
}

export default new DB('./db.json');
