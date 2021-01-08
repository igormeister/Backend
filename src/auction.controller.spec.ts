import { Test, TestingModule } from '@nestjs/testing';
import { AuctionController } from './client/client.controller';
import { AuctionService } from './client/client.service';
import { Model } from 'mongoose';

describe('AuctionController', () => {
  let Controller: AuctionController;
  let Service: AuctionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuctionController,],
      providers: [
        {
          provide: AuctionService,
          useValue: {
            getOne: jest.fn().mockResolvedValue([
              { auction_uuid: '323', price: '100', user_uuid: '123', name: 'name2', picture_url: 'url1', description: 'qwerty', redeemed: 1, time: 0 },
            ]),
          },
        },
      ],
    }).compile();

    Service = app.get(AuctionService);
    Controller = app.get(AuctionController);
  });

  describe('getAuctions', () => {
    it('should return an object of auctions', async () => {
      expect(Controller.getAuctions()).resolves.toEqual([{ auction_uuid: '323', price: '100', user_uuid: '123', name: 'name2', picture_url: 'url1', description: 'qwerty', redeemed: 1, time: 0 }]);
    });
  });
});