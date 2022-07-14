import { Router } from 'express';
import CarController from '../controllers/carController';

const routes = Router();

routes.post('/cars', CarController.createCars);
routes.get('/cars', CarController.getById);
routes.get('/cars/:id', CarController.carId);
routes.delete('/cars/:id', CarController.deleteCars);
routes.put('/cars/:id', CarController.updateCars);

export default routes;