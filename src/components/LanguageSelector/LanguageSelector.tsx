import React from "react";
import "./LanguageSelector.scss";
import { LOCALES } from "../../i18n/locales";

interface Props {
  setCurrentLocale: (locale: string) => void;
  currentLocale: string;
}

const LanguageSelector: React.FunctionComponent<Props> = (props) => {
  const { setCurrentLocale, currentLocale } = props;

  return (
    <div className="language-selector-container">
      <select
        name="language"
        id="languages"
        style={{ textAlign: "center" }}
        onChange={(e) => setCurrentLocale(e.target.value)}
      >
        {Object.values(LOCALES).map((locale, index) => {
          return (
            <option
              value={locale}
              key={index}
              onClick={() => setCurrentLocale(locale.valueOf())}
              selected={
                currentLocale === Object.values(LOCALES).at(index)
                  ? true
                  : false
              }
            >
              {Object.keys(LOCALES).at(index)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default LanguageSelector;
