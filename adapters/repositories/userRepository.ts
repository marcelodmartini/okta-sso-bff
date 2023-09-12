import { User } from '../../application/models/User';
import UserModel from './daos/userModel';
import { Model, DataTypes, BuildOptions } from 'sequelize';

async function getUserByUsername(username: string): Promise<User | null> {
    try {
        const user = await UserModel.findOne({ where: { username } });
        
        if (user) {
            // Realiza una conversión segura de tipos
            return user.toJSON() as unknown as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al obtener el usuario por username:', error);
        throw error;
    }
}

export const createUser = async (user: User): Promise<User> => {
    try {
        const newUser = await UserModel.create({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            refreshToken: user.refreshToken,
            username: user.username
        });
        return newUser.toJSON() as User;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}

export default {
    getUserByUsername,
    createUser,
};
