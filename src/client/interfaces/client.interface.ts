import { Document } from 'mongoose';

export interface Client extends Document {
  user_uuid: string;
  user_login: string;
  password: string;
  card: string;
  admin: boolean;
}

export interface Basket extends Document {
    user_uuid: String
    auction_in_progress: Number;
    number_of_lots: Number;
    lot_uuid: String;
    auction_uuid: String;
}

export interface Auction extends Document{
    auction_uuid: String;
    price: Number;
    user_uuid: String;
    name: String;
    picture_url: String;
    description: String;
    redeemed: Boolean;
    time: Number;
}

export interface Lot extends Document {
    lot_uuid: String;
    user_uuid: String;
    user_login: String;
    name: String;
    picture_url: String;
    description: String;
    redeemed: Boolean;
    price: Number;
}
