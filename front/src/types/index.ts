interface IUser {
    id: number
    name: string
}

interface IUserContext {
    user: IUser | null
    signin: (username: string, password: string, cb: (error?: string) => void) => void
    signout: (cb: (error?: string) => void) => void
}

interface IAuthResponse {
    acessToken: string,
    user: IUser
}

interface IBlog {
    id: string,
    image: string,
    title: string
}

interface IFullBlog extends IBlog {
    paragraphs: string[]
}

export type {
    IUser,
    IUserContext,
    IAuthResponse,
    IBlog,
    IFullBlog
}