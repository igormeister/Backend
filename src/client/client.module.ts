import { Module } from '@nestjs/common';
import { ClientController, BasketController, AuctionController, LotController } from './client.controller';
import { ClientService, BasketService, AuctionService, LotService } from './client.service';
import { ClientProviders, BasketProviders, AuctionProviders, LotProviders } from './client.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [ClientController],
    providers: [ClientService, ...ClientProviders],
})
export class ClientModule {}

@Module({
    imports: [DatabaseModule],
    controllers: [BasketController],
    providers: [BasketService, ...BasketProviders],
})
export class BasketModule {}

@Module({
    imports: [DatabaseModule],
    controllers: [AuctionController],
    providers: [AuctionService, ...AuctionProviders],
})
export class AuctionModule {}

@Module({
    imports: [DatabaseModule],
    controllers: [LotController],
    providers: [LotService, ...LotProviders],
})
export class LotModule {}
