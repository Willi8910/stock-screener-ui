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
import { Navigate, NavLink as RouteNavLink } from "react-router-dom";
import { NavLink } from "shards-react";
import { BallTriangle } from  'react-loader-spinner';


const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await Store.registerAccount({
      user: {
        email: email,
        password: password
      }
    });

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
        title="Create Account"
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
                      <Button type="submit" className="mt-4 mb-4">Create New Account</Button>
                      <NavLink to='/sign-in'>
                        <Button className="mt-3">Login</Button>
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

export default Register;
