import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';
import FilesController from '../controllers/FilesController';

import { basicAuthenticate, xTokenAuthenticate } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

const Routes = express.Router();

Routes.get('/status', AppController.getStatus);
Routes.get('/stats', AppController.getStats);

Routes.post('/users', UsersController.postNew);
Routes.get('/users/me', xTokenAuthenticate, UsersController.getMe);

Routes.get('/connect', basicAuthenticate, AuthController.getConnect);
Routes.get('/disconnect', xTokenAuthenticate, AuthController.getDisconnect);

Routes.post('/files', xTokenAuthenticate, FilesController.postUpload);
Routes.get('/files/:id', xTokenAuthenticate, FilesController.getShow);
Routes.get('/files', xTokenAuthenticate, FilesController.getIndex);
Routes.put('/files/:id/publish', xTokenAuthenticate, FilesController.putPublish);
Routes.put('/files/:id/unpublish', xTokenAuthenticate, FilesController.putUnpublish);
Routes.get('/files/:id/data', FilesController.getFile);

Routes.all('*', (req, res, next) => {
  errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
});

export default Routes;
