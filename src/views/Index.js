import React, { Component } from "react";
import { Code } from 'react-content-loader';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux';
import { getAssets, getCategories, getModels, getMemories, getUsers,
  getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors,getUserId } from '../actions/assetAction';
  import Error401 from '../views/error/Error401'

class Index extends Component {

  componentWillMount() {
    this.setState({isLoading:true})
    this.props.getAssets();
    this.props.getUsers();
    this.props.getCategories();
    this.props.getModels();
    this.props.getMemories();
    this.props.getDisks();
    this.props.getVCards();
    this.props.getManufacturers();
    this.props.getStatus();
    this.props.getSuppliers();
    this.props.getProcessors();
    this.setState({isLoading:false})
  }

  getUser = () => {
    this.props.getUserId(localStorage.getItem('id'));
  }

  render() {
    var isAuth = localStorage.getItem('user');

    const { isLoading } = this.props;
    if (isLoading) {
     return <Code/>;
    }

    return (
      <div id="page-wrapper">
        { !this.props.unauthenticated === 401 || isAuth ? 
          <div>
            <div className="row">
              <div className="col-lg-12">
                <h1 className="page-header">Home</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="panel panel-primary">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.assetTotal}</div>
                              <div>Asset Count</div>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.diskTotal}</div>
                              <div>Harddisk Count</div>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="panel panel-primary">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.userTotal}</div>
                              <div>User Count</div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="panel panel-green">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.categoryTotal}</div>
                              <div>Category Count</div>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="panel panel-green">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.memoryTotal}</div>
                              <div>Memory Count</div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="panel panel-yellow">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.manufacturerTotal}</div>
                              <div>Manufacturer Count</div>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="panel panel-yellow">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.vcardTotal}</div>
                              <div>Videocard Count</div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="panel panel-red">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.modelTotal}</div>
                              <div>Model Count</div>
                          </div>
                      </div>
                    </div>
                </div>
                <div className="panel panel-red">
                    <div className="panel-heading">
                      <div className="row">
                          <div className="col-xs-3">
                              <i className="fa fa-tasks fa-5x"></i>
                          </div>
                          <div className="col-xs-9 text-right">
                              <div className="huge">{this.props.supplierTotal}</div>
                              <div>Supplier Count</div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
              
            </div>
          </div> : <Error401/>}
    </div>
    );
  }
}

const mapStateToProps = state => ({
  assets: state.assets.assetList,
  isLoading: state.assets.isLoading,
  models: state.models.modelList,
  categories: state.categories.categoryList,
  manufacturers: state.manufacturers.manufacturerList,
  processors: state.processors.processorList,
  suppliers: state.suppliers.supplierList,
  disks: state.disks.diskList,
  memory: state.memory.memoryList,
  vcards: state.vcards.vcardList,
  status: state.status.statusList,
  unauthenticated: state.unauthenticated.unauthenticatedError,
  users: state.users.userList,
  vcardTotal: state.vcards.vcardTotal,
  diskTotal: state.disks.diskTotal,
  supplierTotal: state.suppliers.supplierTotal,
  modelTotal: state.models.modelTotal,
  assetTotal: state.assets.assetTotal,
  manufacturerTotal: state.manufacturers.manufacturerTotal,
  processorTotal: state.processors.processorTotal,
  categoryTotal: state.categories.categoryTotal,
  memoryTotal: state.memory.memoryTotal,
  userTotal: state.users.userTotal,
})

export default connect(mapStateToProps, { getAssets,  getCategories, getModels, getUsers,
  getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors,getUserId })(Index);