export class ClientDto {
    readonly user_uuid: string;
    readonly user_login: string;
    readonly password: string;
    readonly card: string;
    readonly admin: boolean;
}

export class BasketDto {
    readonly user_uuid: String
    readonly auction_in_progress: Number;
    readonly number_of_lots: Number;
    readonly lot_uuid: String;
    readonly auction_uuid: String;
}

export class AuctionDto {
    readonly auction_uuid: String;
    readonly price: Number;
    readonly user_uuid: String;
    readonly name: String;
    readonly picture_url: String;
    readonly description: String;
    readonly redeemed: Boolean;
    readonly time: Number;
}

export class LotDto {
    readonly lot_uuid: String;
    readonly user_uuid: String;
    readonly user_login: String;
    readonly name: String;
    readonly picture_url: String;
    readonly description: String;
    readonly redeemed: Boolean;
    readonly price: Number;
}
