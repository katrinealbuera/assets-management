import React, { Component } from "react";
import { Code } from 'react-content-loader';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { connect } from 'react-redux';
import { getAssets, getCategories, getModels, getMemories, 
  getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors,getUser } from '../actions/assetAction';
  import Error401 from '../views/error/Error401'

class Index extends Component {

  componentWillMount() {
    this.setState({isLoading:true})
    this.props.getAssets();
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
    this.props.getUser(localStorage.getItem('id'));
  }

  render() {

    var isAuth = localStorage.getItem('user');
    if (isAuth) {
    const {isLoading} = this.props;
    
    if (isLoading) {
      return <Code/>;
     }
     else{
      var assetList = (
        <div>
          <BootstrapTable data={this.props.assets} height='300' maxHeight='300' scrollTop={'Bottom'} striped hover pagination>
                <TableHeaderColumn isKey dataField='id' width='80'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='serialNo' width='120'>S/N</TableHeaderColumn>
                <TableHeaderColumn dataField='assetTag' width='120'>IT Asset Tag</TableHeaderColumn>
                <TableHeaderColumn dataField='battery' width='120'>Battery UnLT</TableHeaderColumn>
                <TableHeaderColumn dataField='adapter' width='120'>Adapter UnLT</TableHeaderColumn>
                <TableHeaderColumn dataField='name' width='120' thStyle={ { whiteSpace: 'normal'}}>Hostname / Asset Name</TableHeaderColumn>
                <TableHeaderColumn dataField='assignedTo' width='120'>Assigned to</TableHeaderColumn>
                <TableHeaderColumn dataField='deliveryDate' width='120'>Delivery Date</TableHeaderColumn>
                <TableHeaderColumn dataField='supplierId' width='120'>Supplier</TableHeaderColumn>
                <TableHeaderColumn dataField='modelId' width='120'>Model</TableHeaderColumn>
                <TableHeaderColumn dataField='processorId' width='120'>CPU</TableHeaderColumn>
                <TableHeaderColumn dataField='memoryId' width='120'>RAM</TableHeaderColumn>
                <TableHeaderColumn dataField='videoCardId' width='120'>Video Card</TableHeaderColumn>
                <TableHeaderColumn dataField='hardDiskId' width='120'>HDD / SSD</TableHeaderColumn>
                <TableHeaderColumn dataField='poNo' width='120'>PO #</TableHeaderColumn>
                <TableHeaderColumn dataField='drNo' width='120'>DR #</TableHeaderColumn>
                <TableHeaderColumn dataField='siNo' width='120'>SI #</TableHeaderColumn>
                <TableHeaderColumn dataField='macAddress' width='120'>MAC Address</TableHeaderColumn>
                <TableHeaderColumn dataField='ipAddress' width='120'>IP Address</TableHeaderColumn>
                <TableHeaderColumn dataField='status' width='120'>Status</TableHeaderColumn>
                <TableHeaderColumn dataField='manufacturerId' width='120'>Manufacturer</TableHeaderColumn>
                <TableHeaderColumn dataField='categoryId' width='120'>Category</TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
  
      var categoryList = (
          <BootstrapTable data={this.props.categories} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
                <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
          </BootstrapTable>
      );
  
      var manufacturerList = (
        <BootstrapTable data={this.props.manufacturers} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var modelList = (
        <BootstrapTable data={this.props.models} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var processorList = (
        <BootstrapTable data={this.props.processors} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var diskList = (
        <BootstrapTable data={this.props.disks} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='size' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var memoryList = (
        <BootstrapTable data={this.props.memory} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='size' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var vcardList = (
        <BootstrapTable data={this.props.vcards} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='size' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
  
      var supplierList = (
        <BootstrapTable data={this.props.suppliers} maxHeight='200' height='200' scrollTop={'Bottom'} striped hover pagination>
              <TableHeaderColumn dataField='id' isKey dataSort>ID</TableHeaderColumn>
              <TableHeaderColumn dataField='name' dataSort>Name</TableHeaderColumn>
        </BootstrapTable>
      );
     }

    }

    return (
      <div id="page-wrapper" onLoad={this.getUser}>
        {isAuth ? 
                <div>
                <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">Home</h1>
                </div>
              </div>
              <div className="row">
                  <div className="col-lg-12">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Assets </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                                {assetList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Categories </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                                {categoryList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Manufacturers </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {manufacturerList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                     <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Models </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                                {modelList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Processors </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {processorList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Memory </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {memoryList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                      <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Harddisk </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {diskList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> VideoCard </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {vcardList}
                              </div>
                          </div>
                      </div>
                    </div>
        
                    <div className="col-lg-6">
                      <div className="panel panel-primary">
                          <div className="panel-heading">
                            <p> Suppliers </p>
                          </div>
                          <div className="panel-body">
                              <div className="table-responsive">
                              {supplierList}
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
})

export default connect(mapStateToProps, { getAssets,  getCategories, getModels,
  getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors,getUser })(Index);