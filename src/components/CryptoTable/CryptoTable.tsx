import React, { useState, Dispatch, SetStateAction, useCallback } from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { NavigateFunction } from "react-router-dom";
import { CryptoTableData } from "./interfaces";
import "./CryptoTable.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  data: CryptoTableData[] | undefined;
  setData: Dispatch<SetStateAction<CryptoTableData[] | undefined>>;
  navigate: NavigateFunction;
}

type SortKeys = keyof CryptoTableData;
type SortOrder = "ascending" | "descending";

const CryptoTable: React.FunctionComponent<Props> = (props) => {
  const { data, navigate } = props;
  const [sortKey, setSortKey] = useState<SortKeys>("market_cap_rank");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascending");

  const sortData = ({
    tableData,
    sortKey,
    reverse,
  }: {
    tableData: typeof data;
    sortKey: SortKeys;
    reverse: boolean;
  }) => {
    if (!sortKey) return tableData;

    const sortedData = data?.sort((a, b) => {
      return a[sortKey]! > b[sortKey]! ? 1 : -1;
    });

    if (reverse) {
      return sortedData?.reverse();
    }

    return tableData;
  };

  const sortedData = useCallback(
    () =>
      sortData({
        tableData: data,
        sortKey,
        reverse: sortOrder === "descending",
      }),
    [data, sortKey, sortOrder]
  );

  const tableHeaders: { heading: string; key: SortKeys }[] = [
    {
      heading: "table_heading_market_cap_rank",
      key: "market_cap_rank",
    },
    {
      heading: "table_heading_name",
      key: "name",
    },
    {
      heading: "table_heading_ticker",
      key: "symbol",
    },
    {
      heading: "table_heading_price",
      key: "current_price",
    },
    {
      heading: "table_heading_high24",
      key: "high_24h",
    },
    {
      heading: "table_heading_low24",
      key: "low_24h",
    },
    {
      heading: "table_heading_market_cap",
      key: "market_cap",
    },
  ];

  return (
    <div className="crypto-table-container">
      <div className="crypto-table-section">
        <table>
          <thead>
            <tr>
              <th></th>
              {tableHeaders.map((header, index) => {
                return (
                  <th
                    key={index}
                    onClick={() => {
                      setSortKey(header.key);
                      setSortOrder(
                        sortOrder === "ascending" ? "descending" : "ascending"
                      );
                    }}
                  >
                    <span key={index}>
                      <FormattedMessage id={header.heading} />
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data ? (
              sortedData()?.map((crypto, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => navigate(`asset/${crypto.id}`)}
                  >
                    <td>
                      <img
                        className="crypto-logo"
                        src={crypto.image}
                        alt="crypto-logo"
                      />
                    </td>
                    <td>
                      <span>{crypto.market_cap_rank}</span>
                    </td>
                    <td>{crypto.name}</td>
                    <td>{crypto.symbol?.toUpperCase()}</td>
                    <td>
                      <FormattedNumber
                        value={crypto.current_price}
                        style="currency"
                        currency="USD"
                      />
                    </td>
                    <td>
                      <FormattedNumber
                        value={crypto.high_24h}
                        style="currency"
                        currency="USD"
                      />
                    </td>
                    <td>
                      <FormattedNumber
                        value={crypto.low_24h}
                        style="currency"
                        currency="USD"
                      />
                    </td>
                    <td>
                      <FormattedNumber
                        value={crypto.market_cap}
                        style="currency"
                        currency="USD"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <ClipLoader size={50} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable;
