import React, { Component }  from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from '../actions/assetAction';
import { getUserId } from '../actions/assetAction';

class Sidebar extends Component {
    logoutBtn = () => {
        this.props.signOut(this.RedirectToLogin);
        window.location.reload(true);
    }

    RedirectToLogin = () => {
        this.context.router.history.push("/");
    }

    getUser = () => {
        this.props.getUserId(localStorage.getItem('id'));
      }

render() {
return (
<div onLoad={this.getUser}>
    <nav className="navbar-default navbar-static-top">
        <div className="navbar-header">
            <a className="navbar-brand">Assets Management</a>
        </div>
        <ul className="nav navbar-top-links navbar-right">
        { localStorage.getItem('user') ? 
            <li className="dropdown">
                <a className="navbar-toggle" onClick={this.logoutBtn}>
                    <i className="glyphicon glyphicon-log-in"> LOGOUT</i>
                </a>
            </li> :
            <li className="dropdown">
                <NavLink to="/">
                    <i className="glyphicon glyphicon-log-in"> LOGIN</i>
                </NavLink>
            </li> }
        </ul>
      <div className="navbar-default sidebar">
          <div className="sidebar-nav navbar-collapse">
              <ul className="nav">
                    <li>
                        <NavLink to="/">
                            <i className="fa fa-home"> HOME</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/user">
                            <i className="fa fa-users"> USERS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add_asset">
                            <i className="fa fa-plus"> CREATE ASSETS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/edit_asset">
                            <i className="fa fa-laptop"> ASSETS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/category">
                            <i className="fa fa-tags"> CATEGORIES</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manufacturer">
                            <i className="fa fa-industry"> MANUFACTURERS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/model">
                            <i className="fa fa-files-o"> MODELS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/processor">
                            <i className="fa fa-hdd-o"> PROCESSORS</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sizes">
                            <i className="fa fa-tachometer"> SIZES</i>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/supplier">
                            <i className="fa fa-truck"> SUPPLIERS</i>
                        </NavLink>
                    </li>
                </ul>
          </div>
      </div>
    </nav>
</div>
    )}
}

const mapStateToProps = state => ({
    unauthenticated: state.unauthenticated.unauthenticatedError,
    users: state.users.userList,
})

Sidebar.contextTypes = {
    router: PropTypes.object.isRequired
} 

export default connect(mapStateToProps, {signOut, getUserId})(Sidebar);