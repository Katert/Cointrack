import React from "react";
import "./EnterButton.scss";

interface Props {
  buttonText: string;
  onClick: () => void;
}

const EnterButton: React.FunctionComponent<Props> = (props) => {
  const { buttonText, onClick } = props;

  return (
    <button className="enter-button" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default EnterButton;
