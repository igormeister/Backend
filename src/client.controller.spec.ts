import {
    MongoMemoryServer
} from 'mongodb-memory-server';
import {
    Test,
    TestingModule
} from '@nestjs/testing';
import {
    ClientController
} from './client/client.controller';
import {
    ClientService
} from './client/client.service';
import {
    Model,
    Schema,
    Mongoose
} from 'mongoose';
import {
    Client
} from './client/interfaces/client.interface';
import {
    ClientDto
} from './client/dto/client.dto';

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

const rawData1: ClientDto = {
    user_uuid: '112',
    user_login:'Ihor',
    password:'4321',
    card:'2222 2222 2222 2222',
    admin: false
};

const schema = Object.keys(rawData1).reduce((res, key) => {return {...res, [key]: (typeof rawData1[key])}}, {});

describe('ClientController', () => {
    const mongoose = new Mongoose();
    const mongoServer: MongoMemoryServer = new MongoMemoryServer();
    const ClientModel: Model<Client> = mongoose.model<Client>('Client', new Schema(schema));
    
    let service: ClientService;
    let controller: ClientController;

    beforeAll(async () => {
        const opts = { useNewUrlParser: true, useUnifiedTopology: true };
        const mongoUri = await mongoServer.getUri();

        mongoose.connect(mongoUri, opts, async (err) => {
            if (err) throw err;
        });

        const app: TestingModule = await Test.createTestingModule({
            controllers: [ClientController],
            providers: [{
                provide: ClientService,
                useValue: new ClientService(ClientModel)
            }, ],
        }).compile();

        service = app.get(ClientService);
        controller = app.get(ClientController);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Setup initial model', () => {
        it('should add 1 client', async () => {
            const user1 = new ClientModel(rawData1);
            await expect(user1.save()).resolves.toMatchObject(user1);
        });

        it('model should have 1 item', async () => {
            await expect(ClientModel.countDocuments().exec()).resolves.toBe(1);    
        })
    });

    describe('getUser', () => {
        const uid = '112';

        it(`should get user by id: ${uid}`, async () => {
            await expect(controller.getUser(uid)).resolves.toMatchObject(
                await ClientModel.findOne({ user_uuid: uid }).exec()
            );
        });
    });

    describe('addUser', () => {
        const uid = '365';

        it(`should add user with id: ${uid}`, async () => {
            await expect(controller.addUser({
                ...rawData1,
                user_uuid: uid
            })).resolves.toBeTruthy();
        });

        it(`should find new user with id: ${uid}`, async () => {
            await expect(controller.getUser(uid)).resolves.toMatchObject(
                await ClientModel.findOne({ user_uuid: uid }).exec()
            );
        });

        it(`model should have 2 documents`, async () => {
            await expect(ClientModel.countDocuments().exec()).resolves.toBe(2);
        })
    });
});