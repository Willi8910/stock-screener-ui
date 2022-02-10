import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import shortid from "shortid";
import { Card, CardBody } from "shards-react";
import ReactTooltip from 'react-tooltip';
import Chart from "../../utils/chart";

class SmallStats extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
          custom: false
        },
        elements: {
          point: {
            radius: 0
          },
          line: {
            tension: 0.33
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: false,
              scaleLabel: false,
              ticks: {
                display: false,
                isplay: false,
                // Avoid getting the graph line cut of at the top of the canvas.
                // Chart.js bug link: https://github.com/chartjs/Chart.js/issues/4790
                suggestedMax: Math.max(...this.props.chartData[0].data) +  Math.max(...this.props.chartData[0].data) * 0.1
              }
            }
          ]
        }
      },
      ...this.props.chartOptions
    };

    const chartConfig = {
      ...{
        type: "line",
        data: {
          ...{
            labels: this.props.chartLabels
          },
          ...{
            datasets: this.props.chartData
          }
        },
        options: chartOptions
      },
      ...this.props.chartConfig
    };

    new Chart(this.canvasRef.current, chartConfig);
  }

  render() {
    const { variation, label, value, percentage, increase, priceData } = this.props;

    const cardClasses = classNames(
      "stats-small",
      variation && `stats-small--${variation}`
    );

    const cardBodyClasses = classNames(
      variation === "1" ? "p-0 d-flex" : "px-0 pb-0"
    );

    const innerWrapperClasses = classNames(
      "d-flex",
      variation === "1" ? "flex-column m-auto" : "px-3"
    );

    const dataFieldClasses = classNames(
      "stats-small__data",
      variation === "1" && "text-center"
    );

    const labelClasses = classNames(
      "stats-small__label",
      "text-uppercase",
      variation !== "1" && "mb-1"
    );

    const valueClasses = classNames(
      "stats-small__value",
      "count",
      variation === "1" ? "my-3" : "m-0"
    );

    const innerDataFieldClasses = classNames(
      "stats-small__data",
      variation !== "1" && "text-right align-items-center"
    );

    const percentageClasses = classNames(
      "stats-small__percentage",
      `stats-small__percentage--${increase ? "increase" : "decrease"}`
    );

    const miniValueClasses = classNames(
      "stats-small__label",
      "text-uppercase",
      variation !== "1" && "mb-1",
      'ml-10',
      "align-self-end"
    );

    const canvasHeight = variation === "1" ? 120 : 60;

    return (
      <Card small className={cardClasses}>
        <CardBody className={cardBodyClasses}>
          <div className={innerWrapperClasses} style={{width: '80%'}}>
            <div className={dataFieldClasses}>
              <span className={labelClasses}>{label}</span>
              <div className="d-flex justify-content-center">
                <h6 className={valueClasses} data-tip data-for={'price' + label} >{value}</h6>
                <h6 className={miniValueClasses} style={{marginLeft: '7px'}} data-tip data-for={'priceb' + label} >  {increase? '>' : '<'}  {priceData.value}</h6>
              </div>
            </div>
            <div className={innerDataFieldClasses}>
              <span className={percentageClasses} data-tip data-for={'%' + label}>{percentage}</span>
            </div>
            <div className="d-flex justify-content-around mt-2">
              <span data-tip data-for={'pb' + label} style={{ zIndex: 1}}>{priceData.pb_fair_value}</span>
              <span data-tip data-for={'pe' + label} style={{ zIndex: 1}}>{priceData.pe_fair_value}</span>
              <span data-tip data-for={'bj' + label} style={{ zIndex: 1}}>{priceData.benjamin_fair_value}</span>
            </div>
          </div>
          <ReactTooltip id={'price' + label} place="top" type="dark" effect="float" style={{ zIndex: 1}}><span>Current Value</span></ReactTooltip>
          <ReactTooltip id={'priceb' + label} place="top" type="dark" effect="float" style={{ zIndex: 1}}><span>Last Checked Value</span></ReactTooltip>
          <ReactTooltip id={'%' + label} place="right" type="dark" effect="float" style={{ zIndex: 1}}><span>Difference in %</span></ReactTooltip>
          <ReactTooltip id={'pb' + label} place="bottom" type="dark" effect="float" style={{ zIndex: 1}}><span>P/B Fair Value</span></ReactTooltip>
          <ReactTooltip id={'pe' + label} place="bottom" type="dark" effect="float" style={{ zIndex: 1}}><span>P/E Fair Value</span></ReactTooltip>
          <ReactTooltip id={'bj' + label} place="bottom" type="dark" effect="float" style={{ zIndex: 1}}><span>Benjamin Fair Value</span></ReactTooltip>
          <canvas
            height={canvasHeight}
            ref={this.canvasRef}
            className={`stats-small-${shortid()}`}
          />
        </CardBody>
      </Card>
    );
  }
}

SmallStats.propTypes = {
  /**
   * The Small Stats variation.
   */
  variation: PropTypes.string,
  /**
   * The label.
   */
  label: PropTypes.string,
  /**
   * The value.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * The percentage number or string.
   */
  percentage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * Whether is a value increase, or not.
   */
  increase: PropTypes.bool,
  /**
   * The Chart.js configuration object.
   */
  chartConfig: PropTypes.object,
  /**
   * The Chart.js options object.
   */
  chartOptions: PropTypes.object,
  /**
   * The chart data.
   */
  chartData: PropTypes.array.isRequired,
  /**
   * The chart labels.
   */
  chartLabels: PropTypes.array,

  priceData: PropTypes.object
};

SmallStats.defaultProps = {
  increase: true,
  percentage: 0,
  value: 0,
  label: "Label",
  chartOptions: Object.create(null),
  chartConfig: Object.create(null),
  chartData: [],
  chartLabels: [],
  priceData: {}
};

export default SmallStats;
