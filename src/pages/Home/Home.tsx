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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface Props {
  navigate: NavigateFunction;
}

const Home: React.FunctionComponent<Props> = (props) => {
  const { navigate } = props;
  const [data, setData] = useState<CryptoTableData[]>();
  const [trendingData, setTrendingData] = useState<TrendingCoin[]>();
  const [newsData, setNewsData] = useState<NewsData>();
  const [currentTablePage, setCurrentTablePage] = useState<string>("1");
  const [tablePage, setTablePage] = useState<string>("1");
  const newsQueryValue: string = "crypto";

  const alreadyOnPage = (pageNumber: string) => {
    if (pageNumber === currentTablePage) {
      alert("You're already on this page.");
      return true;
    }

    return false;
  };

  const navigateToPreviousPage = (previousPage: string) => {
    if (parseInt(currentTablePage) - 1 === 0) {
      return;
    }
    setCurrentTablePage((parseInt(currentTablePage) - 1).toString());
    fetchRankingTableData(previousPage);
  };

  const navigateToNextPage = (nextPage: string) => {
    setCurrentTablePage((parseInt(currentTablePage) + 1).toString());
    fetchRankingTableData(nextPage);
  };

  const fetchRankingTableData = async (pageNumber: string) => {
    try {
      const tableData = await axios.get(
        `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=${pageNumber}&sparkline=false`
      );
      setCurrentTablePage(pageNumber);
      setData(tableData.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTrendingTableData = async () => {
    try {
      const trendingData = await axios.get(
        `${COINGECKO_BASE_URL}/search/trending`
      );
      setTrendingData(trendingData.data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchNewsData = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRankingTableData(currentTablePage);
    fetchTrendingTableData();
    fetchNewsData();
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
          <div className="crypto-list-top-section">
            <span className="crypto-list-heading">
              <h1>
                ???? <FormattedMessage id="crypto_table_heading" />
              </h1>
            </span>
            <div className="navigate-page-input">
              <div className="page-navigation-buttons-container">
                <button
                  value={parseInt(currentTablePage) - 1}
                  onClick={(e) => navigateToPreviousPage(e.currentTarget.value)}
                  className="page-navigate-button"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  value={parseInt(currentTablePage) + 1}
                  onClick={(e) => navigateToNextPage(e.currentTarget.value)}
                  className="page-navigate-button"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
              <span>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]"
                  defaultValue={currentTablePage}
                  key={currentTablePage}
                  onChange={(e) => setTablePage(e.target.value)}
                  min={1}
                />
              </span>
              <span>
                <button
                  className="go-to-page-button"
                  onClick={() => {
                    if (!alreadyOnPage(tablePage)) {
                      fetchRankingTableData(tablePage);
                    }
                  }}
                >
                  <FormattedMessage id="go_to_page_button" />
                </button>
              </span>
            </div>
          </div>

          <CryptoTable setData={setData} data={data} navigate={navigate} />
        </div>
      </div>
    </div>
  );
};

export default Home;
