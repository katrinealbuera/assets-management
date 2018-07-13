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
                                <div className="form-group">
                                    <label>Category</label>
                                    <select class="form-control">
                                        <option></option>
                                        <option>LAPTOP</option>
                                        <option>MONITOR</option>
                                    </select>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <form>
                                            <div className="form-group">
                                                <label>Asset Tag</label>
                                                <input className="form-control" placeholder="Asset Tag" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Asset Name</label>
                                                <input className="form-control" placeholder="Asset Name" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Model</label>
                                                <input className="form-control" placeholder="Model" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Serial</label>
                                                <input className="form-control" placeholder="Serial" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Status</label>
                                                <select class="form-control">
                                                    <option></option>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Purchase Date</label>
                                                <input className="form-control" placeholder="Purchase Date" type="date"/>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="col-lg-6">
                                        <form>
                                            <div className="form-group">
                                                <label>Supplier</label>
                                                <input className="form-control" placeholder="Supplier" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Purchase Order (PO)</label>
                                                <input className="form-control" placeholder="Purchase Order (PO)" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Purchase Cost</label>
                                                <input className="form-control" placeholder="Purchase Cost" type="number"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Warranty</label>
                                                <input className="form-control" placeholder="Warranty" type="text"/>
                                            </div>
                                            <div className="form-group">
                                                <label>Notes</label>
                                                <textarea class="form-control" rows="4" placeholder="Notes"></textarea>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-12">
                                        <div>
                                            <input type="submit" className="btn btn-primary" value="Create"/>
                                        </div>
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