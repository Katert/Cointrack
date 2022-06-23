import React, { useEffect, useState } from "react";
import "./DetailedAssetPage.scss";
import { FormattedMessage } from "react-intl";
import axios from "axios";
import { useParams } from "react-router-dom";
import { COINGECKO_BASE_URL } from "../../const";
import { AssetData, PriceData } from "./interfaces";
import LineChart from "../../components/LineChart/LineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { ClipLoader } from "react-spinners";

interface Props {}

const DetailedAssetPage: React.FunctionComponent<Props> = () => {
  const { id } = useParams<string>();
  const [assetData, setAssetData] = useState<AssetData>();
  const [priceData, setPriceData] = useState<PriceData>();
  const [dataIsLoading, setDataIsLoading] = useState<boolean>(false);
  const [selectedChartPeriod, setSelectedChartPeriod] = useState<string>("30");

  const fetchInfoData = async () => {
    setDataIsLoading(true);
    await axios
      .get(
        `${COINGECKO_BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
      )
      .then((res) => {
        setAssetData(res.data);
        setDataIsLoading(false);
      });
    // setAssetData(assetDataResponse.data);
  };

  const chartPeriodButtons = [
    {
      parameter: "1",
      label: "line_chart_button_1d",
    },
    {
      parameter: "14",
      label: "line_chart_button_14d",
    },
    {
      parameter: "30",
      label: "line_chart_button_1m",
    },
    {
      parameter: "60",
      label: "line_chart_button_2m",
    },
    {
      parameter: "90",
      label: "line_chart_button_3m",
    },
  ];

  const fetchChartData = async (period: string) => {
    const priceDataResponse = await axios.get(
      `${COINGECKO_BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${period}`
    );
    setPriceData(priceDataResponse.data);
  };

  useEffect(() => {
    fetchInfoData();
    fetchChartData(selectedChartPeriod);
  }, []);

  return (
    <div className="detailed-asset-page-container">
      <div className="detailed-asset-page-top-section">
        <div className="asset-description-container">
          {dataIsLoading ? (
            <span className="cliploader">
              <ClipLoader size={50} />
            </span>
          ) : (
            <>
              {assetData?.description.en ? (
                <>
                  <h2 className="asset-info-heading">
                    <img src={assetData?.image.thumb} alt="logo" />
                    {assetData?.name}
                  </h2>
                  <div className="links-container">
                    <a
                      href={assetData?.links.homepage[0]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faHome} /> Homepage
                    </a>

                    <a
                      href={assetData?.links.repos_url.github[0]}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FontAwesomeIcon icon={faGithub} /> Github
                    </a>
                  </div>
                  {assetData?.description.en}
                </>
              ) : (
                <FormattedMessage id="no_description_available" />
              )}
            </>
          )}

          <br />
        </div>
        <div className="graph-container">
          <div className="graph-period-buttons">
            {chartPeriodButtons.map((button, index) => {
              return (
                <button
                  key={index}
                  style={
                    selectedChartPeriod === button.parameter
                      ? { backgroundColor: "rgb(0, 217, 152)" }
                      : { backgroundColor: "black" }
                  }
                  onClick={() => {
                    setSelectedChartPeriod(button.parameter);
                    fetchChartData(button.parameter);
                  }}
                >
                  <FormattedMessage id={button.label} />
                </button>
              );
            })}
          </div>
          <LineChart data={priceData} label={`Price (USD): `} />
        </div>
      </div>
      <div className="detailed-asset-page-bottom-section"></div>
    </div>
  );
};

export default DetailedAssetPage;
