import React, { useState } from "react";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from "shards-react";

const StockInputForm = (props) =>{
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.searchStock(name)
  }

  return (
    <Card small className="mb-4 mt-4" >
      <CardHeader className="border-bottom">
        <h6 className="m-0">Input Your stock:</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form >
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="feStockName">Stock Name</label>
                    <FormInput
                      id="feStockName"
                      placeholder="Stock name"
                      value={name}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
                <Button theme="accent" onClick={handleSubmit}>Start Analyze</Button>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );

} 

export default StockInputForm;
