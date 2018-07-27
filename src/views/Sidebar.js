import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return <div>
    <nav className="navbar navbar-default navbar-static-top">
      <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
          </button>
        <NavLink to="/">
            <p className="navbar-brand">Assets Management</p>
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
                        <NavLink to="/asset">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> ASSETS
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/category">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> CATEGORIES
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/manufacturer">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> MANUFACTURERS
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/model">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> MODELS
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/processor">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> PROCESSORS
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/sizes">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> SIZES
                        </NavLink>
                  </li>
                  <li>
                        <NavLink to="/supplier">
                            <i className="glyphicon glyphicon-plus fa-fw"></i> SUPPLIERS
                        </NavLink>
                  </li>
              </ul>
          </div>
      </div>
    </nav>
  </div>
};

export default Sidebar;