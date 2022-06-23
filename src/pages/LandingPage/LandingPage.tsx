import React from "react";
import "./LandingPage.scss";

// Component imports
import { FormattedMessage } from "react-intl";
import EnterButton from "../../components/EnterButton/EnterButton";
import HeaderLandingPage from "../../components/HeaderLandingPage/HeaderLandingPage";

// Asset imports
import Illustration from "./assets/Illustration.png";
import { NavigateFunction } from "react-router-dom";

interface Props {
  navigate: NavigateFunction;
  setCurrentLocale: (locale: string) => void;
  currentLocale: string;
}

const LandingPage: React.FunctionComponent<Props> = (props) => {
  const { navigate, setCurrentLocale, currentLocale } = props;

  return (
    <>
      <div className="landing-page-container">
        <HeaderLandingPage
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
        <div className="landing-page-section">
          <div className="landing-page-left-item">
            <span>
              <h1>
                <FormattedMessage id="landing_page_message_1" />
              </h1>
            </span>
            <span>
              <p>
                <FormattedMessage id="landing_page_message_2" />
              </p>
            </span>
            <div className="enter-button-container">
              <EnterButton
                buttonText="Enter"
                onClick={() => {
                  navigate("/home");
                }}
              />
            </div>
          </div>
          <div className="landing-page-right-item">
            <div className="landing-page-image">
              <img src={Illustration} alt="Crypto illustration" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
