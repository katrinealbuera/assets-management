import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return <div>
    <nav className="navbar navbar-default navbar-static-top" role="navigation">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
        <NavLink to="/">
            <a className="navbar-brand">Assets Management</a>
        </NavLink>
      </div>

      <div className="navbar-default sidebar" role="navigation">
          <div className="sidebar-nav navbar-collapse">
              <ul className="nav" id="side-menu">
                  <li className="sidebar-search">
                      <div className="input-group custom-search-form">
                          <input type="text" className="form-control" placeholder="Search..." />
                          <span className="input-group-btn">
                          <button className="btn btn-default" type="button">
                              <i className="fa fa-search"></i>
                          </button>
                      </span>
                      </div>
                  </li>
                  <li>
                      <NavLink to="/">
                        <i className="fa fa-home fa-fw"></i> HOME
                      </NavLink>
                  </li>
                  <li>
                        <NavLink to="/create_asset">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> CREATE ASSET
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> CATEGORY
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> MODEL
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="fa fa-plus fa-fw"></i> SUPPLIER
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> MANUFACTURER
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> MEMORY
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> PROCESSOR
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> VIDEO CARD
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> HARD DISK
                        </NavLink>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
  </div>
};

export default Sidebar;