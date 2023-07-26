import React from "react";
import { Container, Row,  Card, CardHeader, CardBody, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import SmallStats from "../components/common/SmallStats";
import { Store } from "../flux";
import { BallTriangle } from "react-loader-spinner";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stocks: null, loading: true}
  }


  initialize = async () => {
    const recs = await Store.getRecommendation();

    if(recs.success){
      this.setState({stocks: recs.data, loading:false})
    }
    else alert("Something wrong happen please try again");
  }

  componentDidMount() {
    this.initialize()
  }

  openInNewTab(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  renderTable = () => {
    if(this.state.stocks){
      return(
        <Row className="justify-content-center">
          <Col lg="12">
            <Card small className="mb-4 mx-auto">
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        #
                      </th>
                      <th scope="col" className="border-0">
                        Stock Name
                      </th>
                      <th scope="col" className="border-0">
                        Price
                      </th>
                      <th scope="col" className="border-0">
                        PER Fair Price
                      </th>
                      <th scope="col" className="border-0">
                        PBV Ratio Fair Price
                      </th>
                      <th scope="col" className="border-0">
                        Benjamin Fair Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.stocks.map((stock, idx) => {
                      return(
                        <tr key={idx} data-tip data-for={'s' + stock.name} style={{cursor:'pointer'}} onClick={() => this.openInNewTab('http://localhost:3000/check-stock?stock=' + stock.name)}>
                          <td>{idx + 1}</td>
                          <td>{stock.name}</td>
                          <td>{stock.current_value}</td>
                          <td>{stock.price["Fair Price"][0].toFixed(2)} (<span className="text-success">{stock.price["MOS"][0].toFixed(2)}</span>)</td>
                          <td>{stock.price["Fair Price"][1].toFixed(2)} (<span className="text-success">{stock.price["MOS"][1].toFixed(2)}</span>)</td>
                          <td>{stock.price["Fair Price"][2].toFixed(2)} (<span className="text-success">{stock.price["MOS"][2].toFixed(2)}</span>)</td>
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
  
  render(){
    return (
      <Container fluid className="main-content-container">

        {/* Page Header */}

        <Row noGutters className="page-header py-4">
          <PageTitle title="Recommended Stock" subtitle="Dashboard" className="text-sm-left mb-3" />
        </Row>

        {this.state.loading && <BallTriangle wrapperStyle={{justifyContent: "center"}} color="#00BFFF" height={100} width={100} />}

        {this.renderTable()}
      </Container>
    );
  }
      
}

export default Recommendations;
