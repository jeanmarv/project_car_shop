import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CarSchema } from '../interfaces/CarInterface';
import carService from '../services/carServices';

const message = 'Id must have 24 hexadecimal characters';
const CarController = {

  createCars: async (req: Request, res: Response) => {
    const car = req.body;
    
    try {
      const createdCar = await carService.createCars(car);
      res.status(201).json(createdCar);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const getCar = await carService.getById();
      res.status(200).json(getCar);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },

  carId: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res
        .status(400).json({ error: message });
    }

    try {
      const car = await carService.carId(id);
      return res.status(200).json(car);
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  },

  deleteCars: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res
        .status(400).json({ error: message });
    }

    try {
      await carService.deleteCars(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  },

  updateCars: async (req: Request, res: Response) => {
    const { id } = req.params;

    if (id.length !== 24) {
      return res
        .status(400).json({ error: message });
    }

    const car = req.body;

    try {
      CarSchema.parse(car);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }

    try {
      const allCars = await carService.updateCars(id, car);
      return res.status(200).json(allCars);
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  },
};

export default CarController;