import React, { Component } from "react";
import setup from '../../setup/api';
import { postAPI, getAssets, getCategories, getModels, getMemories, 
    getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors } from '../../../actions/assetAction';
import { connect } from 'react-redux';

const requiredInput = {
    color: 'red'
}

class CreateLaptop extends Component {

    constructor(){
        super();

        this.state = {
            fields: {},
            error:{}
        }
    }

    componentWillMount() {
        this.props.getCategories();
        this.props.getModels();
        this.props.getMemories();
        this.props.getDisks();
        this.props.getVCards();
        this.props.getManufacturers();
        this.props.getStatus();
        this.props.getSuppliers();
        this.props.getProcessors();
        }

    handleChange = (event) => {
        let fields = this.state.fields;
        fields[event.target.name] = event.target.value
        
        this.setState({
            fields
        })

        console.log(event.target.value);
    }

    handleSubmit = (event) => 
    {
        event.preventDefault();
        // if(this.validateForm())
        // {
        //     let fields = {};
        //     fields["serialNo"] = ''

        //     this.setState({
        //         fields:fields,
        //         error: ''
        //     })


        // }

        this.props.postAPI(setup.BASE_URL + setup.Assets, this.state.fields)
        .then((response) => {
            return response;
        })
        .catch(error => console.log(error));
        
    }

    // validateForm(){
    //     let fields = this.state.fields;
    //     let error ={};
    //     let formIsValid = true;

    //     if(!fields["name"] || !fields["assetTag"] || !fields["modelId"]){
    //         formIsValid = false;
    //         error["required"] = "Required input";
    //     }

    //     this.setState({
    //         error: error
    //     });
    //     return formIsValid;
    // }

  render() {

    return (
<div>
    <form onSubmit={this.handleSubmit}>
        <div className="col-lg-12">
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <p>{setup.FieldName.Specs}</p>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>{setup.FieldName.LaptopSN}</label>
                                    <input className="form-control" type="text" name="serialNo" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.Model}<span style={requiredInput}> *</span></label>
                                    <select className="form-control" onChange={this.handleChange} name="modelId">
                                    <option></option>
                                    {
                                        this.props.models.map((props, index) =>
                                        <option key={'model_'+index} value={props.id}>{props.name}</option>)
                                    }
                                    </select>
                                    {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.BatterySN}</label>
                                    <input className="form-control" type="text" name="battery" onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.AdapterSN}</label>
                                    <input className="form-control" type="text" name="adapter" onChange={this.handleChange}/>
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
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>{setup.FieldName.DISK}</label>
                                    <select className="form-control" onChange={this.handleChange} name="hardDiskId">
                                    <option></option>
                                    {
                                        this.props.disks.map((props, index) =>
                                        <option key={'disk_'+index} value={props.id}>{props.size}</option>)
                                    }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.Videocard}</label>
                                    <select className="form-control" onChange={this.handleChange} name="videoCardId">
                                    <option></option>
                                    {
                                        this.props.vcards.map((props,index) =>
                                        <option key={'vcard_'+index} value={props.id}>{props.size}</option>)
                                    }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.MAC}</label>
                                    <input className="form-control" type="text" name="macAddress" onChange={this.handleChange}/>
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
                                <div className="form-group">
                                    <label>{setup.FieldName.RAM}</label>
                                    <select className="form-control" onChange={this.handleChange} name="memoryId">
                                    <option></option>
                                    {
                                        this.props.memory.map((props, index) =>
                                        <option key={'memory_'+index} value={props.id}>{props.size}</option>)
                                    }
                                    </select>
                                </div>
                            </div>
                        </div>
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
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>{setup.FieldName.AssetTag}<span style={requiredInput}> *</span></label>
                                <input className="form-control" type="text" name="assetTag" onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Category}</label>
                                <select className="form-control" onChange={this.handleChange} name="categoryId">
                                    <option></option>
                                    {
                                        this.props.categories.map((props, index) =>
                                        <option key={'cate_'+index} value={props.id}>{props.name}</option>)
                                    }
                                </select>
                                {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Status}</label>
                                <select className="form-control" onChange={this.handleChange} name="status" >
                                    <option></option>
                                    {
                                        this.props.status.map((props, index) =>
                                        <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.HostName}<span style={requiredInput}> *</span></label>
                                <input className="form-control" type="text" name="name" onChange={this.handleChange}/>
                                {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.AssignedTo}</label>
                                <input className="form-control" type="text" name="assignedTo" onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.IP}</label>
                                <input className="form-control" type="text" name="ipAddress" onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Notes}</label>
                                <textarea className="form-control" rows="4" name="notes" onChange={this.handleChange}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Warranty</label>
                                <input className="form-control" type="text" name="warranty" onChange={this.handleChange}/>
                            </div>
                        </div>
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
                        <div className="col-lg-12">
                            <div className="form-group">
                                <label>{setup.FieldName.PO}</label>
                                <input className="form-control"type="text" name="poNo" onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Receipt}</label>
                                <input className="form-control" type="text" name="drNo" onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Invoice}</label>
                                <input className="form-control" type="text" name="siNo" onChange={this.handleChange}/>
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
                    </div>
                </div>
            </div>
        </div>
        <div className="col-lg-6">
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-group">
                            <input type="submit" value="Sumbit" className="btn btn-success btn-lg btn-block"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>
    );
  }
}

const mapStateToProps = state => ({
    models: state.models.modelList,
    categories: state.categories.categoryList,
    manufacturers: state.manufacturers.manufacturerList,
    processors: state.processors.processorList,
    suppliers: state.suppliers.supplierList,
    disks: state.disks.diskList,
    memory: state.memory.memoryList,
    vcards: state.vcards.vcardList,
    status: state.status.statusList
  })
  
  export default connect(mapStateToProps, { getCategories, getModels, postAPI, getAssets,
    getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors })(CreateLaptop);