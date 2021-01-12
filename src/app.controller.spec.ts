import {
    Test,
    TestingModule
} from '@nestjs/testing';
import { AuctionModule, BasketModule, ClientModule, LotModule } from './client/client.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

describe('AppController', () => {    
    let auction: AuctionModule;
    let client: ClientModule;
    let basket: BasketModule;
    let lot: LotModule;

    let appController: AppController;
    let appService: AppService;

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [AuctionModule, ClientModule, BasketModule, LotModule],
            controllers: [AppController],
            providers: [AppService]
        }).compile();

        auction = app.get(AuctionModule);
        client = app.get(ClientModule);
        basket = app.get(BasketModule);
        lot = app.get(LotModule);

        appController = app.get(AppController);
        appService = app.get(AppService);
    });

    describe('getHello', () => {
        it('should return string value', () => {
            expect(appController.getHello()).toBeTruthy();
        })
    })
});