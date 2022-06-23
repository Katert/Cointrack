import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  COINGECKO_BASE_URL,
  NEWSCATCHER_API_KEY,
  NEWSCATCHER_BASE_URL,
} from "../../const";
import { CryptoTableData } from "../../components/CryptoTable/interfaces";
import { TrendingCoin } from "../../components/CryptoTrendingTable/interfaces";
import { NewsData } from "../../components/NewsSection/interfaces";
import "./Home.scss";
import { FormattedMessage } from "react-intl";

// Component imports
import CryptoTable from "../../components/CryptoTable/CryptoTable";
import { NavigateFunction } from "react-router-dom";
import CryptoTrendingTable from "../../components/CryptoTrendingTable/CryptoTrendingTable";
import NewsSection from "../../components/NewsSection/NewsSection";

interface Props {
  navigate: NavigateFunction;
}

const Home: React.FunctionComponent<Props> = (props) => {
  const { navigate } = props;
  const [data, setData] = useState<CryptoTableData[]>();
  const [trendingData, setTrendingData] = useState<TrendingCoin[]>();
  const [newsData, setNewsData] = useState<NewsData>();
  const newsQueryValue: string = "crypto";

  const fetchData = async () => {
    try {
      // Fetch table ranking data
      const tableData = await axios.get(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setData(tableData.data);

      // Fetch trending coins
      const trendingData = await axios.get(
        `${COINGECKO_BASE_URL}/search/trending`
      );
      setTrendingData(trendingData.data.coins);

      // Fetch news data
      const newsApiOptions = {
        method: "GET",
        url: NEWSCATCHER_BASE_URL,
        params: {
          q: newsQueryValue,
          lang: "en",
          sort_by: "date",
          page: 1,
          page_size: 20,
        },
        headers: {
          "x-api-key": NEWSCATCHER_API_KEY,
          Accept: "application/json",
        },
      };
      await axios.request(newsApiOptions).then((res) => {
        setNewsData(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="home-container-top-section">
        <div className="home-container-trending-column">
          <CryptoTrendingTable navigate={navigate} data={trendingData} />
        </div>
        <div className="home-container-news-column">
          <NewsSection data={newsData} />
        </div>
      </div>
      <div className="home-container-bottom-section">
        <div className="crypto-top-list-container">
          <span className="crypto-list-heading">
            <h1>
              🏆 <FormattedMessage id="crypto_table_heading" />
            </h1>
          </span>
          <CryptoTable setData={setData} data={data} navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
