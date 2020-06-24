import express from 'express';
import { Joi, celebrate } from 'celebrate';

import multer from 'multer';
import multerConfig from './config/multer';

import ClassesController from './controller/ClassesController';
import ActivitiesController from './controller/ActivitiesController';

const routes = express.Router();
const upload = multer(multerConfig);

const classesController = new ClassesController();
const activitiesController = new ActivitiesController();

routes.get('/activities', activitiesController.index);

routes.get('/classes', classesController.index);
routes.get('/classes/:id', classesController.show);

routes.post(
  '/classes',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        activities: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  classesController.create,
);

export default routes;
