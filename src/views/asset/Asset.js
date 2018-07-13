import React from "react";
import { NavLink } from "react-router-dom";

function Asset() {
  return <div>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Create Asset</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <form role="form">
                                            <div className="form-group">
                                                <label>Text Input</label><input className="form-control" placeholder="Name"/>
                                                <p className="help-block">Example block-level help text here.</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  </div>
};

export default Asset;