import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ClientDto, BasketDto, AuctionDto, LotDto } from './dto/client.dto';
import { ClientService, BasketService, AuctionService, LotService } from './client.service';
import { Client, Basket, Auction, Lot } from './interfaces/client.interface';

@Controller('Client')
export class ClientController {
  constructor(private readonly ClientService: ClientService) { }

  @Post('/addUser')
  async addUser(@Body() ClientDto: ClientDto) {
    return this.ClientService.addUser(ClientDto);
  }

  @Get('/getUser/:user_login')
  async getUser(@Param('ClientID') ClientID: string) {
    return this.ClientService.getUser(ClientID);
  }

}

@Controller('Basket')
export class BasketController {
  constructor(private readonly BasketService: BasketService) { }

  @Get('/Basket/:ClientID')
  async getBasket(@Param('ClientID') ClientID: string): Promise<Basket> {
    return this.BasketService.getBasket(ClientID);
  }
}

@Controller('Auction')
export class AuctionController {
  constructor(private readonly AuctionService: AuctionService) { }

  @Get('/getAuctions')
  async getAuctions(): Promise<Auction> {
    return new Promise((resolve) => {
      return this.AuctionService.getAuctions();
    });
  }

  @Get('/getAuction/:AuctionID')
  async getAuction(@Param('AuctionID') AuctionID: string) {
    return this.AuctionService.getAuction(AuctionID);
  }

  @Put('/editAuction')
  async editAuction(@Param('AuctionID') AuctionID: string, @Body() AuctionDto: AuctionDto) {
    return this.AuctionService.editAuction(AuctionID, AuctionDto);
  }

  @Delete('/deleteAuction')
  async deleteAuction(@Param('AuctionID') AuctionID: string, @Body() AuctionDto: AuctionDto) {
    return this.AuctionService.deleteAuction(AuctionID, AuctionDto);
  }
}

@Controller('Lot')
export class LotController {
  constructor(private readonly LotService: LotService) { }

  @Get('/getLots')
  async getLots(): Promise<Lot> {
    return new Promise((resolve) => {
      return this.LotService.getLots();
    });
  }

  @Get('/getLot/:LotID')
  async getLot(@Param('LotID') LotID: string) {
    return this.LotService.getLot(LotID);
  }

  @Put('/editLot')
  async editLot(@Param('LotID') LotID: string, @Body() LotDto: LotDto) {
    return this.LotService.editLot(LotID, LotDto);
  }

  @Delete('/deleteLot')
  async deleteLot(@Param('LotID') LotID: string, @Body() LotDto: LotDto) {
    return this.LotService.deleteLot(LotID, LotDto);
  }
}
