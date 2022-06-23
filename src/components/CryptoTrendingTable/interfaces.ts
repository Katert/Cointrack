/** --------------------------------------- Interface for crypto table data --------------------------------------- */
export interface TrendingCoin {
  item: {
    coin_id: number;
    id: string;
    large: string;
    small: string;
    name: string;
    slug: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
  };
}
/** --------------------------------------------------------------------------------------------------------------- */
