import {
    MongoMemoryServer
} from 'mongodb-memory-server';
import {
    Test,
    TestingModule
} from '@nestjs/testing';
import {
    LotController
} from './client/client.controller';
import {
    LotService
} from './client/client.service';
import {
    Model,
    Schema,
    Mongoose
} from 'mongoose';
import {
    Lot
} from './client/interfaces/client.interface';
import {
    LotDto
} from './client/dto/client.dto';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const rawData1: LotDto = {
    lot_uuid: '555',
    user_uuid: '112',
    user_login: 'test',
    name: 'name1',
    picture_url: 'www/hellow/world.png',
    description: 'test desc',
    redeemed: false,
    price: 100500
};

const schema = Object.keys(rawData1).reduce((res, key) => {return {...res, [key]: (typeof rawData1[key])}}, {});

describe('LotController', () => {
    const mongoose = new Mongoose();
    const mongoServer: MongoMemoryServer = new MongoMemoryServer();
    const LotModel: Model<Lot> = mongoose.model<Lot>('Lot', new Schema(schema));
    
    let service: LotService;
    let controller: LotController;

    beforeAll(async () => {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoUri = await mongoServer.getUri();

        mongoose.connect(mongoUri, opts, async (err) => {
            if (err) throw err;
        });

        const app: TestingModule = await Test.createTestingModule({
            controllers: [LotController],
            providers: [{
                provide: LotService,
                useValue: new LotService(LotModel)
            }, ],
        }).compile();

        service = app.get(LotService);
        controller = app.get(LotController);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Setup initial model', () => {
        it('should add 1 item', async () => {
            const user1 = new LotModel(rawData1);
            await expect(user1.save()).resolves.toMatchObject(user1);
        });

        it('model should have 1 item', async () => {
            await expect(LotModel.countDocuments().exec()).resolves.toBe(1);    
        })
    });

    describe('addLot', () => {
        it('should add LotDto and return Lot object', async () => {
            await expect(controller.addLot({
                ...rawData1,
                lot_uuid: '999', 
                user_uuid: '777' 
            })).resolves.toBeTruthy();
        });

        it('should find newly added Lot', async () => {
            await expect(controller.getLot('999')).resolves.toMatchObject(
                await LotModel.findOne({ lot_uuid: '999' }).exec()
            )
        })
    });

    describe('getLots', () => {
        it('should return an array of Lot objects', async () => {
            await expect(controller.getLots()).resolves.toMatchObject(
                await LotModel.find().exec()
            );
        });
    });

    describe('getLot', () => {
        const lotid = '555';

        it(`should return Lot by id: ${lotid}`, async () => {
            await expect(controller.getLot(lotid)).resolves.toBeTruthy();
        });
    });

    describe('editLot', () => {
        const lotid = '555';
        const name = 'newName';

        it(`should edit ${lotid} Lot and set new Lot.name = "${name}"`, async () => {
            await expect(controller.editLot(lotid, {
                ...rawData1,
                name
            })).resolves.toBeTruthy();
        });

        it(`should find ${lotid} Lot and Lot.name must be = "${name}"`, async () => {
            await expect(controller.getLot(lotid)).resolves.toMatchObject({ name });
        });
    });

    describe('deleteLot', () => {
        const lotid = '555';

        it(`Lot ${lotid} should exist in model collection`, async () => {
            await expect(controller.getLot(lotid)).resolves.toBeTruthy();
        });

        it(`should delete Lot by id: ${lotid}`, async () => { 
            await controller.deleteLot(lotid)
        });

        it('deleted Lot should be missing in model collection', async () => {
            await expect(controller.getLot(lotid)).resolves.toBeFalsy();
        });
    })
});