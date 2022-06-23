import React from "react";
import { TrendingCoin } from "./interfaces";
import { NavigateFunction } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import "./CryptoTrendingTable.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  data: TrendingCoin[] | undefined;
  navigate: NavigateFunction;
}

const CryptoTrendingTable: React.FunctionComponent<Props> = (props) => {
  const { data, navigate } = props;

  return (
    <div className="crypto-statistic-table-container">
      <h1>
        🔥 <FormattedMessage id="trending_table_heading" />
      </h1>
      <div className="crypto-statistic-table-section">
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Rank</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.map((coin, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => navigate(`/asset/${coin.item.id}`)}
                  >
                    <td>
                      <img src={`${coin.item.small}`} alt="logo" />
                    </td>
                    <td>
                      <p>{coin.item.name}</p>
                    </td>
                    <td>{coin.item.market_cap_rank}</td>
                  </tr>
                );
              })
            ) : (
              <span className="cliploader">
                <ClipLoader size={50} />
              </span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTrendingTable;
