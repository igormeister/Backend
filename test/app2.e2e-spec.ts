
import * as supertest from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';
import { INestApplication } from '@nestjs/common';

import { ClientDto } from './../src/client/dto/client.dto';
import { Model, Mongoose, Schema } from 'mongoose';
import { Client } from 'src/client/interfaces/client.interface';
import { send } from 'process';

const client1: ClientDto = {
    user_uuid: '123',
    user_login: 'test@login',
    password: 'qwerty',
    card: 'test',
    admin: false
};

const mongoose = new Mongoose();
const schema = Object.keys(client1).reduce((res, key) => {return {...res, [key]: (typeof client1[key])}}, {});
const ClientModel: Model<Client> = mongoose.model<Client>('Client', new Schema(schema));

let request: supertest.SuperTest<supertest.Test>;

describe('App', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
        .overrideProvider(AppService)
        .useValue(new AppService())
        .compile();

        app = moduleRef.createNestApplication();
        await app.init();

        request = supertest(app.getHttpServer());
    });

    describe('Client API', () => {
        it('[POST] /api/Client/addUser', (done) => {

            let p = [];
            let i = 10;
            while(i) {
                p.push(request.post('/Client/addUser').send(client1));

                i--;
            }

            Promise.all(p).then(r => {
                console.log(r);
            });

            // return request.post('/Client/addUser')
            //     .send(client1)
            //     .expect(201)
            //     .then(res => {
            //         console.log(res);

                    

            //         done()
            //     });
        });
    });

    afterAll(async () => {
        await app.close();
    });
});