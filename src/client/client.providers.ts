import { Connection } from 'mongoose';
import { ClientSchema, BasketSchema, AuctionSchema, LotSchema } from './schemas/client.schemas';

export const ClientProviders = [
    {
        provide: 'CLIENT_MODEL',
        useFactory: (connection: Connection) => connection.model('Client', ClientSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];

export const BasketProviders = [
    {
        provide: 'BASKET_MODEL',
        useFactory: (connection: Connection) => connection.model('Basket', BasketSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];

export const AuctionProviders = [
    {
        provide: 'AUCTION_MODEL',
        useFactory: (connection: Connection) => connection.model('Auction', AuctionSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];

export const LotProviders = [
    {
        provide: 'LOT_MODEL',
        useFactory: (connection: Connection) => connection.model('Lot', LotSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
