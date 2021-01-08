import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {ClientModule} from 'src/client/client.module';
import {ClientService} from 'src/client/client.service';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

describe('Client',()=>{
  let app: INestApplication;
  let clientService = {findAll:()=> ['test']};
  beforeAll(async ()=>{
    const moduleRef = await Test.createTestingModule({
      imports: [ClientModule],
    })
    .overrideProvider(ClientService)
    .useValue(clientService)
    .compile();
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  it(`/Get client`,()=>{
    return request(app.getHttpServer())
    .get('/clients')
    .expect(200)
    .expect({
      data: clientService.findAll(),
    });
  });
  afterAll(async()=>{
    await app.close();
  });
});