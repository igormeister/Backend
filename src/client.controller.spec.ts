import { createMock } from '@golevelup/nestjs-testing';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client/client.controller';
import { ClientDto } from './client/dto/client.dto';
import { ClientService } from './client/client.service';
import { Client } from './client/interfaces/client.interface';
import * as request from  'supertest';

const testClientLogin = 'Login';
const testClientId = '111';
const testClientPassword = '1234';
const testClientCard = '5555 5555 5555 5555';
const testClientAdmin = true

describe('Client Controller', () => {
  let controller: ClientController;
  let service: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        {
          provide: ClientService,
          useValue: {
            /*getAll: jest.fn().mockResolvedValue([
              {user_uuid:testClientId,user_login:testClientLogin,password:testClientPassword,card:testClientCard,admin: testClientAdmin },
              {user_uuid: '112',user_login:'Ihor',password:'4321',card:'1111 1111 1111 1111',admin: '1'},
              {user_uuid: '113',user_login:'Nazar',password:'igor1234',card:'2222 2222 2222 2222 2',admin: '0'},
      
            ]),*/
            getOne: jest.fn().mockImplementation((user_uuid: string) =>
              Promise.resolve({
                user_login: testClientLogin,
                password: testClientPassword,
                card: testClientCard,
                admin: testClientAdmin,
                _id: user_uuid,
              })
            ),
            insertOne: jest
              .fn()
              .mockImplementation((ClientDto: ClientDto) =>
                Promise.resolve({ _id: 'a uuid', ...ClientDto }),

              ),
          }
        }
      ],
    }).compile();
    controller = module.get<ClientController>(ClientController);
    service = module.get<ClientService>(ClientService);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getUser', () => {
    it('should get a client', () => {
      expect(controller.getUser('id')).resolves.toEqual([
        {
          user_login: testClientLogin,
          password: testClientPassword,
          card: testClientCard,
          admin: testClientAdmin,
          _id:'id',
        }
      ]);
    });
  });
  describe('new Client',()=>{
    it('should create a new client',()=>{
      const newClientDTO:ClientDto={
        user_uuid: '112',
        user_login:'Ihor',
        password:'4321',
        card:'2222 2222 2222 2222',
        admin: false
      };
      expect(controller.addUser(newClientDTO)).resolves.toEqual({
        ...newClientDTO,
      });
    });
  });
});

