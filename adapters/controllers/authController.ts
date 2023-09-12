import { NextFunction, Request, Response } from 'express';
import { authenticationRequiredOkta, createUserOkta, getUserOkta} from '../../infrastructure/middleware/middleware';
import userRepository from '../repositories/userRepository';
import {User} from '../../application/models/User';
import * as responseHandler from './handlers/responseHandler';

async function getUserByClaims(username: string): Promise<User | null> {
    if (!username) {
        throw new Error('Invalid username provided');
    }
    return userRepository.getUserByUsername(username);
}

async function createUserFromClaims(userModel: User): Promise<void> {
    if (!userModel) {
        throw new Error('Invalid claims provided');
    }
    await userRepository.createUser(userModel);
}

async function handleVerifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userClaims = await authenticationRequiredOkta(req, res, next);

        if (!userClaims) {
            throw new Error('User not found for this token');
        }
        responseHandler.success(res,userClaims,'Token validated successfully');
    } catch (error) {
        responseHandler.serverError(res,error);
    }
}

async function handlerLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const { username } = req.body;
        const user = await getUserByClaims(username);
        if (!user) {
            const message = 'user not exist in DB';
            responseHandler.notFoundError(res, message);
        }
        const userOkta = await getUserOkta(username);
        if (!userOkta) {
            const message = 'user not exist in OKTA';
            responseHandler.notFoundError(res, message);
        }
        const userClaims = await authenticationRequiredOkta(req, res, next);
        if (!userClaims) {
            throw new Error('User not found for this token');
        }
        responseHandler.success(res,userClaims,'Token validated successfully');
    } catch (error) {
        responseHandler.serverError(res,error);
    }
}

async function handlerCreateUser(req: Request, res: Response): Promise<void> {
    try {
        const { username } = req.body;
        const user = await getUserByClaims(username);

        if (user) {
            const message = 'already exists';
            responseHandler.conflictError(res, new Error(message),message);
        }

        //reateUserOkta devuelve un usuario, no un objeto con claims
        const userOkta = await createUserOkta(req);

        if (!userOkta) {
            throw new Error('Error creating user');
        }
        let userModel: User = req.body;
        await createUserFromClaims(userModel);
        responseHandler.successCreated(res,userModel,'User created successfully');
    } catch (error) {
        responseHandler.serverError(res,error);
    }
}

export default {
    async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await handleVerifyToken(req, res, next);
        } catch (error) {
            responseHandler.serverError(res,error);
        }
    },
    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await handlerLogin(req, res, next);
        } catch (error) {
            responseHandler.serverError(res,error);
        }
    },
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            await handlerCreateUser(req, res);
        } catch (error) {
            responseHandler.serverError(res,error);
        }
    }
};
