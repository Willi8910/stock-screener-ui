import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "./../components/common/PageTitle";
import SmallStats from "./../components/common/SmallStats";
import { Store } from "../flux";
import { BallTriangle } from "react-loader-spinner";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class StockOverview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stocks: null, loading: true}
  }

  removeStock(idx){
    const stocks = [...this.state.stocks]
    stocks.splice(idx, 1)
    this.setState({stocks: stocks})
  }

  deleteStock = (idx) => {
    const stock = this.state.stocks[idx]
    console.log(stock)
    const deleteStock = () => Store.deleteStock(stock.priceData.id);
    confirmAlert({
      message: 'Confirm to delete ' + stock.label,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            toast.promise(
                deleteStock,
                {
                  pending: 'Deleting stock',
                  success: 'Successfully delete stock',
                  error: 'Fail to delete stock'
                }
            ).then(() => this.removeStock(idx))
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }
  
  addFavourite = (id) => {
    const saveFavourite = () => Store.saveFavourite(id);
    toast.promise(
      saveFavourite,
      {
        pending: 'Add favourite',
        success: 'Successfully add favourite',
        error: 'Fail to add favourite'
      }
    ).then(() => {
      this.setState({loading: true})
      this.initialize()
    })
  }

  deleteFavourite = (id) => {
    const deleteFavourite = () => Store.deleteFavourite(id);
    toast.promise(
      deleteFavourite,
      {
        pending: 'Remove favourite',
        success: 'Successfully remove favourite',
        error: 'Fail to remove favourite'
      }
    ).then(() => {
      this.setState({loading: true})
      this.initialize()
    })
  }

  initialize = async () => {
    const stocks = await Store.getStocks();

    if(stocks.success){
      const stockData = (stocks.data.map((stock) => {
        const diff = parseFloat(stock.difference)

        var chart = ({
          label: stock.name,
          value: stock.current_value,
          percentage: stock.difference+"%",
          increase: true,
          decrease: false,
          chartLabels: [null, null, null, null, null, null, null, null, null, null, null],
          attrs: { md: "4", sm: "6", lg: '3'},
          priceData: Object.assign({}, stock),
          datasets: [
            {
              label: "Today",
              fill: "start",
              borderWidth: 1.5,
              backgroundColor: "rgba(255,180,0,0.1)",
              borderColor: "rgb(255,180,0)",
              data: stock.chart
            }
          ]
        });

        if(diff > 0){
          chart.datasets[0].backgroundColor="rgba(0, 184, 216, 0.1)";
          chart.datasets[0].borderColor="rgb(0, 184, 216)";
        }
        else if(diff < 0){
          chart.datasets[0].backgroundColor="rgba(255,65,105,0.1)";
          chart.datasets[0].borderColor="rgb(255,65,105)";
          chart.increase = false
          chart.decrease = true
        }

        return chart
          
      }))
  
      this.setState({stocks: stockData, loading: false})
    }
    else alert("Something wrong happen please try again");
  }

  componentDidMount() {
    this.initialize()
    
  }

  renderStockStats() {
    if(this.state.stocks){
      return this.state.stocks.map((stats, idx) => (
        <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
          <SmallStats
            id={`small-stats-${idx}`}
            variation="1"
            chartData={stats.datasets}
            chartLabels={stats.chartLabels}
            label={stats.label}
            value={stats.value}
            percentage={stats.percentage}
            increase={stats.increase}
            decrease={stats.decrease}
            priceData={stats.priceData}
            deleteStock={() => this.deleteStock(idx)}
            saveFavourite={(id) => this.addFavourite(id)}
            deleteFavourite={(id) => this.deleteFavourite(id)}
          />
        </Col>
      ))
    }
  }

  renderToast(){
    return <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        />
  }
  
  render(){
    return(
      <Container fluid className="main-content-container px-4">
        {this.renderToast()}
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle title="Stock Overview" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {this.state.loading && <BallTriangle wrapperStyle={{justifyContent: "center"}} color="#00BFFF" height={100} width={100} />}


        <Row>
          {this.renderStockStats()}
        </Row>
      </Container>
    )
  }
      
}

export default StockOverview;
