import React from "react";
import "./NavBar.scss";

// Component imports
import LanguageSelecter from "../LanguageSelector/LanguageSelector";
import CryptoSearchField from "../CryptoSearchField/CryptoSearchField";
import { NavigateFunction } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useIntl } from "react-intl";

interface Props {
  navigate: NavigateFunction;
  setCurrentLocale: (locale: string) => void;
  currentLocale: string;
}

const NavBar: React.FunctionComponent<Props> = (props) => {
  const { setCurrentLocale, currentLocale, navigate } = props;
  const intl = useIntl();

  return (
    <div className="navbar-container">
      <div className="navbar-items-container">
        <span
          className="navbar-button home-button"
          onClick={() => navigate("/home")}
        >
          <FontAwesomeIcon icon={faHome} />
        </span>
        <CryptoSearchField intl={intl} navigate={navigate} />
      </div>

      <div className="accessibility-container">
        <LanguageSelecter
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
        <span className="navbar-button github-button">
          <a
            href="https://github.com/Katert/Cointrack"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </span>
      </div>
    </div>
  );
};

export default NavBar;
