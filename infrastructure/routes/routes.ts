import { Application } from "express";
import authController from '../../adapters/controllers/authController'; // Importa el objeto completo
import express, { Router } from 'express';


export default class Routes {
  constructor(app: Application) {
    // Routes
    const authRouter: Router = express.Router();
    authRouter.get('/token', authController.verifyToken); 
    authRouter.post('/login', authController.login); 
    authRouter.post('/user', authController.createUser); 
    //authRouter.post('/refresh-token', refreshToken);
    app.use('/auth', authRouter);
  }
}
