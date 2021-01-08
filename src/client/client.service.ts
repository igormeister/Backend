import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ClientDto, BasketDto, AuctionDto, LotDto } from './dto/client.dto';
import { Client, Basket, Auction, Lot } from './interfaces/client.interface';

@Injectable()
export class ClientService {

  constructor(@Inject('CLIENT_MODEL') private readonly ClientModel: Model<Client>) { }

  async addUser(ClientDto: ClientDto): Promise<Client> {
    const createdClient = new this.ClientModel(ClientDto);
    return await createdClient.save();
  }

  async getUser(ClientID: string): Promise<Client> {
    return await this.ClientModel.findOne({ user_uuid: ClientID }).exec();
  }

}

@Injectable()
export class BasketService {

  async addBasket(BasketDto: BasketDto): Promise<Basket> {
    const createdBasket = new this.BasketModel(BasketDto);
    return await createdBasket.save();
  }

  constructor(@Inject('BASKET_MODEL') private readonly BasketModel: Model<Basket>) { }

  async getBasket(BasketID: string): Promise<Basket> {
    return await this.BasketModel.findOne({ user_uuid: BasketID }).exec();
  }

}

@Injectable()
export class AuctionService {

  constructor(@Inject('AUCTION_MODEL') private readonly AuctionModel: Model<Auction>) { }

  async getAuctions(): Promise<Auction[]> {
    const Auctions = await this.AuctionModel.find({ redeemed: false }).exec();
    return Auctions;
  }

  async getAuction(AuctionID: string): Promise<Auction> {
    const Auction = await this.AuctionModel.findOne({ auction_uuid: AuctionID }).exec();
    return Auction;
  }

  async addAuction(AuctionDto: AuctionDto): Promise<Auction> {
    const createdAuction = new this.AuctionModel(AuctionDto);
    return await createdAuction.save();
  }

  async editAuction(AuctionID: string, AuctionDto: AuctionDto): Promise<Auction> {
    const editedAuction = await this.AuctionModel.updateOne({ auction_uuid: AuctionID }, AuctionDto, { new: true });
    return editedAuction;
  }

  async deleteAuction(AuctionID: string): Promise<Auction> {
    const deletedAuction = await this.AuctionModel.deleteOne({ auction_uuid: AuctionID });
    return deletedAuction;
  }

}

@Injectable()
export class LotService {

  constructor(@Inject('LOT_MODEL') private readonly LotModel: Model<Lot>) { }

  async getLots(): Promise<Lot[]> {
    const Lots = await this.LotModel.find({ redeemed: false }).exec();
    return Lots;
  }

  async getLot(LotID: string): Promise<Lot> {
    const Lot = await this.LotModel.findOne({ lot_uuid: LotID }).exec();
    return Lot;
  }

  async addLot(LotDto: LotDto): Promise<Lot> {
    const createdLot = new this.LotModel(LotDto);
    return await createdLot.save();
  }

  async editLot(LotID: string, LotDto: LotDto): Promise<Lot> {
    const editedLot = await this.LotModel.updateOne({ lot_uuid: LotID }, LotDto, { new: true });
    return editedLot;
  }

  async deleteLot(LotID: string): Promise<Lot> {
    const deletedLot = await this.LotModel.deleteOne({ lot_uuid: LotID });
    return deletedLot;
  }

}
