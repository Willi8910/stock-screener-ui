import React, {useState} from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  FormInput,
  Button,
  Form,
} from "shards-react";

import { Store } from "../../flux";
import PageTitle from "../../components/common/PageTitle";
import { Navigate } from "react-router-dom";
import { NavLink } from "shards-react";

import { BallTriangle } from  'react-loader-spinner';


const ComponentsOverview = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault();
    const result = await Store.loginAccount({
      user: {
        email: email,
        password: password
      }
    });

    setLoading(false)
    if(result.success){
      setRedirect('/check-stock');
    }
    else {
      alert(result.message)
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }
  return(
  <Container fluid className="main-content-container px-4">
    <Row noGutters className="page-header py-4">
      <PageTitle
        sm="4"
        title="Login"
        className="text-sm-left"
      />
    </Row>
    <Row>
      <Col lg="8" className="mb-4">
        <Card small>
          <ListGroup flush>
            <ListGroupItem className="p-3">
              <Row>
                <Col>
                  <Form onSubmit={handleSubmit}>
                    <Row form>
                      <Col md="6" className="form-group">
                        <label htmlFor="feEmailAddress">Email</label>
                        <FormInput
                          id="feEmailAddress"
                          type="email"
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)} 
                        />
                      </Col>
                      <Col md="6">
                        <label htmlFor="fePassword">Password</label>
                        <FormInput
                          id="fePassword"
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <div className="d-flex">
                      <Button type="submit" className="mt-4 mb-4">Login</Button>
                      <NavLink to='/register'>
                        <Button className="mt-3">Create New Account</Button>
                      </NavLink>
                    </div>
                   
                    
                  </Form>
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>

        
    </Row>
    {loading && <BallTriangle wrapperStyle={{justifyContent: "center"}} color="#00BFFF" height={100} width={100} />}
  </Container>
  )};

export default ComponentsOverview;
