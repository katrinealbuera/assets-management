import React, { Component }  from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { signOut } from '../actions/assetAction';
import { getUserId } from '../actions/assetAction';

class Sidebar extends Component {

    onclick = () => {
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
    var isAuth = localStorage.getItem('user');
    
return (
<div onLoad={this.getUser}>
    <nav className="navbar navbar-default navbar-static-top">
      <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
            <div className="input-group custom-search-form">
                <span className="input-group-btn">
                    <p className="navbar-brand"><NavLink to="/">Assets Management</NavLink></p>
                </span>
            </div>
              <ul className="nav">
                    { isAuth ? 
                    <li>
                        <a className="dropdown-toggle" onClick={this.onclick}>
                            <i className="glyphicon glyphicon-log-in"></i> LOGOUT
                        </a>
                    </li>
                    : 
                    <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-log-in"></i> LOGIN
                        </NavLink>
                    </li> }
                    <li>
                        <NavLink to="/">
                        <i className="fa fa-home"></i> HOME
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/new_user">
                            <i className="fa fa-user"></i> USER
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/add_asset">
                            <i className="fa fa-edit"></i> CREATE ASSETS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/edit_asset">
                            <i className="fa fa-edit"></i> EDIT ASSET
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/category">
                            <i className="fa fa-edit"></i> CATEGORIES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/manufacturer">
                            <i className="fa fa-edit"></i> MANUFACTURERS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/model">
                            <i className="fa fa-edit"></i> MODELS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/processor">
                            <i className="fa fa-edit"></i> PROCESSORS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/sizes">
                                <i className="fa fa-edit"></i> SIZES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/supplier">
                            <i className="fa fa-edit"></i> SUPPLIERS
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