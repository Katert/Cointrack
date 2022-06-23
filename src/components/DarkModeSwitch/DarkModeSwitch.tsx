import React from "react";
import "./DarkModeSwitch.scss";

// Component imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

interface Props {
  isDark: boolean;
}

const DarkModeSwitch: React.FunctionComponent<Props> = (props) => {
  return (
    <div className="dark-mode-switch-container">
      <FontAwesomeIcon icon={faSun} className="icon" id="sun-icon" />
      <FontAwesomeIcon icon={faMoon} className="icon" id="moon-icon" />
    </div>
  );
};

export default DarkModeSwitch;
