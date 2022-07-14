import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon, { SinonStub } from 'sinon';
import  carService from '../../../services/carServices';

describe('Test all service functions', () => {
  describe('Test create car function', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves({
        model: "Gol",
        year: 2000,
        color: 'white',
        buyValue: 40000,
        doorsQty: 4,
        seatsQty: 5,
        _id: '62c87efaf1f9d111bf4b6acc',
        v: 'vvvv',
      });
    });

    after(() => {
      (Model.create as SinonStub).restore();
    });
    it('test if create car was complete', async () => {
      const result = await carService.createCars({
        model: "Gol",
        year: 2000,
        color: 'white',
        buyValue: 40000,
        seatsQty: 5,
        doorsQty: 4,
      });

      expect(result).to.be.deep.equal({
        model: "Gol",
        year: 2000,
        color: 'white',
        buyValue: 40000,
        doorsQty: 4,
        seatsQty: 5,
        _id: '62c87efaf1f9d111bf4b6acc',
        v: 'vvvv',
      });
    });
  });

  describe('Test getbyid function', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([
        {
          _id: '62c87efaf1f9d111bf4b6acc',
          model: "Gol",
          year: 2000,
          color: 'white',
          buyValue: 40000,
          doorsQty: 4,
          seatsQty: 5,
        },
      ]);
    });

    after(() => {
      (Model.find as SinonStub).restore();
    });
    it('if cars returns', async () => {
      const result = await carService.getById();

      expect(result).to.be.deep.equal([
        {
          _id: '62c87efaf1f9d111bf4b6acc',
          model: "Gol",
          year: 2000,
          color: 'white',
          buyValue: 40000,
          doorsQty: 4,
          seatsQty: 5,
        },
      ]);
    });
  });

  describe('test cardid function', () => {
    after(() => {
      (Model.findOne as SinonStub).restore();
    });
    it('return car by id', async () => {
      sinon.stub(Model, 'findOne').resolves({
        model: "Gol",
        year: 2000,
        color: 'white',
        buyValue: 40000,
        doorsQty: 4,
        seatsQty: 5,
        _id: '62c87efaf1f9d111bf4b6acc',
        v: 'vvvv',
      });
      const result = await carService.carId('62c87efaf1f9d111bf4b6acc');

      expect(result).to.be.deep.equal({
        model: "Gol",
        year: 2000,
        color: 'white',
        buyValue: 40000,
        doorsQty: 4,
        seatsQty: 5,
        _id: '62c87efaf1f9d111bf4b6acc',
        v: 'vvvv',
      });
    });
    it('return error if car not found', async () => {
      (Model.findOne as SinonStub).restore();
      sinon.stub(Model, 'findOne').resolves(null);
      try {
        await carService.carId('62c87efaf1f9d111bf4b6acc');
        expect.fail();
      } catch (error) {
        expect((error as Error).message).to.be.equal('Object not found');
      }
    });
  });

  describe('test updatecars function', () => {
    before(() => {
      sinon.stub(Model, 'findByIdAndUpdate').resolves({
        _id: '62c87efaf1f9d111bf4b6acc',
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'findById').resolves({
        _id: '62c87efaf1f9d111bf4b6acc',
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        doorsQty: 4,
        seatsQty: 5,
      });
    });

    after(() => {
      (Model.findByIdAndUpdate as SinonStub).restore();
      (Model.findById as SinonStub).restore();
    });
    it('test if cars can be updated', async () => {
      const result = await carService.updateCars('62c87efaf1f9d111bf4b6acc', {
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        seatsQty: 5,
        doorsQty: 4,
      });

      expect(result).to.be.deep.equal({
        _id: '62c87efaf1f9d111bf4b6acc',
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        doorsQty: 4,
        seatsQty: 5,
      });
    });
  });

  describe('test delete car functions', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves({
        _id: '62c87efaf1f9d111bf4b6acc',
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'findById').resolves({
        _id: '62c87efaf1f9d111bf4b6acc',
        model: 'Uno com escada',
        year: 2001,
        color: 'blue',
        buyValue: 100000,
        doorsQty: 4,
        seatsQty: 5,
      });
    });

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();
      (Model.findById as SinonStub).restore();
    });
    it('test if able to delete a car', async () => {
      const result = await carService.deleteCars('62c87efaf1f9d111bf4b6acc');

      expect(result).to.be.deep.equal({
        _id: '62c87efaf1f9d111bf4b6acc',
        buyValue: 100000,
        color: 'blue',
        doorsQty: 4,
        model: 'Uno com escada',
        seatsQty: 5,
        year: 2001,
      });
    });
    it('test trow error if not able to delete', async () => {
      (Model.findById as SinonStub).restore();
      sinon.stub(Model, 'findById').resolves(null);
      try {
        await carService.deleteCars('62c87efaf1f9d111bf4b6acc');
        expect.fail();
      } catch (error) {
        expect((error as Error).message).to.be.equal('Object not found');
      }
    });
  });
});