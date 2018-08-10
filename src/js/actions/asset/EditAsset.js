import React, { Component } from 'react';
import Error401 from '../../../../src/views/error/Error401';
import { Code } from 'react-content-loader';
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { CommonPager } from '../../../views/common/pager';
import { putAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, 
    getProcessors, getAssetById, getAssetsOrderBy, getAssetsOrderType,
    getAssetsByKeyword,clearError } from '../../../actions/assetAction';

class EditAsset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            assetId: null,
            fields: {},
            errors:'',
            selectOpt: '',
            isValidForm: true,
            currentPage: '',
            totalPage: '',
            total: '',
            orderBy:'',
            orderType:'',
        }
    }
    
    onPageChange = (page) => {
        this.props.getAssets('','','', page, false)
      }
      
    getAssetsOrderBy = (event) => {
        event.preventDefault();
        this.setState({orderBy: event.target.value})
        this.props.getAssets(event.target.value, this.state.orderType, this.state.keyword);
    }

    getAssetsOrderType = (event) => {
        event.preventDefault();
        this.setState({orderType: event.target.value})
        this.props.getAssets(this.state.orderBy, event.target.value, this.state.keyword);
    }

    getAssetsKeyword = (event) => {
        event.preventDefault();
        this.setState({keyword: event.target.value})
        this.props.getAssets(this.state.orderBy, this.state.orderType, event.target.value);
    }

    componentWillMount() {
        this.setState({isLoading: true})
        this.props.clearError()
        this.props.getAssetsOrderBy();
        this.props.getAssetsOrderType();
        this.props.getAssets('','','', 1, false)
        this.props.getCategories(1, true);
        this.props.getModels(1, true);
        this.props.getMemories(1, true);
        this.props.getDisks(1, true);
        this.props.getVCards(1, true);
        this.props.getManufacturers(1, true);
        this.props.getStatus(1, true);
        this.props.getSuppliers(1, true);
        this.props.getProcessors(1, true);
        this.setState({isLoading:false, orderBy: '0', orderType: '0', fields: this.props.assetId})
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
        this.setState({fields: this.props.assetId, selectOpt: this.props.assetId.categoryId})
    }

    handleChange = (event) => {
        let fields = this.props.assetId;
        fields[event.target.name] = event.target.value;

        if ((!fields["name"] || !fields["assetTag"] || !fields["modelId"] || !fields["status"]) ||
            (fields["name"].length > 20) || fields["assetTag"].length > 20){
            this.setState({isValidForm: false, errors: `Input for ${event.target.name} length exceeded`})
        }
        else{
            this.setState({isValidForm: true, errors: ''})
        }

        this.setState({fields: fields, selectOpt: event.target.value})
    }

    validateLength(length, event) {
        let errors = {};

        if (!event.target.value) {
            this.setState({errors:''})
             return; 
        }

        if (event.target.value.length > length) {
            errors.invalidLength = `Input for ${event.target.name} length exceeded`
        }

        this.setState({
            errors: errors
        })
    }

    backButton = () => {
        window.location.reload(true);
    }

    updateAsset = (id, event) => {
        event.preventDefault();

        if (this.state.isValidForm) {
            let newAsset = {
                id: id,
            ...this.props.assetId
            }

            this.props.putAPI(setup.BASE_URL + setup.Assets, id, newAsset)
            .then(() => {
                this.props.getAssets();
            })
            .catch(error => console.log(error));
            
             window.location.reload(true);
        }
    }

  render() {
    var isAuth = localStorage.getItem('user');

    const { isLoading } = this.props;
    if (isLoading) {
     return <Code/>;
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
                <label>{setup.FieldName.AssetTag}<span style={setup.requiredInput}> *</span></label>
                <input className="form-control" type="text" name="assetTag" 
                onChange={this.handleChange} defaultValue={this.props.assetId.assetTag}
                onInput={this.handleChange} maxLength="20"/>
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
                <label>{setup.FieldName.Status}<span style={setup.requiredInput}> *</span></label>
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
                <label>{setup.FieldName.HostName}<span style={setup.requiredInput}> *</span></label>
                <input className="form-control" type="text" name="name"
                onChange={this.handleChange} defaultValue={this.props.assetId.name}
                onInput={this.handleChange} maxLength="20"/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.AssignedTo}</label>
                <input className="form-control" type="text" name="assignedTo" onChange={this.handleChange} defaultValue={this.props.assetId.assignedTo} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.IP}</label>
                <input className="form-control" type="text" name="ipAddress" onChange={this.handleChange} defaultValue={this.props.assetId.ipAddress} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Notes}</label>
                <input className="form-control" type="text" name="notes" onChange={this.handleChange} defaultValue={this.props.assetId.notes} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Warranty}</label>
                <input className="form-control" type="text" name="warranty" onChange={this.handleChange} defaultValue={this.props.assetId.warranty} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
        </div>
        );
    
    var acctgForm = (
        <div className="col-lg-12">
        <div className="form-group">
            <label>{setup.FieldName.PO}</label>
            <input className="form-control"type="text" name="poNo" onChange={this.handleChange} defaultValue={this.props.assetId.poNo} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.Receipt}</label>
            <input className="form-control" type="text" name="drNo" onChange={this.handleChange} defaultValue={this.props.assetId.drNo} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
        </div>
        <div className="form-group">
            <label>{setup.FieldName.Invoice}</label>
            <input className="form-control" type="text" name="siNo" onChange={this.handleChange} defaultValue={this.props.assetId.siNo} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
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
            <label>{setup.FieldName.PDate}</label>
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
                this.props.unauthenticated === 401 || !isAuth ? 
                <Error401/> :
                    <div>
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
                                            <input type= "text" placeholder="Keyword" name="Keyword"
                                                className="btn btn-default col-xs-4 .col-sm-4" onChange={this.getAssetsKeyword} onInput={this.getAssetsKeyword}/>

                                            <select className="btn btn-default col-xs-4 .col-sm-4" onChange={this.getAssetsOrderBy} name="OrderBy">
                                                <option value="0">Order by </option>
                                                {
                                                    this.props.assetsOrderBy.map((props, index) =>
                                                    <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                                                }
                                            </select>
                                            {this.state.orderBy !== '0' && 
                                            <select className="btn btn-default col-xs-4 .col-sm-4" onChange={this.getAssetsOrderType} name="OrderType">
                                                <option value="0">Order by Type</option>
                                                {
                                                    this.props.assetsOrderType.map((props, index) =>
                                                    <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                                                }
                                            </select>}
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
                                    
                                    {(this.props.totalPage && this.props.currentPage) 
                                            && CommonPager(this.props.total, this.props.currentPage, this.onPageChange)}
                                </div>
                            </div>
                        </div>
                </div> } 

        {this.state.isEditing &&
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Edit Asset ID <a>{this.props.assetId && this.props.assetId.id}</a></h1>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="panel panel-success">
                                <div className="panel-body">
                                    <div className="row">
                                    <div className="col-lg-12">
                                        <p style={setup.requiredInput}>{this.props.error ? this.props.error.errorMessages : null}</p>
                                        <p style={setup.requiredInput}>{this.state.errors ? this.state.errors.invalidLength : null}</p>
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
                                                                    <input className="form-control" type="text" name="serialNo" onChange={this.handleChange} defaultValue={this.props.assetId.serialNo} maxLength="20"  onInput={this.validateLength.bind(this, 15)}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.Model}<span style={setup.requiredInput}> *</span></label>
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
                                                                {this.state.selectOpt === '3'|| this.props.assetId.categoryId === 3 || this.state.selectOpt === '0' ? 
                                                                <div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.BatterySN}</label>
                                                                    <input className="form-control" type="text" name="battery" onChange={this.handleChange} defaultValue={this.props.assetId.battery} maxLength="20"  onInput={this.validateLength.bind(this, 15)}/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label>{setup.FieldName.AdapterSN}</label>
                                                                    <input className="form-control" type="text" name="adapter" onChange={this.handleChange} defaultValue={this.props.assetId.adapter} maxLength="20"  onInput={this.validateLength.bind(this, 15)}/>
                                                                </div>
                                                                </div> : null }
                                                            </div>
                                                            {this.state.selectOpt === '3' || this.props.assetId.categoryId === 3 || this.state.selectOpt === '0' ? 
                                                                <div className="row">
                                                                <div className="col-lg-6">
                                                                    <div className="form-group">
                                                                        <label>{setup.FieldName.DISK}</label>
                                                                        {(this.props.assetId.hardDiskId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="hardDiskId" defaultValue={this.props.assetId.hardDiskId}>
                                                                        <option></option>
                                                                        {
                                                                            this.props.disks.map((props, index) =>
                                                                            <option key={'disk_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                                                                        }
                                                                        </select>}
                                                                        {(!this.props.assetId.hardDiskId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="hardDiskId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.disks.map((props, index) =>
                                                                            <option key={'disk_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
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
                                                                            <option key={'vcard_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                                                                        }
                                                                        </select>}
                                                                        {(!this.props.assetId.videoCardId) &&
                                                                        <select className="form-control" onChange={this.handleChange} name="videoCardId">
                                                                        <option></option>
                                                                        {
                                                                            this.props.vcards.map((props,index) =>
                                                                            <option key={'vcard_'+index} value={props.id}>{props.size} GB</option>)
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
                                                                            <input className="form-control" type="text" name="macAddress" onChange={this.handleChange} defaultValue={this.props.assetId.macAddress} maxLength="20"/>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>{setup.FieldName.RAM}</label>
                                                                            {(this.props.assetId.memoryId) &&
                                                                            <select className="form-control" onChange={this.handleChange} name="memoryId" defaultValue={this.props.assetId.memoryId}>
                                                                            <option></option>
                                                                            {
                                                                                this.props.memory.map((props, index) =>
                                                                                <option key={'memory_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                                                                            }
                                                                            </select> }
                                                                            {(!this.props.assetId.memoryId) &&
                                                                            <select className="form-control" onChange={this.handleChange} name="memoryId">
                                                                            <option></option>
                                                                            {
                                                                                this.props.memory.map((props, index) =>
                                                                                <option key={'memory_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                                                                            }
                                                                            </select>}
                                                                        </div>
                                                                    </div> 
                                                                </div>
                                                            </div>: null}
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
    isLoading: state.assets.isLoading,
    unauthenticated: state.unauthenticated.unauthenticatedError,
    assetId: state.assetId.asset,
    error: state.error.error,
    currentPage: state.assets.assetCurrentPage,
    totalPage: state.assets.assetTotalPage,
    total: state.assets.assetTotal,
    assetsOrderBy: state.assetsOrderBy.assetsOrderBy,
    assetsOrderType: state.assetsOrderType.assetsOrderType,
    assetsKeyword: state.assetsKeyword.assetsKeyword,
    page: state.page.page,
  })
  
  export default connect(mapStateToProps, { getCategories, getModels, putAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, 
    getProcessors, getAssetById, getAssetsOrderBy, getAssetsOrderType, getAssetsByKeyword,clearError })(EditAsset);