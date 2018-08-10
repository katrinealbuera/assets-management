import React, { Component } from "react";
import PropTypes from 'prop-types';
import setup from '../../setup/api';
import { connect } from 'react-redux';
import { postAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors, clearError  } from '../../../actions/assetAction';
import { Code } from 'react-content-loader';
import Error401 from '../../../../src/views/error/Error401';

class CreateAsset extends Component {

    constructor(){
        super();

        this.state = {
            selectOpt: '',
            fields: {},
            errors:{},
            isValidForm: '',
            isLoading: false,
        };
    }

    getSelectOpt = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value

        this.setState({
            fields,
            selectOpt: event.target.value
        });
    }

    componentWillMount() {
        this.setState({isLoading:true})
        this.props.clearError()
        this.props.getAssets();
        this.props.getCategories(1, true);
        this.props.getModels(1, true);
        this.props.getMemories(1, true);
        this.props.getDisks(1, true);
        this.props.getVCards(1, true);
        this.props.getManufacturers(1, true);
        this.props.getStatus(1, true);
        this.props.getSuppliers(1, true);
        this.props.getProcessors(1, true);
        this.setState({isLoading:false, selectOpt: '0'})
        }

    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value
        
        if ((!fields["name"] || !fields["assetTag"] || !fields["modelId"] || !fields["status"])){
            this.setState({isValidForm: false})
        }
        else{
            this.setState({isValidForm: true})
        }

        this.setState({
            fields,
        })
    }

    validateLength(length, event) {
        let errors = {};

        if (!event.target.value) {
            this.setState({errors:''})
             return; 
        }

        if (event.target.value.length > length) {
            errors.invalidLength = 'Input length exceeded'
        }

        this.setState({
            errors: errors
        })
    }

    handleSubmit = (event) => 
    {
        event.preventDefault();

        if (this.state.isValidForm){
            this.props.postAPI(setup.BASE_URL + setup.Assets, this.state.fields)
                .then(() => {
                    this.props.getAssets('','','', 1, false, this.redirectToEditAsset)
                })
                .catch(error => console.log(error));
        }
    }

    redirectToEditAsset = () => {
        this.context.router.history.push("/edit_asset");
    }

  render() {
    var isAuth = localStorage.getItem('user');

    const {isLoading} = this.props;

    if (isLoading || this.state.isLoading) {
        return <Code/>;
    }
    
    var specForm = (
        <div className="row">
            <div className="col-lg-6">
                <div className="form-group">
                    <label>{setup.FieldName.DISK}</label>
                    <select className="form-control" onChange={this.handleChange} name="hardDiskId">
                    <option></option>
                    {
                        this.props.disks.map((props, index) =>
                        <option key={'disk_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>{setup.FieldName.Videocard}</label>
                    <select className="form-control" onChange={this.handleChange} name="videoCardId">
                    <option></option>
                    {
                        this.props.vcards.map((props,index) =>
                        <option key={'vcard_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                    }
                    </select>
                </div>
                <div className="form-group">
                    <label>{setup.FieldName.CPU}</label>
                    <select className="form-control" onChange={this.handleChange} name="processorId">
                    <option></option>
                    {
                        this.props.processors.map((props, index) =>
                        <option key={'processor_'+index} value={props.id}>{props.name}</option>)
                    }
                    </select>
                </div>
                <div>
                    <div className="form-group">
                        <label>{setup.FieldName.MAC}</label>
                        <input className="form-control" type="text" name="macAddress" onChange={this.handleChange} maxLength="20"/>
                    </div>
                    <div className="form-group">
                        <label>{setup.FieldName.RAM}</label>
                        <select className="form-control" onChange={this.handleChange} name="memoryId">
                        <option></option>
                        {
                            this.props.memory.map((props, index) =>
                            <option key={'memory_'+index} value={props.id}>{props.size} {setup.FieldName.GBUnit}</option>)
                        }
                        </select>
                    </div>
                </div> 
            </div>
        </div>
    );

    var detailForm = (
        <div className="col-lg-12">
            <div className="form-group">
                <label>{setup.FieldName.AssetTag}<span style={setup.requiredInput}> *</span></label>
                <input className="form-control" type="text" name="assetTag" onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Category}</label>
                <select className="form-control" name="categoryId" value={this.state.selectOpt} disabled>
                    <option value="0"></option>
                    {
                        this.props.categories.map((props, index) =>
                        <option key={'cate_'+index} value={props.id}>{props.name}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Status}<span style={setup.requiredInput}> *</span></label>
                <select className="form-control" onChange={this.handleChange} name="status" >
                    <option></option>
                    {
                        this.props.status.map((props, index) =>
                        <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                    }
                </select>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.HostName}<span style={setup.requiredInput}> *</span></label>
                <input className="form-control" type="text" name="name" onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.AssignedTo}</label>
                <input className="form-control" type="text" name="assignedTo" onChange={this.handleChange} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.IP}</label>
                <input className="form-control" type="text" name="ipAddress" onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Notes}</label>
                <input className="form-control" type="text" name="notes" onChange={this.handleChange} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
            <div className="form-group">
                <label>Warranty</label>
                <input className="form-control" type="text" name="warranty" onChange={this.handleChange} maxLength="50" onInput={this.validateLength.bind(this, 50)}/>
            </div>
        </div>
        );
    
        var acctgForm = (
            <div className="col-lg-12">
            <div className="form-group">
                <label>{setup.FieldName.PO}</label>
                <input className="form-control"type="text" name="poNo" onChange={this.handleChange} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Receipt}</label>
                <input className="form-control" type="text" name="drNo" onChange={this.handleChange} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Invoice}</label>
                <input className="form-control" type="text" name="siNo" onChange={this.handleChange} maxLength="15" onInput={this.validateLength.bind(this, 15)}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.DDate}</label>
                <input className="form-control" type="date" name="deliveryDate" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.PCost}</label>
                <input className="form-control" type="number" name="purchaseCost" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>Purchase Date</label>
                <input className="form-control" type="date" name="purchaseDate" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
                <label>{setup.FieldName.Supplier}</label>
                <select className="form-control" onChange={this.handleChange} name="supplierId">
                    <option></option>
                    {
                        this.props.suppliers.map((props,index) =>
                        <option key={'supplier_'+index} value={props.id}>{props.name}</option>)
                    }
                </select>
            </div>
        </div>
        );

    return (
        <div>
        {this.props.unauthenticated === 401 || !isAuth ? 
             <div id="page-wrapper"><Error401/></div> :
            <div>
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Create Asset</h1>
                    </div>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                <div className="form-group">
                                    <label>Category</label>
                                    <select className="form-control" onChange={this.getSelectOpt} name="categoryId">
                                        <option value="0"></option>
                                        {
                                            this.props.categories.map((props, index) =>
                                            <option key={'cate_'+index} value={props.id}>{props.name}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                        <div className="col-lg-12">
                                        <p style={setup.requiredInput}>{this.props.error ? this.props.error.errorMessages : null}</p>
                                        <p style={setup.requiredInput}>{this.state.errors ? this.state.errors.invalidLength : null}</p>
                                                <div className="panel panel-success">
                                                    <div className="panel-heading">
                                                        <p>{setup.FieldName.Specs}</p>
                                                    </div>
                                                    <div className="panel-body">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>{setup.FieldName.SN}</label>
                                                                <input className="form-control" type="text" name="serialNo" 
                                                                onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>{setup.FieldName.Model}<span style={setup.requiredInput}> *</span></label>
                                                                <select className="form-control" onChange={this.handleChange} name="modelId">
                                                                <option></option>
                                                                {
                                                                    this.props.models.map((props, index) =>
                                                                    <option key={'model_'+index} value={props.id}>{props.name}</option>)
                                                                }
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>{setup.FieldName.Manufacturer}</label>
                                                                <select className="form-control" onChange={this.handleChange} name="manufacturerId">
                                                                <option></option>
                                                                {
                                                                    this.props.manufacturers.map((props,index) =>
                                                                    <option key={'manufacturer_'+index} value={props.id}>{props.name}</option>)
                                                                }
                                                                </select>
                                                            </div>
                                                            {this.state.selectOpt === '3' || this.state.selectOpt === '0' ? 
                                                            <div>
                                                            <div className="form-group">
                                                                <label>{setup.FieldName.BatterySN}</label>
                                                                <input className="form-control" type="text" name="battery" onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>{setup.FieldName.AdapterSN}</label>
                                                                <input className="form-control" type="text" name="adapter" onChange={this.handleChange} maxLength="20" onInput={this.validateLength.bind(this, 20)}/>
                                                            </div>
                                                            </div> : null}
                                                        </div>
                                                        {this.state.selectOpt === '3' || this.state.selectOpt === '0' ? specForm : null}
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
                                                            <input type="submit" value="Sumbit" className={this.state.isValidForm ? 
                                                                'btn btn-success btn-lg btn-block' : 'btn btn-success btn-lg btn-block disabled'}/>
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
                </form>
            </div>
            </div> }
        </div>
    );
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
error: state.error.error,
})

CreateAsset.contextTypes = {
router: PropTypes.object.isRequired
} 

export default connect(mapStateToProps, { getCategories, getModels, postAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors, clearError })(CreateAsset);