import { Car, CarSchema } from '../interfaces/CarInterface';
import CarSquema from '../models/carModel';

const notfound = 'Object not found';
const carService = {
  createCars: async (car: Car) => {
    CarSchema.parse(car);
    return CarSquema.create(car);
  },
  getById: async () => CarSquema.find(),
  carId: async (id: string) => {
    const car = await CarSquema.findById(id);
    if (!car) {
      throw new Error(notfound);
    }
    return car;
  },
  deleteCars: async (id: string) => {
    const car = await CarSquema.findById(id);
    if (!car) {
      throw new Error(notfound);
    }
    return CarSquema.findByIdAndDelete(id);
  },
  updateCars: async (id: string, car: Car) => {
    const carDb = await CarSquema.findById(id);
    if (!carDb) {
      throw new Error(notfound);
    }
    CarSchema.parse(car);
    return CarSquema.findByIdAndUpdate(id, car, { new: true });
  },
};

export default carService;