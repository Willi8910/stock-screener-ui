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
import { Link, Navigate } from "react-router-dom";
import { BallTriangle } from  'react-loader-spinner';
import Stack from 'react-bootstrap/Stack';


const Register = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault();
    
    if(email == "" || password == "" || passwordConfirmation == ""){
      setLoading(false)
      alert("Email and password are required")
      return;
    }

    if( password != passwordConfirmation){
      setLoading(false)
      alert("Password confirmation is invalid")
      return;
    }


    const result = await Store.registerAccount({
      user: {
        email: email,
        password: password,
        password_confirmation: passwordConfirmation
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
  <Container fluid className="main-content-container px-4" style={{height: '100%', minHeight: 'calc(100vh)', paddingTop: '10%'}}>
    
    <Row>
      <Col xl="4" lg="6" md="8" sm="10" className="mb-4 m-auto">
        <Card small style={{background: 'rgba(195, 213, 219, 0.5)'}}>
          <ListGroup flush>
            <ListGroupItem className="p-3" style={{background: 'rgba(195, 213, 219, 0.5)'}}>
            <Row>
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1 m-auto"
                style={{ maxWidth: "100px" }}
                src={require("../../images/shards-dashboards-logo.svg")}
                alt="Stock Screener"
              />
            </Row>
            <Row className="page-header py-4">
              <PageTitle
                sm="12"
                title="Register Account"
                className="text-sm-left m-auto"
              />
            </Row>
              <Row>
                <Col  >
                  <Form onSubmit={handleSubmit}>
                    <Row form>
                      <Col md="12" className="form-group">
                        <label htmlFor="feEmailAddress">Email</label>
                        <FormInput
                          id="feEmailAddress"
                          type="email"
                          placeholder="Email"
                          onChange={e => setEmail(e.target.value)} 
                        />
                      </Col>
                      <Col md="12" className="form-group">
                        <label htmlFor="fePassword">Password</label>
                        <FormInput
                          id="fePassword"
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Col>
                      <Col md="12" className="form-group">
                        <label htmlFor="fePasswordConfirmation">Password Confirmation</label>
                        <FormInput
                          id="fePasswordConfirmation"
                          type="password"
                          placeholder="Password Confirmation"
                          onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                      </Col>
                    </Row>
                    <Stack direction="horizontal" gap={3}>
                      <Button type="submit" className="mt-3">Create New Account</Button>
                      <Link to='/sign-in'>
                        <Button className="mt-3">Login</Button>
                      </Link>
                    </Stack>
                   
                    
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
