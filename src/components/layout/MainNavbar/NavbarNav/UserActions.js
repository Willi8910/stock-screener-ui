import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { Store } from "../../../../flux";

export default class UserActions extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      email: Store.getEmail()
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  async logoutAccount(){
    const result = await Store.logoutAccount();
    window.location.reload(false);
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
         
          <span className="d-md-inline-block">{this.state.email}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          
          <DropdownItem>
          <Link to='/reset-password' className="d-md-inline-block">Reset password</Link>
          </DropdownItem>
          <DropdownItem onClick={this.logoutAccount} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
