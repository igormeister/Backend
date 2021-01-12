import {
    MongoMemoryServer
} from 'mongodb-memory-server';
import {
    Test,
    TestingModule
} from '@nestjs/testing';
import {
    AuctionController
} from './client/client.controller';
import {
    AuctionService
} from './client/client.service';
import {
    Model,
    Schema,
    Mongoose,
    mongo
} from 'mongoose';
import {
    Auction
} from './client/interfaces/client.interface';
import {
    AuctionDto
} from './client/dto/client.dto';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const rawData1: AuctionDto = {
    auction_uuid: '323',
    price: 100,
    user_uuid: '123',
    name: 'name2',
    picture_url: 'url1',
    description: 'qwerty',
    redeemed: false,
    time: 0
};

const schema = Object.keys(rawData1).reduce((res, key) => {return {...res, [key]: (typeof rawData1[key])}}, {});

describe('AuctionController', () => {
    const mongoose = new Mongoose();
    const mongoServer: MongoMemoryServer = new MongoMemoryServer();
    const AuctionModel: Model<Auction> = mongoose.model<Auction>('Auction', new Schema(schema));
    
    let auctionService: AuctionService;
    let auctionController: AuctionController;

    beforeAll(async () => {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoUri = await mongoServer.getUri();

        mongoose.connect(mongoUri, opts, async (err) => {
            if (err) throw err;
        });

        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuctionController],
            providers: [{
                provide: AuctionService,
                useValue: new AuctionService(AuctionModel)
            }, ],
        }).compile();

        auctionService = app.get(AuctionService);
        auctionController = app.get(AuctionController);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Setup initial model', () => {
        it('should add 1 client', async () => {
            const auction1 = new AuctionModel(rawData1);
            await expect(auction1.save()).resolves.toMatchObject(auction1);
        });

        it('model should have 1 item', async () => {
            await expect(AuctionModel.countDocuments().exec()).resolves.toBe(1);    
        })
    });

    describe('addAuction', () => {
        it('should add AuctionDto and return Auction object', async () => {
            await expect(auctionController.addAuction({
                ...rawData1,
                auction_uuid: '555', 
                user_uuid: '999' 
            })).resolves.toBeTruthy();
        });

        it('should find newly added Auction', async () => {
            await expect(auctionController.getAuction('555')).resolves.toMatchObject(
                await AuctionModel.findOne({ auction_uuid: '555' }).exec()
            );
        })
    });

    describe('getAuctions', () => {
        it('should return an array of Auctions objects', async () => {
            await expect(auctionController.getAuctions()).resolves.toMatchObject(
                await AuctionModel.find().exec()
            );
        });
    });

    describe('getAuction', () => {
        it('should return first Auction object by id', async () => {
            await expect(auctionController.getAuction('323')).resolves.toMatchObject(
                await AuctionModel.findOne({ auction_uuid: rawData1.auction_uuid }).exec()
            );
        });
    });

    describe('editAuction', () => {
        const auctionId = '323';
        const name = 'newName';

        it(`should edit ${auctionId} Auction and set new Auction.name = "${name}"`, async () => {
            await expect(auctionController.editAuction(auctionId, {
                ...rawData1,
                name
            })).resolves.toBeTruthy();
        });

        it(`should find ${auctionId} Auction and Auction.name must be = "${name}"`, async () => {
            await expect(auctionController.getAuction(auctionId)).resolves.toMatchObject({ name });
        });
    });

    describe('deleteAuction', () => {
        const auctionId = '323';

        it(`Auction ${auctionId} should exist in model collection`, async () => {
            await expect(auctionController.getAuction(auctionId)).resolves.toBeTruthy();
        });

        it(`should delete Auction by id: ${auctionId}`, async () => { 
            await auctionController.deleteAuction(auctionId)
        });

        it('deleted Auction should be missing in model collection', async () => {
            await expect(auctionController.getAuction(auctionId)).resolves.toBeFalsy();
        });
    })
});