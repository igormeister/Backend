import {
    MongoMemoryServer
} from 'mongodb-memory-server';
import {
    Test,
    TestingModule
} from '@nestjs/testing';
import {
    BasketController
} from './client/client.controller';
import {
    BasketService
} from './client/client.service';
import {
    Model,
    Schema,
    Mongoose
} from 'mongoose';
import {
    Basket
} from './client/interfaces/client.interface';
import {
    BasketDto
} from './client/dto/client.dto';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const rawData1: BasketDto = {
    user_uuid: '112',
    auction_in_progress: 5,
    number_of_lots: 15,
    lot_uuid: '2222 2222 2222 2222',
    auction_uuid: '333'
};

const schema = Object.keys(rawData1).reduce((res, key) => {return {...res, [key]: (typeof rawData1[key])}}, {});

describe('BasketController', () => {
    const mongoose = new Mongoose();
    const mongoServer: MongoMemoryServer = new MongoMemoryServer();
    const BasketModel: Model<Basket> = mongoose.model<Basket>('Basket', new Schema(schema));
    
    let service: BasketService;
    let controller: BasketController;

    beforeAll(async () => {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoUri = await mongoServer.getUri();

        mongoose.connect(mongoUri, opts, async (err) => {
            if (err) throw err;
        });

        const app: TestingModule = await Test.createTestingModule({
            controllers: [BasketController],
            providers: [{
                provide: BasketService,
                useValue: new BasketService(BasketModel)
            }, ],
        }).compile();

        service = app.get(BasketService);
        controller = app.get(BasketController);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Setup initial model', () => {
        it('should add 1 item', async () => {
            const user1 = new BasketModel(rawData1);
            await expect(user1.save()).resolves.toMatchObject(user1);
        });

        it('model should have 1 item', async () => {
            await expect(BasketModel.countDocuments().exec()).resolves.toBe(1);    
        })
    });

    describe('getBasket', () => {
        const uid = '112';

        it(`should get user by id: ${uid}`, async () => {
            await expect(controller.getBasket(uid)).resolves.toMatchObject(
                await BasketModel.findOne({ user_uuid: uid }).exec()
            );
        });
    });

    describe('addBasket', () => {
        const uid = '365';

        it(`should add user with id: ${uid}`, async () => {
            await expect(controller.addBasket({
                ...rawData1,
                user_uuid: uid
            })).resolves.toBeTruthy();
        });

        it(`should find new user with id: ${uid}`, async () => {
            await expect(controller.getBasket(uid)).resolves.toMatchObject(
                await BasketModel.findOne({ user_uuid: uid }).exec()
            );
        });

        it(`model should have 2 documents`, async () => {
            await expect(BasketModel.countDocuments().exec()).resolves.toBe(2);
        })
    });
});