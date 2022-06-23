import React from "react";
import { NewsData } from "./interfaces";
import { FormattedMessage } from "react-intl";
import "./NewsSection.scss";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  data: NewsData | undefined;
}

const NewsSection: React.FunctionComponent<Props> = (props) => {
  const { data } = props;

  return (
    <div className="news-section-container">
      <div className="news-section-heading">
        <h1>
          🗞️ <FormattedMessage id="news_section_heading" />
        </h1>
      </div>
      <div className="news-list-container">
        <ul>
          {data?.articles ? (
            data?.articles.map((item, index) => {
              return (
                <span key={index}>
                  <li key={index}>
                    <a href={item.link} target="_blank" rel="noreferrer">
                      {item.published_date} - {item.title} - ({item.clean_url})
                    </a>
                  </li>
                </span>
              );
            })
          ) : (
            <span className="cliploader">
              <ClipLoader size={50} />
            </span>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewsSection;
