import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "./LineChart.scss";
import { PriceData } from "../../pages/DetailedAssetPage/interfaces";
Chart.register(...registerables);

interface Props {
  label?: string;
  data: PriceData | undefined;
}

const LineChart: React.FunctionComponent<Props> = (props) => {
  const { data, label } = props;
  let datesArray: string[] = [];
  let pricesArray: number[] = [];

  const prepareChartData = () => {
    data?.prices.map((price) => {
      return (
        datesArray.push(new Date(price[0]).toString().slice(0, 15)),
        pricesArray.push(price[1])
      );
    });
  };

  useMemo(() => {
    prepareChartData();
  }, [data?.prices, datesArray, pricesArray]);

  return (
    <div className="line-chart-container">
      <Line
        options={{
          elements: {
            point: {
              radius: 0.5,
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              backgroundColor: "black",
            },
            legend: { display: false },
            subtitle: {
              display: false,
              text: label,
            },
          },
        }}
        height={400}
        width={600}
        data={{
          labels: datesArray,
          datasets: [
            {
              label: label,
              data: pricesArray,
              borderColor: ["rgb(0, 217, 152)"],
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "rgba(0, 217, 152, 0.1)",
              },
            },
          ],
        }}
      ></Line>
    </div>
  );
};

export default LineChart;
