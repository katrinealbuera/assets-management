import React, { Component } from "react";
import PropTypes from 'prop-types';
import setup from '../../actions/setup/api';
import fieldname from '../../actions/setup/FieldNameResource';
import message from '../../actions/setup/messageResource';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import Loader from '../common/Loader';
import { connect } from 'react-redux';
import { postAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, 
    getProcessors, clearError} from '../../actions/assetAction';
import { CommonInputText, CommonOnInputText, 
    CommonSelectInputSize, CommonSelectInputName, CommonSelectStatus, CommonSuccessMessage } from '../common/component';

class CreateAsset extends Component {

    constructor(){
        super();

        this.state = {
            selectOpt: '',
            fields: {},
            errors:{},
            isValidForm: '',
            isLoading: false,
            isSaved: false,
            isAuth: '',
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
        this.setState({isAuth: localStorage.getItem('user')})
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
        this.setLoading()
    }
  
    setLoading() {
      this.setState({isLoading: true, selectOpt: '0'})

      setTimeout(() => {
        this.setState({
            isLoading: false
        })
      }, 2000)
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
                    this.props.getAssets('','','', 1, false, this.showSuccessMessage())
                })
                .catch(error => console.log(error))
        }
    }

    showSuccessMessage = () => {
        this.setState({isSaved: true})

        setTimeout(() => {
            this.redirectToEditAsset()
        }, 3000);
    }

    redirectToEditAsset = () => {
        this.context.router.history.push("/edit_asset");
    }

  render() {

    const { isAuth } = this.state;

    var specFormL = (
        <div className="col-lg-6">
            { CommonOnInputText(fieldname.FieldName.SN, 'text', 'serialNo', this.handleChange, this.validateLength.bind(this, 20), '20') }
            { CommonSelectInputName(fieldname.FieldName.Model, 'modelId', this.handleChange, this.props.models, true) }
            { CommonSelectInputName(fieldname.FieldName.Manufacturer, 'manufacturerId', this.handleChange, this.props.manufacturers) }
            { CommonOnInputText(fieldname.FieldName.BatterySN, 'text', 'battery', this.handleChange, this.validateLength.bind(this, 20), '20') }
            { CommonOnInputText(fieldname.FieldName.AdapterSN, 'text', 'adapter', this.handleChange, this.validateLength.bind(this, 20), '20') }
        </div>
    );

    var specFormR = (
        <div className="col-lg-6">
            { CommonSelectInputSize(fieldname.FieldName.DISK, 'hardDiskId', this.handleChange, this.props.disks, true) }
            { CommonSelectInputSize(fieldname.FieldName.Videocard, 'videoCardId', this.handleChange, this.props.vcards, true) }
            { CommonSelectInputName(fieldname.FieldName.CPU, 'processorId', this.handleChange, this.props.processors) }
            { CommonInputText(fieldname.FieldName.MAC, 'text', 'macAddress', this.handleChange, '20') }
            { CommonSelectInputSize(fieldname.FieldName.RAM, 'memoryId', this.handleChange, this.props.memory, true) }
        </div>
    );

    var detailForm = (
        <div className="col-lg-12">
            { CommonOnInputText(fieldname.FieldName.AssetTag, 'text', 'assetTag', this.handleChange, this.validateLength.bind(this, 20), '20', true) }
            { CommonSelectStatus(fieldname.FieldName.Status, 'status', this.handleChange, this.props.status) }
            { CommonOnInputText(fieldname.FieldName.HostName, 'text', 'name', this.handleChange, this.validateLength.bind(this, 20), '20', true) }
            { CommonOnInputText(fieldname.FieldName.AssignedTo, 'text', 'assignedTo', this.handleChange, this.validateLength.bind(this, 50), '50') }
            { CommonOnInputText(fieldname.FieldName.IP, 'text', 'ipAddress', this.handleChange, this.validateLength.bind(this, 20), '20') }
            { CommonOnInputText(fieldname.FieldName.Notes, 'text', 'notes', this.handleChange, this.validateLength.bind(this, 50), '50') }
            { CommonOnInputText(fieldname.FieldName.Warranty, 'text', 'warranty', this.handleChange, this.validateLength.bind(this, 50), '50') }
        </div>
    );
    
    var acctgForm = (
        <div className="col-lg-12">
            { CommonOnInputText(fieldname.FieldName.PO, 'text', 'poNo', this.handleChange, this.validateLength.bind(this, 15), '15') }
            { CommonOnInputText(fieldname.FieldName.Receipt, 'text', 'drNo', this.handleChange, this.validateLength.bind(this, 15), '15') }
            { CommonOnInputText(fieldname.FieldName.Invoice, 'text', 'siNo', this.handleChange, this.validateLength.bind(this, 15), '15') }
            { CommonInputText(fieldname.FieldName.DDate, 'date', 'deliveryDate', this.handleChange) }
            { CommonInputText(fieldname.FieldName.PCost, 'number', 'purchaseCost', this.handleChange) }
            { CommonInputText(fieldname.FieldName.PDate, 'date', 'purchaseDate', this.handleChange) }
            { CommonSelectInputName(fieldname.FieldName.Supplier, 'supplierId', this.handleChange, this.props.suppliers) }
    </div>
    );

    return (
        this.props.networkError ? <ErrorNetwork/> : (this.props.unauthenticated === 401 || !isAuth) ? <Error401/> :
        this.state.isLoading ? <Loader/> :
            <div id="page-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-header">Create Asset</h1>
                    </div>
                </div>
                { this.state.isSaved ? CommonSuccessMessage('Add Asset', message.SavesSuccess) :
                <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="panel panel-success">
                            <div className="panel-heading">
                                { CommonSelectInputName(fieldname.FieldName.Category, 'categoryId', this.getSelectOpt, this.props.categories) }
                            </div>
                            <div className="panel-body">
                                <div className="row">
                                        <div className="col-lg-12">
                                        <p style={setup.requiredInput}>{this.props.error ? this.props.error.errorMessages : null}</p>
                                        <p style={setup.requiredInput}>{this.state.errors ? this.state.errors.invalidLength : null}</p>
                                                <div className="panel panel-success">
                                                    <div className="panel-heading">
                                                        <p>{fieldname.FieldName.Specs}</p>
                                                    </div>
                                                    <div className="panel-body">
                                                        {specFormL}
                                                        {specFormR}
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        <div className="col-lg-6">
                                            <div className="panel panel-success">
                                                <div className="panel-heading">
                                                    <p>{fieldname.FieldName.Details}</p>
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
                                                    <p>{fieldname.FieldName.Acctg}</p>
                                                </div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        {acctgForm}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
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
                </form> }
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
error: state.error.error,
unauthenticated: state.unauthenticated.unauthenticatedError,
networkError: state.networkError.networkError,
})

CreateAsset.contextTypes = {
router: PropTypes.object.isRequired
} 

export default connect(mapStateToProps, { getCategories, getModels, postAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors, clearError })(CreateAsset);