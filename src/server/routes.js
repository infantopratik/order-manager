'use strict'
import { Router } from 'express';
import * as UserController from './controllers/User.controller';
import * as OrderController from './controllers/Order.controller';

import authenticate from './middlewares/authenticate';

const router = new Router();

// User Routes
router.get('/user', UserController.getUser);
router.post('/user', UserController.createUser);
router.post('/login', UserController.login);
router.get('/checkToken', UserController.checkToken);
router.get('/user/details', authenticate, UserController.getDetails);
router.post('/logout', UserController.logout);

//Order Routes
router.post('/order', authenticate, OrderController.addOrder);
router.get('/orders', authenticate, OrderController.getAllOrders);

export default router;
