import { FormattedMessage } from "react-intl";
import "./Footer.scss";
import CoingeckoLogo from "./assets/footer-coingecko-logo.png";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-section">
        <span>
          <p>
            <FormattedMessage id="footer_text_3" />
          </p>
        </span>
        <img src={CoingeckoLogo} alt="coingecko-logo" />
      </div>
    </div>
  );
};

export default Footer;
