import React, { Component } from 'react';
import Error401 from '../../../../src/views/error/Error401';
import { Code } from 'react-content-loader';
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { putAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors, getAssetById } from '../../../actions/assetAction';

const requiredInput = {
    color: 'red'
}

class EditAsset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            assetId: null,
            fields: {},
            error:{},
            selectOpt: '',
            isValidForm: true
        }
    }

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

    parseDate = (date) => {
        if(!date){
            return;
        }
        return date.split("T")[0];
    }

    getSelectedId = function(index, event) {
        event.preventDefault();

        this.setState({isEditing: true})
        this.editSelectedAsset(index)
    }

    editSelectedAsset = (id) => {
        this.props.getAssetById(id)
        this.setState({fields: this.props.assetId})
        console.log(this.state.fields)
    }

    handleChange = (event) => {
        let fields = this.props.assetId;
        fields[event.target.name] = event.target.value;

        if (!fields["name"] || !fields["assetTag"] || !fields["modelId"] || !fields["status"]){
            this.setState({isValidForm: false})
        }
        else{
            this.setState({isValidForm: true})
        }

        this.setState({fields: fields})
    }

    backButton = () => {
        window.location.reload(true);
    }

    updateAsset = (id, event) => {
        event.preventDefault();

        if (this.state.isValidForm) {
            
        let newAsset = {
            id: id,
           ...this.state.fields
        }

        this.props.putAPI(setup.BASE_URL + setup.Assets + setup.Id, id, newAsset)
        .then(() => {
            this.props.getAssets();
          })
        .catch(error => console.log(error));

        //window.location.reload(true);
        }
    }

  render() {
    console.log(this.props.assetId)
    if (!this.props.unauthenticated === 401) {
        const { isLoading } = this.props;
        if (isLoading) {
         return <Code/>;
        }
      }
    
    var assetList = this.props.assets.map(function(props, index){
        return(
        <tr key={'asset_'+index}>
            <td className="col-lg-6"><input type="submit" 
                  value={props.id} 
                  className="btn btn-link btn-xs"
                  onClick={this.getSelectedId.bind(this, props.id)}/></td>  
            <td className="col-lg-6">{props.serialNo}</td>  
            <td className="col-lg-6">{props.assetTag}</td>
            <td className="col-lg-6">{props.battery}</td>
            <td className="col-lg-6">{props.adapter}</td>
            <td className="col-lg-6">{props.name}</td>
            <td className="col-lg-6">{props.assignedTo}</td>
            <td className="col-lg-6">{props.deliveryDate}</td>
            <td className="col-lg-6">{props.supplierName}</td>
            <td className="col-lg-6">{props.modelName}</td>
            <td className="col-lg-6">{props.processorName}</td>
            <td className="col-lg-6">{props.memorySize}</td>
            <td className="col-lg-6">{props.videoCardSize}</td>
            <td className="col-lg-6">{props.hardDiskSize}</td>
            <td className="col-lg-6">{props.poNo}</td>
            <td className="col-lg-6">{props.drNo}</td>
            <td className="col-lg-6">{props.siNo}</td>
            <td className="col-lg-6">{props.macAddress}</td>
            <td className="col-lg-6">{props.ipAddress}</td>
            <td className="col-lg-6">{props.status}</td>
            <td className="col-lg-6">{props.manufacturerName}</td>
            <td className="col-lg-6">{props.categoryName}</td>
            <td className="col-lg-6">{props.purchaseDate}</td>
            <td className="col-lg-6">{props.purchaseCost}</td>
            <td className="col-lg-6">{props.warranty}</td>
            <td className="col-lg-6">{props.notes}</td>
        </tr>
        );
    }, this);  
    
    var detailForm = (
        <div className="col-lg-12">
            <div className="form-group">
                <label>{setup.FieldName.AssetTag}<span style={requiredInput}> *</span></label>
                <input className="form-control" type="text" name="assetTag" 
                onChange={this.handleChange} defaultValue={this.props.assetId.assetTag}
                onInput={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Category}</label>
                {(this.props.assetId.categoryId) &&
                <select className="form-control" onChange={this.handleChange} name="categoryId" defaultValue={this.props.assetId.categoryId}>
                    <option></option>
                    {
                        this.props.categories.map((props, index) =>
                        <option key={'cate_'+index} value={props.id}>{props.name}</option>)
                    }
                </select> }
                {(!this.props.assetId.categoryId) &&
                <select className="form-control" onChange={this.handleChange} name="categoryId">
                <option></option>
                {
                    this.props.categories.map((props, index) =>
                    <option key={'cate_'+index} value={props.id}>{props.name}</option>)
                }
                 </select>}
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Status}<span style={requiredInput}> *</span></label>
                {(this.props.assetId.status) &&
                <select className="form-control" onChange={this.handleChange} name="status" defaultValue={this.props.assetId.status}>
                    <option></option>
                    {
                        this.props.status.map((props, index) =>
                        <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                    }
                </select>}
                {(!this.props.assetId.status) &&
                <select className="form-control" onChange={this.handleChange} name="status" >
                    <option></option>
                    {
                        this.props.status.map((props, index) =>
                        <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                    }
                </select>}
            </div>
            <div className="form-group">
                <label>{setup.FieldName.HostName}<span style={requiredInput}> *</span></label>
                <input className="form-control" type="text" name="name" 
                onChange={this.handleChange} defaultValue={this.props.assetId.name}
                onInput={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.AssignedTo}</label>
                <input className="form-control" type="text" name="assignedTo" onChange={this.handleChange} defaultValue={this.props.assetId.assignedTo}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.IP}</label>
                <input className="form-control" type="text" name="ipAddress" onChange={this.handleChange} defaultValue={this.props.assetId.ipAddress}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Notes}</label>
                <input className="form-control" type="text" name="notes" onChange={this.handleChange} defaultValue={this.props.assetId.notes}/>
            </div>
            <div className="form-group">
                <label>Warranty</label>
                <input className="form-control" type="text" name="warranty" onChange={this.handleChange} defaultValue={this.props.assetId.warranty}/>
            </div>
        </div>
        );
    
    var acctgForm = (
        <div className="col-lg-12">
        <div className="form-group">
            <label>{setup.FieldName.PO}</label>
            <input className="form-control"type="text" name="poNo" onChange={this.handleChange} defaultValue={this.props.assetId.poNo}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.Receipt}</label>
            <input className="form-control" type="text" name="drNo" onChange={this.handleChange} defaultValue={this.props.assetId.drNo}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.Invoice}</label>
            <input className="form-control" type="text" name="siNo" onChange={this.handleChange} defaultValue={this.props.assetId.siNo}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.DDate}</label>
         
            <input className="form-control" 
                        type="date" name="deliveryDate" 
                        onChange={this.handleChange}
                        defaultValue={this.parseDate(this.props.assetId.deliveryDate)}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.PCost}</label>
            <input className="form-control" type="number" name="purchaseCost" onChange={this.handleChange} defaultValue={this.props.assetId.purchaseCost}/>
        </div>
        <div className="form-group">
            <label>Purchase Date</label>
            <input className="form-control" 
                    type="date" name="purchaseDate" 
                    onChange={this.handleChange}
                    defaultValue={this.parseDate(this.props.assetId.purchaseDate)}
                    />
            
        </div>
        <div className="form-group">
            <label>{setup.FieldName.Supplier}</label>
            {(this.props.assetId.supplierId) &&
            <select className="form-control" onChange={this.handleChange} name="supplierId" defaultValue={this.props.assetId.supplierId}>
                <option></option>
                {
                    this.props.suppliers.map((props,index) =>
                    <option key={'supplier_'+index} value={props.id}>{props.name}</option>)
                }
            </select>}
            {(!this.props.assetId.supplierId) &&
            <select className="form-control" onChange={this.handleChange} name="supplierId">
                <option></option>
                {
                    this.props.suppliers.map((props,index) =>
                    <option key={'supplier_'+index} value={props.id}>{props.name}</option>)
                }
            </select>}
        </div>
    </div>
    );

    return (
        <div id="page-wrapper">
        { this.state.isEditing ? null : 
                this.props.unauthenticated === 401 ? 
                <Error401/> :
                    <div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h1 className="page-header">Edit Asset</h1>
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
                                        <table className="table table-striped table-hover table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>S/N</th>
                                                    <th>IT Asset Tag</th>
                                                    <th>Battery UnLT</th>
                                                    <th>Adapter UnLT</th>
                                                    <th>Hostname / Asset Name</th>
                                                    <th>Assigned to</th>
                                                    <th>Delivery Date</th>
                                                    <th>Supplier</th>
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
                                                    <th>Purchase Date</th>
                                                    <th>Purchase Cost</th>
                                                    <th>Warranty</th>
                                                    <th>Notes</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {assetList}
                                            </tbody>
                                        </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div> } 

        {this.state.isEditing &&
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Edit Asset</h1>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-success">
                                <div className="panel-body">
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <p style={requiredInput}>{this.props.error ? this.props.error.errorMessages : null}</p>
                                    </div>
                                            <div className="col-lg-12">
                                                    <div className="panel panel-success">
                                                        <div className="panel-heading">
                                                            <p>{setup.FieldName.Specs}</p>
                                                        </div>
                                                        <div className="panel-body">
                                                            <div className="col-lg-6">
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.SN}</label>
                                                                    <input className="form-control" type="text" name="serialNo" onChange={this.handleChange} defaultValue={this.props.assetId.serialNo}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.Model}<span style={requiredInput}> *</span></label>
                                                                    {(this.props.assetId.modelId) && 
                                                                    <select className="form-control" name="modelId" defaultValue={this.props.assetId.modelId} onChange={this.handleChange}>
                                                                    <option></option>
                                                                    {
                                                                        this.props.models.map((props, index) =>
                                                                        <option key={'model_'+index} value={props.id}>{props.name}</option>)
                                                                    }
                                                                    </select>}
                                                                    {(!this.props.assetId.modelId) && 
                                                                    <select className="form-control" onChange={this.handleChange} name="modelId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.models.map((props, index) =>
                                                                            <option key={'model_'+index} value={props.id}>{props.name}</option>)
                                                                        }
                                                                    </select>}
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.Manufacturer}</label>
                                                                    {(this.props.assetId.manufacturerId) &&
                                                                    <select className="form-control" onChange={this.handleChange} name="manufacturerId" defaultValue={this.props.assetId.manufacturerId}>
                                                                    <option></option>
                                                                    {
                                                                        this.props.manufacturers.map((props,index) =>
                                                                        <option key={'manufacturer_'+index} value={props.id}>{props.name}</option>)
                                                                    }
                                                                    </select>}
                                                                    {(!this.props.assetId.manufacturerId) &&
                                                                    <select className="form-control" onChange={this.handleChange} name="manufacturerId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.manufacturers.map((props,index) =>
                                                                            <option key={'manufacturer_'+index} value={props.id}>{props.name}</option>)
                                                                        }
                                                                    </select> }
                                                                </div>
                                                                {this.state.selectOpt != 4 ? 
                                                                <div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.BatterySN}</label>
                                                                    <input className="form-control" type="text" name="battery" onChange={this.handleChange} defaultValue={this.props.assetId.battery}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.AdapterSN}</label>
                                                                    <input className="form-control" type="text" name="adapter" onChange={this.handleChange} defaultValue={this.props.assetId.adapter}/>
                                                                </div>
                                                                </div> : null}
                                                            </div>
                                                            {this.state.selectOpt != 4 ? 
                                                                <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label>{setup.FieldName.DISK}</label>
                                                                        {(this.props.assetId.hardDiskId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="hardDiskId" defaultValue={this.props.assetId.hardDiskId}>
                                                                        <option></option>
                                                                        {
                                                                            this.props.disks.map((props, index) =>
                                                                            <option key={'disk_'+index} value={props.id}>{props.size}</option>)
                                                                        }
                                                                        </select>}
                                                                        {(!this.props.assetId.hardDiskId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="hardDiskId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.disks.map((props, index) =>
                                                                            <option key={'disk_'+index} value={props.id}>{props.size}</option>)
                                                                        }
                                                                        </select>}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>{setup.FieldName.Videocard}</label>
                                                                        {(this.props.assetId.videoCardId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="videoCardId" defaultValue={this.props.assetId.videoCardId}>
                                                                        <option></option>
                                                                        {
                                                                            this.props.vcards.map((props,index) =>
                                                                            <option key={'vcard_'+index} value={props.id}>{props.size}</option>)
                                                                        }
                                                                        </select>}
                                                                        {(!this.props.assetId.videoCardId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="videoCardId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.vcards.map((props,index) =>
                                                                            <option key={'vcard_'+index} value={props.id}>{props.size}</option>)
                                                                        }
                                                                        </select>}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>{setup.FieldName.CPU}</label>
                                                                        {(this.props.assetId.processorId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="processorId" defaultValue={this.props.assetId.processorId}>
                                                                        <option></option>
                                                                        {
                                                                            this.props.processors.map((props, index) =>
                                                                            <option key={'processor_'+index} value={props.id}>{props.name}</option>)
                                                                        }
                                                                        </select>}
                                                                        {(!this.props.assetId.processorId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="processorId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.processors.map((props, index) =>
                                                                            <option key={'processor_'+index} value={props.id}>{props.name}</option>)
                                                                        }
                                                                        </select>}
                                                                    </div>
                                                                    <div>
                                                                        <div className="form-group">
                                                                            <label>{setup.FieldName.MAC}</label>
                                                                            <input className="form-control" type="text" name="macAddress" onChange={this.handleChange} defaultValue={this.props.assetId.macAddress}/>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>{setup.FieldName.RAM}</label>
                                                                            {(this.props.assetId.memoryId) &&
                                                                            <select className="form-control" onChange={this.handleChange} name="memoryId" defaultValue={this.props.assetId.memoryId}>
                                                                            <option></option>
                                                                            {
                                                                                this.props.memory.map((props, index) =>
                                                                                <option key={'memory_'+index} value={props.id}>{props.size}</option>)
                                                                            }
                                                                            </select> }
                                                                            {(!this.props.assetId.memoryId) &&
                                                                            <select className="form-control" onChange={this.handleChange} name="memoryId">
                                                                            <option></option>
                                                                            {
                                                                                this.props.memory.map((props, index) =>
                                                                                <option key={'memory_'+index} value={props.id}>{props.size}</option>)
                                                                            }
                                                                            </select>}
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                            </div> : null}
                                                        </div>
                                                    </div>
                                                </div>
                                            
                                            <div className="col-lg-6">
                                                <div className="panel panel-success">
                                                    <div className="panel-heading">
                                                        <p>{setup.FieldName.Details}</p>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="row">
                                                            {detailForm}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
    
                                            <div className="col-lg-6">
                                                <div className="panel panel-success">
                                                    <div className="panel-heading">
                                                        <p>{setup.FieldName.Acctg}</p>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="row">
                                                            {acctgForm}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <input type="button" value="Update" className={this.state.isValidForm ? 
                                                                    'btn btn-success btn-lg btn-block' : 'btn btn-success btn-lg btn-block disabled'}
                                                                    onClick={this.updateAsset.bind(this, this.props.assetId.id)}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="submit" value="Back" className="btn btn-success btn-lg btn-block"
                                                                 onClick={this.backButton}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>}
            </div>)
  }
}

const mapStateToProps = state => ({
    assets: state.assets.assetList,
    models: state.models.modelList,
    categories: state.categories.categoryList,
    manufacturers: state.manufacturers.manufacturerList,
    processors: state.processors.processorList,
    suppliers: state.suppliers.supplierList,
    disks: state.disks.diskList,
    memory: state.memory.memoryList,
    vcards: state.vcards.vcardList,
    status: state.status.statusList,
    isLoading: state.models.isLoading,
    unauthenticated: state.unauthenticated.unauthenticatedError,
    assetId: state.assetId.asset,
    error: state.error.error,
  })
  
  export default connect(mapStateToProps, { getCategories, getModels, putAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors, getAssetById })(EditAsset);