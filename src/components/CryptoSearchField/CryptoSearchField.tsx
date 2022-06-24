import React, { useState, useEffect } from "react";
import { IntlShape } from "react-intl";
import { Link } from "react-router-dom";
import "./CryptoSearchField.scss";

// Component imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useDebounce } from "../../hooks/useDebounce";
import { COINGECKO_BASE_URL } from "../../const";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { NavigateFunction } from "react-router-dom";

interface Props {
  intl: IntlShape;
  navigate: NavigateFunction;
}

interface SearchResults {
  coins: [
    {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      large: string;
    }
  ];
}

const CryptoSearchField: React.FunctionComponent<Props> = (props) => {
  const { intl, navigate } = props;
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [inputIsExpanded, setInputIsExpanded] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResults>();

  // Search bar animation properties
  const searchInputVariants = {
    expanded: {
      height: "auto",
    },
    closed: {
      height: "50px",
    },
  };
  const containerAnimation = { type: "spring", damping: 22, stiffness: 150 };

  const search = () => {
    axios
      .get(`${COINGECKO_BASE_URL}/search?query=${searchInputValue}`)
      .then((res) => {
        setSearchResults(res.data);
        setIsSearching(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Hide search results container if there's no search value given, or show cliploader if there is
  useEffect(() => {
    if (!searchInputValue) setShowResults(false);
    if (searchInputValue) setIsSearching(true);
  }, [searchInputValue]);

  // Fire API call after seconds when search value has been given
  useDebounce(searchInputValue, 1000, search);

  return (
    <motion.div
      className="crypto-search-input-container"
      variants={searchInputVariants}
      animate={inputIsExpanded ? "expanded" : "closed"}
      transition={containerAnimation}
    >
      <div className="crypto-search-input-section">
        {!searchInputValue ? (
          <span className="crypto-search-input-icon">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        ) : (
          <span
            className="crypto-search-input-icon"
            onClick={() => {
              setSearchInputValue("");
              setInputIsExpanded(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </span>
        )}
        <div className="search-input-container">
          <span>
            <input
              type="text"
              placeholder={intl.formatMessage({
                id: "search_input_placeholder",
              })}
              value={searchInputValue}
              onChange={(e) => {
                setSearchInputValue(e.target.value);
                setShowResults(true);
                !e.target.value
                  ? setInputIsExpanded(false)
                  : setInputIsExpanded(true);
              }}
            />
          </span>
        </div>
      </div>

      {showResults ? (
        <div className="asset-search-results" style={{ color: "white" }}>
          {isSearching ? (
            <div className="cliploader-container">
              <ClipLoader color="white" size={50} />
            </div>
          ) : (
            <ul>
              {searchResults?.coins.map((result, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/asset/${result.id}`);
                      setInputIsExpanded(false);
                      setSearchInputValue("");
                    }}
                  >
                    <span>
                      <img src={result.large} alt="" />
                    </span>
                    <span>{result.name}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ) : null}
    </motion.div>
  );
};

export default CryptoSearchField;
