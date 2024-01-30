import DB from '../db';

class UserService {
    async getAllUsers() {
        return DB.userAll()
    }
}

export default new UserService();