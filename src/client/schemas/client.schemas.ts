import * as mongoose from 'mongoose';

export const ClientSchema = new mongoose.Schema({
    user_uuid: { type: String, required: true },
    user_login: { type: String, required: true },
    password: { type: String, required: true },
    card: { type: String, required: true },
    admin: { type: Boolean, required: true },
});

export const BasketSchema = new mongoose.Schema({
    user_uuid: { type: String, required: true },
    auction_in_progress: { type: Number, required: true},
    number_of_lots: { type: Number, required: true},
    lot_uuid: { type: String, required: true },
    auction_uuid: { type: String, required: true },
});

export const AuctionSchema = new mongoose.Schema({
    auction_uuid: { type: String, required: true },
    price: { type: Number, required: true },
    user_uuid: { type: String, required: true },
    name: { type: String, required: true },
    picture_url: { type: String, required: true },
    description: { type: String, required: true },
    redeemed: { type: Boolean, required: true },
    time: { type: Number, required: true },
});

export const LotSchema = new mongoose.Schema({
    lot_uuid: { type: String, required: true },
    user_uuid: { type: String, required: true },
    user_login: { type: String, required: true },
    name: { type: String, required: true },
    picture_url: { type: String, required: true },
    description: { type: String, required: true },
    redeemed: { type: Boolean, required: true },
    price: { type: Number, required: true },
});
