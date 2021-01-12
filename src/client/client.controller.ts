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

  @Get('/getUser/:ClientID')
  async getUser(@Param('ClientID') ClientID: string) {
    return this.ClientService.getUser(ClientID);
  }
}

@Controller('Basket')
export class BasketController {
  constructor(private readonly BasketService: BasketService) { }

  @Post('/addBasket')
  async addBasket(@Body() BasketDto: BasketDto) {
    return this.BasketService.addBasket(BasketDto);
  }

  @Get('/:ClientID')
  async getBasket(@Param('ClientID') ClientID: string) {
    return this.BasketService.getBasket(ClientID);
  }
}

@Controller('Auction')
export class AuctionController {
  constructor(private readonly AuctionService: AuctionService) { }

  @Post('/addAuction')
  async addAuction(@Body() AuctionDto: AuctionDto) {
    return this.AuctionService.addAuction(AuctionDto);
  }

  @Get('/getAuctions')
  async getAuctions(): Promise<Auction[]> {
    return this.AuctionService.getAuctions();
  }

  @Get('/getAuction/:AuctionID')
  async getAuction(@Param('AuctionID') AuctionID: string) {
    return this.AuctionService.getAuction(AuctionID);
  }

  @Put('/editAuction/:AuctionID')
  async editAuction(@Param('AuctionID') AuctionID: string, @Body() AuctionDto: AuctionDto) {
    return this.AuctionService.editAuction(AuctionID, AuctionDto);
  }

  @Delete('/deleteAuction/:AuctionID')
  async deleteAuction(@Param('AuctionID') AuctionID: string) {
    return this.AuctionService.deleteAuction(AuctionID);
  }
}

@Controller('Lot')
export class LotController {
  constructor(private readonly LotService: LotService) { }

  @Post('/addLot')
  async addLot(@Body() LotDto: LotDto) {
    return this.LotService.addLot(LotDto);
  }

  @Get('/getLots')
  async getLots(): Promise<Lot[]> {
    return this.LotService.getLots();
  }

  @Get('/getLot/:LotID')
  async getLot(@Param('LotID') LotID: string) {
    return this.LotService.getLot(LotID);
  }

  @Put('/editLot/:LotId')
  async editLot(@Param('LotID') LotID: string, @Body() LotDto: LotDto) {
    return this.LotService.editLot(LotID, LotDto);
  }

  @Delete('/deleteLot/:LotId')
  async deleteLot(@Param('LotID') LotID: string) {
    return this.LotService.deleteLot(LotID);
  }
}
