import { expect } from 'chai';
import * as sinon from 'sinon';
import { Car } from '../../../interfaces/CarInterface';
import CarSchema from '../../../models/carModel'

const carMock: Car = {
  model: "Gol",
  year: 2000,
  color: "white",
  status: true,
  buyValue: 40000,
  doorsQty: 4,
  seatsQty: 5,
}

describe('Test function that creates new car', () => {
  before(() => {
    sinon.stub(CarSchema, 'create').resolves(carMock);
  });

  after(() => {
    (CarSchema.create as sinon.SinonStub).restore();
  });

  it('car created successfully verification', async () => {
    const createCar = await CarSchema.create(carMock);
    expect(createCar).to.be.deep.equal(carMock);
  });
});