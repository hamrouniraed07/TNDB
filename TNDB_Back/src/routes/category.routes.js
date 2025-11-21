import { Router } from 'express';

const routes = new Router();

import * as categCtrl from '../controllers/categories/createCategory'
import * as getCategCtrl from '../controllers/categories/getCategories'


routes.post('/create', categCtrl.createCategories);
routes.get('/all', getCategCtrl.getCategories);

export default routes;
