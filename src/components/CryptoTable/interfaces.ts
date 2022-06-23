/** --------------------------------------- Interface for crypto table data --------------------------------------- */
export interface CryptoTableData {
  id: string | null;
  symbol: string | null;
  name: string | null;
  image: string | undefined;
  current_price: number | bigint;
  market_cap: number | bigint;
  market_cap_rank: number | null;
  fully_diluted_valuation: number | null;
  total_volume: number;
  high_24h: number | bigint;
  low_24h: number | bigint;
  price_change_24h: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: null;
  ath: number | null;
  ath_change_percentage: number | null;
  ath_date: Date | string | null;
  atl: number | null;
  atl_change_percentage: number | null;
  atl_date: Date | string | null;
  roi: number | null;
  last_updated: Date | string | null;
}
/** --------------------------------------------------------------------------------------------------------------- */
