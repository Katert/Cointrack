import React from "react";
import "./HeaderLandingPage.scss";

// Component imports
import LanguageSelector from "../LanguageSelector/LanguageSelector";

interface Props {
  setCurrentLocale: (locale: string) => void;
  currentLocale: string;
}

const HeaderLandingPage: React.FunctionComponent<Props> = (props) => {
  const { setCurrentLocale, currentLocale } = props;

  return (
    <div className="header-landing-page-container">
      <div className="header-landing-page-right-section">
        <LanguageSelector
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
      </div>
    </div>
  );
};

export default HeaderLandingPage;
