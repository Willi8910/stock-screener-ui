import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";

import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainFooter from "../components/layout/MainFooter";
import Background from "../images/background/base_background.jpg";

const Guest = ({ children, noNavbar, noFooter }) => (
  <Container fluid style={{backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#cccccc'}}>
    <Row>
      <Col
        className="main-content p-0"
        sm="12"
        tag="main"
      >
        {children}
      </Col>
    </Row>
  </Container>
);

Guest.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

Guest.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default Guest;
