import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule, BasketModule, AuctionModule, LotModule } from './client/client.module';

@Module({
  imports: [ClientModule, BasketModule, AuctionModule, LotModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}