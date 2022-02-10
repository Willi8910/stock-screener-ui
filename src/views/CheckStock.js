import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardHeader, CardBody, Alert } from "shards-react";
import axios from "axios";

import PageTitle from "../components/common/PageTitle";
import StockChart from "../components/blog/StockChart";
import StockInputForm from "../components/stock/StockInputForm";
// import Alert from 'react-bootstrap/Alert';
import { Store } from "../flux";
import { BallTriangle } from  'react-loader-spinner';

const baseURL = "https://stock-screener-api.herokuapp.com";

class CheckStock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stock: null, name:"", loading: false, error: null, token: Store.getAccount()}
  }

  searchStock = (stockName) => {
    if(!this.state.loading){
      this.setState({ loading: true, stock: null, name:"", error: null });
      axios.post(baseURL + "/stocks", { stock: stockName }, {
        headers: {
          Authorization: this.state.token
        }
      })
      .then((response) => {
        if(response.status === 200){
          this.setState({stock: response.data, name: stockName, loading:false})
        }
        else{
          const message = "Something wrong happen"
          this.setState({error: message, loading:false})
        }
      }) 
      .catch((error) => {
        this.setState({loading:false, error: 'Something wrong happen please try again'})
      })
    }
  }

  renderChart = () => {
    const stock = this.state.stock
    if(stock){
      const stats = Object.keys(stock.valuation);
      return(
      stats.map((stat, idx) => {
        const val = stock.valuation[stat]
        const valData = Object.keys(val)
        const labels = val[valData[0]].length < 10 ? stock.year.year5 : stock.year.year10
        const limit = valData.length > 1 ? val[valData[1]] : null
        const limitTop = valData.length > 2 ? val[valData[2]] : null
        return (
          <Col lg ="6" className="mb-4" key={idx}>
            <StockChart title={valData[0]} subtitle={stat} labels={labels} data={val[valData[0]]} limit={limit} limitTop={limitTop}/>
          </Col>
        )}
      ))
    }
  }

  renderTable = () => {
    if(this.state.stock){
      const price = this.state.stock.price;
      var priceTable = []
      for (let index = 0; index < 3; index++) {
        var method = {
          method: price['Method'][index], 
          current_price: price["Current Price"][index],
          fair_price: price["Fair Price"][index],
          mos: Math.round((price["MOS"][index] + Number.EPSILON) * 100) / 100 
        }      
        priceTable.push(method)
      }
      return(
        <Row className="justify-content-center">
          <Col lg="8">
            <Card small className="mb-4 mx-auto">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Fair Price Calculation</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Method
                      </th>
                      <th scope="col" className="border-0">
                        Current Price
                      </th>
                      <th scope="col" className="border-0">
                        Fair Price
                      </th>
                      <th scope="col" className="border-0">
                        Margin of Safety (MOS)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceTable.map((method, idx) => {
                      return(
                      <tr key={idx}>
                        <td>{idx}</td>
                        <td>{method.method}</td>
                        <td>{method.current_price}</td>
                        <td>{method.fair_price}</td>
                        <td>{method.mos}</td>
                      </tr>
                      )
                    })}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )
    }
  }

  render() {
    return (
      <Container fluid className="main-content-container">
      { this.state.error && 
        <Alert className="mb-0" style={{backgroundColor:'#fa8991'}}>
        <i className="fa fa-info mx-2"></i> {this.state.error}
        </Alert>
      }

        {/* Page Header */}
        <StockInputForm searchStock={this.searchStock}/>
        {this.state.loading && <BallTriangle wrapperStyle={{justifyContent: "center"}} color="#00BFFF" height={100} width={100} />}

        {this.state.stock && 
          <Row noGutters className="page-header py-4">
            <PageTitle title={this.state.name} subtitle="Stock Analytics" className="text-sm-left mb-3" />
          </Row>
        }
        {this.renderTable()}
        <Row>
          {this.renderChart()}
        </Row>
      </Container>
    );
  }
}


CheckStock.propTypes = {
  smallStats: PropTypes.array
};

export default CheckStock;


