import { Module } from '@nestjs/common';
import { ClientModule, BasketModule, AuctionModule, LotModule } from './client/client.module';

@Module({
  imports: [ClientModule, BasketModule, AuctionModule, LotModule],
})
export class AppModule {}