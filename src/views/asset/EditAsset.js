import React, { Component } from 'react';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import setup from '../../actions/setup/api';
import fieldname from '../../actions/setup/FieldNameResource';
import Loader from '../common/Loader';
import { connect } from 'react-redux';
import { CommonPager } from '../common/pager';
import { putAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, 
    getProcessors, getAssetById, getAssetsOrderBy, getAssetsOrderType,
    getAssetsByKeyword, clearError, goToTopPage } from '../../actions/assetAction';
import { CommonInputText, CommonOnInputText,
    CommonSelectInputSize, CommonSelectStatus, CommonSelectInputName,
    CommonOrderDropdown, CommonKeywordSearch, CommonSuccessMessage } from '../common/component';

class EditAsset extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            isValidForm: true,
            isSaved: false,
            assetId: null,
            fields: {},
            errors:'',
            selectOpt: '',
            currentPage: '1',
            totalPage: '',
            total: '',
            orderBy:'',
            orderType:'',
            isAuth: '',
        }
    }

    componentWillMount() {
        this.setState({isAuth: localStorage.getItem('user'), orderBy: '0', orderType: '0', fields: this.props.assetId})
        this.props.clearError()
        this.props.getAssetsOrderBy();
        this.props.getAssetsOrderType();
        this.props.getAssets()
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
        this.setState({isLoading: true})
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000)
    }

    parseDate = (date) => {
        if(!date){
            return;
        }
        return date.split("T")[0];
    }

    backButton = () => {
        window.location.reload(true);
    }
    
    onPageChange = (page) => {
        this.setState({currentPage: page})
        this.props.getAssets(this.state.orderBy, this.state.orderType, this.state.keyword, page, false)
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

    getSelectedId = function(index, event) {
        event.preventDefault();

        this.setState({isEditing: true})
        this.editSelectedAsset(index)
    }

    editSelectedAsset = (id) => {
        this.props.getAssetById(id)
        this.setState({fields: this.props.assetId, selectOpt: this.props.assetId.categoryId})

        this.setLoading()
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

    updateAsset = (id, event) => {
        event.preventDefault();

        if (this.state.isValidForm) {
            let newAsset = {
                id: id,
            ...this.props.assetId
            }

            this.props.putAPI(setup.BASE_URL + setup.Assets, id, newAsset)
            .then(() => {
                this.props.getAssets(this.state.orderBy, this.state.orderType, this.state.keyword, 
                    this.state.currentPage, false, this.showSuccessMessage());
                goToTopPage()
            })
            .catch(error => console.log(error));
        }
    }

    showSuccessMessage = () => {
        this.setState({isSaved: true})

        setTimeout(() => {
            this.setState({
                isSaved: false
            })
        }, 2000)
    }

  render() {

    const { isAuth } = this.state;

    var assetList = this.props.assets.map(function(props, index){
        return(
        <tr key={'asset_'+index}>
            <td className="col-lg-6"><input type="submit" 
                  value={`Edit ID ${props.id}`}
                  className="btn btn-info"
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
            <td className="col-lg-6">{props.statusType}</td>
            <td className="col-lg-6">{props.manufacturerName}</td>
            <td className="col-lg-6">{props.categoryName}</td>
            <td className="col-lg-6">{props.purchaseDate}</td>
            <td className="col-lg-6">{props.purchaseCost}</td>
            <td className="col-lg-6">{props.warranty}</td>
            <td className="col-lg-6">{props.notes}</td>
        </tr>
        );
    }, this);  

    var specFormL = (
        <div className="col-lg-6">
            { CommonOnInputText(fieldname.FieldName.SN, 'text', 'serialNo', this.handleChange, this.validateLength.bind(this, 20), '20', false, this.props.assetId.serialNo) }

            { this.props.assetId.modelId && CommonSelectInputName(fieldname.FieldName.Model, 'modelId', this.handleChange, this.props.models, true, this.props.assetId.modelId) }
            { !this.props.assetId.modelId && CommonSelectInputName(fieldname.FieldName.Model, 'modelId', this.handleChange, this.props.models, true) }

            { this.props.assetId.manufacturerId && CommonSelectInputName(fieldname.FieldName.Manufacturer, 'manufacturerId', 
                    this.handleChange, this.props.manufacturers, false, this.props.assetId.manufacturerId) }
            { !this.props.assetId.manufacturerId && CommonSelectInputName(fieldname.FieldName.Manufacturer, 'manufacturerId', 
                    this.handleChange, this.props.manufacturers) }

            { CommonOnInputText(fieldname.FieldName.BatterySN, 'text', 'battery', this.handleChange, this.validateLength.bind(this, 20), '20', false, this.props.assetId.battery) }
            { CommonOnInputText(fieldname.FieldName.AdapterSN, 'text', 'adapter', this.handleChange, this.validateLength.bind(this, 20), '20', false, this.props.assetId.adapter) }
        </div>
    );

    var specFormR = (
        <div className="col-lg-6">
            { this.props.assetId.hardDiskId && CommonSelectInputSize(fieldname.FieldName.DISK, 'hardDiskId', this.handleChange, this.props.disks, true, false, this.props.assetId.hardDiskId) }
            { !this.props.assetId.hardDiskId && CommonSelectInputSize(fieldname.FieldName.DISK, 'hardDiskId', this.handleChange, this.props.disks, true) }

            { this.props.assetId.videoCardId && CommonSelectInputSize(fieldname.FieldName.Videocard, 'videoCardId', this.handleChange, this.props.vcards, true, false, this.props.assetId.videoCardId) }
            { !this.props.assetId.videoCardId && CommonSelectInputSize(fieldname.FieldName.Videocard, 'videoCardId', this.handleChange, this.props.vcards, true) }


            { this.props.assetId.processorId && CommonSelectInputName(fieldname.FieldName.CPU, 'processorId', this.handleChange, this.props.processors, false, this.props.assetId.processorId) }
            { !this.props.assetId.processorId && CommonSelectInputName(fieldname.FieldName.CPU, 'processorId', this.handleChange, this.props.processors) }

            { CommonInputText(fieldname.FieldName.MAC, 'text', 'macAddress', this.handleChange, '20', false, this.props.assetId.macAddress) }
            
            { this.props.assetId.memoryId && CommonSelectInputSize(fieldname.FieldName.RAM, 'memoryId', this.handleChange, this.props.memory, true, false, this.props.assetId.memoryId) }
            { !this.props.assetId.memoryId && CommonSelectInputSize(fieldname.FieldName.RAM, 'memoryId', this.handleChange, this.props.memory, true) }
        </div>
    );
    
    var detailForm = (
        <div className="col-lg-12">
            { CommonOnInputText(fieldname.FieldName.AssetTag, 'text', 'assetTag', this.handleChange, this.validateLength.bind(this, 20), '20', true, this.props.assetId.assetTag) }

            { this.props.assetId.categoryId && CommonSelectInputName(fieldname.FieldName.Category, 'categoryId', this.handleChange, this.props.categories, false, this.props.assetId.categoryId) }
            { !this.props.assetId.categoryId && CommonSelectInputName(fieldname.FieldName.Category, 'categoryId', this.handleChange, this.props.categories) }

            { this.props.assetId.status && CommonSelectStatus(fieldname.FieldName.Status, 'status', this.handleChange, this.props.status, this.props.assetId.status) }
            { !this.props.assetId.status && CommonSelectStatus(fieldname.FieldName.Status, 'status', this.handleChange, this.props.status) }

            { CommonOnInputText(fieldname.FieldName.HostName, 'text', 'name', this.handleChange, this.validateLength.bind(this, 20), '20', true, this.props.assetId.name) }
            { CommonOnInputText(fieldname.FieldName.AssignedTo, 'text', 'assignedTo', this.handleChange, this.validateLength.bind(this, 50), '50', false, this.props.assetId.assignedTo) }
            { CommonOnInputText(fieldname.FieldName.IP, 'text', 'ipAddress', this.handleChange, this.validateLength.bind(this, 20), '20', false, this.props.assetId.ipAddress) }
            { CommonOnInputText(fieldname.FieldName.Notes, 'text', 'notes', this.handleChange, this.validateLength.bind(this, 50), '50', false, this.props.assetId.notes) }
            { CommonOnInputText(fieldname.FieldName.Warranty, 'text', 'warranty', this.handleChange, this.validateLength.bind(this, 50), '50', false, this.props.assetId.warranty) }
        </div>
        );
    
    var acctgForm = (
        <div className="col-lg-12">
            { CommonOnInputText(fieldname.FieldName.PO, 'text', 'poNo', this.handleChange, this.validateLength.bind(this, 15), '15', false, this.props.assetId.poNo) }
            { CommonOnInputText(fieldname.FieldName.Receipt, 'text', 'drNo', this.handleChange, this.validateLength.bind(this, 15), '15', false, this.props.assetId.drNo) }
            { CommonOnInputText(fieldname.FieldName.Invoice, 'text', 'siNo', this.handleChange, this.validateLength.bind(this, 15), '15', false, this.props.assetId.siNo) }
            { CommonInputText(fieldname.FieldName.DDate, 'date', 'deliveryDate', this.handleChange, null, false, this.parseDate(this.props.assetId.deliveryDate)) }
            { CommonInputText(fieldname.FieldName.PCost, 'number', 'purchaseCost', this.handleChange, null, false, this.props.assetId.purchaseCost) }
            { CommonInputText(fieldname.FieldName.PDate, 'date', 'purchaseDate', this.handleChange, null, false, this.parseDate(this.props.assetId.purchaseDate)) }

            { this.props.assetId.supplierId && CommonSelectInputName(fieldname.FieldName.Supplier, 'supplierId', this.handleChange, this.props.suppliers, false, this.props.assetId.supplierId) }
            { !this.props.assetId.supplierId && CommonSelectInputName(fieldname.FieldName.Supplier, 'supplierId', this.handleChange, this.props.suppliers) }
    </div>
    );

    var assetListTable = (
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
                            { CommonKeywordSearch('text', 'Keyword', this.getAssetsKeyword) }
                            { CommonOrderDropdown('OrderBy', 'Order by', this.getAssetsOrderBy, this.props.assetsOrderBy) }
                            { this.state.orderBy !== '0' && CommonOrderDropdown('OrderType', 'Order by Type ', this.getAssetsOrderType, this.props.assetsOrderType) }
                        </div>
                    <div className="panel-body">
                        <div className="table-responsive">
                        <table className="table table-striped table-hover table-borderless">
                        <thead>
                            <tr>
                                <th></th>
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
    </div>
    )

    var editForm = (
    <div id="page-wrapper">
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

                        { this.state.isSaved && CommonSuccessMessage('updated') }

                        <div className="col-lg-12">
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
                        <div className="col-lg-6">
                            <div className="panel-body">
                                <div className="col-lg-6">
                                        <input type="button" value="Update" className={this.state.isValidForm ? 
                                                'btn btn-success btn-lg btn-block' : 'btn btn-success btn-lg btn-block disabled'}
                                                onClick={this.updateAsset.bind(this, this.props.assetId.id)}/>
                                </div>
                                <div className="col-lg-6">
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
    )

    return (
        this.props.networkError ? <ErrorNetwork/> : (this.props.unauthenticated === 401 || !isAuth) ? <Error401/> : this.state.isLoading ? <Loader/> :
        this.state.isEditing ? editForm : assetListTable 
    )
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
    assetId: state.assetId.asset,
    error: state.error.error,
    currentPage: state.assets.assetCurrentPage,
    totalPage: state.assets.assetTotalPage,
    total: state.assets.assetTotal,
    assetsOrderBy: state.assetsOrderBy.assetsOrderBy,
    assetsOrderType: state.assetsOrderType.assetsOrderType,
    assetsKeyword: state.assetsKeyword.assetsKeyword,
    page: state.page.page,
    networkError: state.networkError.networkError,
    unauthenticated: state.unauthenticated.unauthenticatedError,
  })
  
  export default connect(mapStateToProps, { getCategories, getModels, putAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, 
    getProcessors, getAssetById, getAssetsOrderBy, getAssetsOrderType, getAssetsByKeyword,clearError })(EditAsset);