import React from "react";
import PropTypes from "prop-types";
import { Card, CardHeader, CardBody } from "shards-react";
import Chart from "../../utils/chart";
import { Store } from "../../flux";
import ReactTooltip from 'react-tooltip';
import { FaRegQuestionCircle } from "react-icons/fa";

class StockChart extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  handleChartData() {
    var datasets = []
    datasets.push({
      label: this.props.subtitle,
      fill: "start",
      data: this.props.data,
      backgroundColor: "rgba(0,123,255,0.1)",
      borderColor: "rgba(0,123,255,1)",
      pointBackgroundColor: "#ffffff",
      pointHoverBackgroundColor: "rgb(0,123,255)",
      borderWidth: 1.5,
      pointRadius: 0,
      pointHoverRadius: 3
    })
    if(this.props.limit){
      datasets.push({
        label: "Limit",
        fill: "start",
        data: this.props.limit,
        backgroundColor: "rgba(255,65,105,0.1)",
        borderColor: "rgba(255,65,105,1)",
        pointBackgroundColor: "#ffffff",
        pointHoverBackgroundColor: "rgba(255,65,105,1)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(255,65,105,1)"
      })
    }
    if(this.props.limitTop){
      datasets.push({
        label: "Limit Top",
        fill: "start",
        data: this.props.limitTop,
        borderColor: "rgba(60, 179, 113,1)",
        backgroundColor: "rgba(255,65,105,0)",
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: "rgba(60, 179, 113,1)"
      })
    }
    return {
      labels: this.props.labels,
      datasets: datasets
    }
  }

  componentDidMount() {
    const chartOptions = {
      ...{
        responsive: true,
        legend: {
          position: "top"
        },
        elements: {
          line: {
            // A higher value makes the line look skewed at this ratio.
            tension: 0.3
          },
          point: {
            radius: 0
          }
        },
        scales: {
          xAxes: [
            {
              gridLines: false,
              ticks: {
                callback(tick, index) {
                  // Jump every 7 values on the X axis labels to avoid clutter.
                  return index % 1 !== 0 ? "" : tick;
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                suggestedMax: this.props.data[0] < 5 ? this.props.data[0] + 1 : 45,
                callback(tick) {
                  if (tick === 0) {
                    return tick;
                  }
                  
                  // Format the amounts using Ks for thousands.
                  return tick > 999 ? `${(tick / 1000).toFixed(1)}K` : tick;
                }
              }
            }
          ]
        },
        hover: {
          mode: "nearest",
          intersect: false
        },
        tooltips: {
          custom: false,
          mode: "nearest",
          intersect: false
        }
      },
      ...this.props.chartOptions
    };

    const BlogUsersOverview = new Chart(this.canvasRef.current, {
      type: "LineWithLine",
      data: this.handleChartData(),
      options: chartOptions
    });

    // They can still be triggered on hover.
    const buoMeta = BlogUsersOverview.getDatasetMeta(0);
    buoMeta.data[0]._model.radius = 0;
    buoMeta.data[
      this.props.data.length - 1
    ]._model.radius = 0;

    // Render the chart.
    BlogUsersOverview.render();
  }

  render() {
    const { title } = this.props;
    const desc = Store.getStockDescription()[this.props.subtitle]
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0" >{title} {'  '}
            <FaRegQuestionCircle data-tip data-for={this.props.subtitle} className="ml-4"></FaRegQuestionCircle>
          </h6>

         
          <ReactTooltip id={this.props.subtitle} place="right" type="dark" effect="float">
          <span>{desc}</span>
          </ReactTooltip>
        </CardHeader>
        <CardBody className="pt-0">
          <canvas
            height="120"
            ref={this.canvasRef}
            style={{ maxWidth: "100% !important" }}
          />
        </CardBody>
      </Card>
    );
  }
}

StockChart.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  labels: PropTypes.array,
  data: PropTypes.array,
  limit: PropTypes.array,
  limitTop: PropTypes.array,
  subtitle: PropTypes.string,
  /**
   * The Chart.js options.
   */
  chartOptions: PropTypes.object
};

StockChart.defaultProps = {
  title: "Users Overview",
};

export default StockChart;
