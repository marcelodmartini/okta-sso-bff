import { Request, Response, NextFunction } from 'express';
import { oktaJwtVerifier, oktaClient } from '../config/infrastructure';
import { User as OktaUser } from '@okta/okta-sdk-nodejs';
import {User} from '../../application/models/User';

async function authenticationRequiredOkta(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).send({ error: 'Token not provided' });
    }

    const [authType, token] = authorization.trim().split(' ');

    if (authType !== 'Bearer') {
        return res.status(401).send({ error: 'Expected a Bearer token' });
    }

    try {
        const { claims } = await oktaJwtVerifier.verifyAccessToken(token, 'api://default');
        return claims;
        next();
    } catch (error: any) { 
        console.error('Error creating user:', error.message);
    }
}

async function createUserOkta( req: Request ) {
    try {
        const { firstName, lastName, email, username, password } = req.body;
       // createUserOkta espera un objeto User, por lo que necesitas crearlo primero
       const newUser = {
            profile: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                login: username
            },
            credentials: {
                password: {
                    value: password
                }
            }
        };
        oktaClient
        //oktaClient.userApi.getRefreshTokenForUserAndClient
        return await oktaClient.userApi.createUser({ body: newUser });
    } catch (error: any) { // Anotación de tipo 'any' para 'error'
        console.error('Error creating user in Okta:', error.message);
    }
}

async function getUserOkta( username: string ) {
    let user = await oktaClient.userApi.getUser({ userId: username });
    console.log(user);
    return user;
}


export { authenticationRequiredOkta, createUserOkta, getUserOkta };