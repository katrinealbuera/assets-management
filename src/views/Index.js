import React, { Component } from "react";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux';
import { getAssets } from '../actions/assetAction';

class Index extends Component {

  componentWillMount() {
    this.props.getAssets();
  }

  render() {

    var assetList = this.props.assets.map(function(props, index) {
      return(
        <tr key={'asset_'+index}>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.id}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.serialNo}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.assetTag}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.battery}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.name}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.assignedTo}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.deliveryDate}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.modelId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.processorId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.memoryId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.videoCardId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.hardDiskId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.poNo}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.drNo}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.siNo}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.macAddress}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.ipAddress}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.status}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.manufacturerId}</p></td>
          <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.categoryId}</p></td>
        </tr>
      );}, this); 

    return (
      <div id="page-wrapper">
      <div className="row">
        <div className="col-lg-12">
            <h1 className="page-header">Asset</h1>
        </div>
      </div>
      <div className="row">
          <div className="col-lg-12">
              <div className="panel panel-primary">
                  <div className="panel-heading">
                    <p> List of Asset </p>
                  </div>
                  <div className="panel-body">
                      <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr className="info">
                                    <th>ID</th>
                                    <th>S/N</th>
                                    <th>IT Asset Tag</th>
                                    <th>Battery UnLT</th>
                                    <th>Hostname / Asset Name</th>
                                    <th>Assigned to</th>
                                    <th>Delivery Date</th>
                                    <th>Model</th>
                                    <th>CPU</th>
                                    <th>RAM</th>
                                    <th>Video Card</th>
                                    <th>HDD / SSD</th>
                                    <th>PO #</th>
                                    <th>DR #</th>
                                    <th>SI #</th>
                                    <th>MAC Address</th>
                                    <th>IP Address</th>
                                    <th>Status</th>
                                    <th>Manufacturer</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                              { assetList }
                            </tbody>
                        </table>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets.assetList
})

export default connect(mapStateToProps, { getAssets })(Index);