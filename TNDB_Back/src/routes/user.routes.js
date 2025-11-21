import { Router } from 'express';

import * as signUpCtrl from '../controllers/users/signUp';
import * as signInCtrl from '../controllers/users/signIn';
import * as signOutCtrl from '../controllers/users/logout';
import * as getProfileCtrl from "../controllers/users/getProfile"
import { authMiddleware } from '../middlewares/auth';
import { MulterUpload } from "../middlewares/upload"

const routes = new Router();

routes.post('/signUp', MulterUpload, signUpCtrl.signUp);
routes.post('/signIn', signInCtrl.signIn);
routes.post('/signOut', authMiddleware, signOutCtrl.logout);
routes.get('/profile',authMiddleware, getProfileCtrl.getProfile);




export default routes;