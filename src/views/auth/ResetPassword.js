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

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [cnewPassword, setCNewPassword] = useState();
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async e => {
    setLoading(true)
    e.preventDefault();
    
    if(password == "" || newPassword == "" || cnewPassword == ""){
      setLoading(false)
      alert("Missing fields")
      return;
    }
    if(newPassword != cnewPassword){
      setLoading(false);
      alert("New password is not the same as confirm password")
      return;
    }
    const result = await Store.resetPassword({
      user: {
        password: password,
        new_password: newPassword,
        new_password_confirmation: cnewPassword,
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
  <Container fluid className="main-content-container px-4" style={{height: '100%', minHeight: 'calc(100vh)', paddingTop: '1%'}}>
    
    <Row>
      <Col xl="4" lg="6" md="8" sm="10" className="mb-4 mx-auto">
        <Card small>
          <ListGroup flush>
            <ListGroupItem className="p-3">
            <Row className="page-header py-4">
              <PageTitle
                sm="12"
                title="Reset Password"
                className="text-sm-left m-auto"
              />
            </Row>
              <Row>
                <Col  >
                  <Form onSubmit={handleSubmit}>
                    <Row form>
                      <Col md="12">
                        <label htmlFor="feCPassword">Current Password</label>
                        <FormInput
                          id="feCPassword"
                          type="password"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                          require
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12">
                        <label htmlFor="feNPassword">New Password</label>
                        <FormInput
                          id="feNPassword"
                          type="password"
                          placeholder="New Password"
                          onChange={e => setNewPassword(e.target.value)}
                          require
                        />
                      </Col>
                    </Row>
                    <Row form>
                      <Col md="12">
                        <label htmlFor="feCNPassword">Confirm New Password</label>
                        <FormInput
                          id="feCNPassword"
                          type="password"
                          placeholder="Confirm New Password"
                          onChange={e => setCNewPassword(e.target.value)}
                          require
                        />
                      </Col>
                    </Row>
                    <Stack direction="horizontal" gap={3}>
                      <Button type="submit" className="mt-4">Reset Password</Button>
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

export default ResetPassword;
