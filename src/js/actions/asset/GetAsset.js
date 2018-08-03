// import React, { Component } from "react";
// import setup from '../../setup/api';
// import { connect } from 'react-redux';
// import { postAPI, getAssets, getCategories, getModels, getMemories, 
//     getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors  } from '../../../actions/assetAction';
// import { NavLink } from "react-router-dom";
// import { Code } from 'react-content-loader';
// import Error401 from '../../../../src/views/error/Error401';

// const requiredInput = {
//     color: 'red'
// }

// class GetAsset extends Component {

//     constructor(){
//         super();

//         this.state = {
//             selectOpt: '',
//             fields: {},
//             error:{},
//             isValidForm: ''
//         };

//         this.getSelectOpt = this.getSelectOpt.bind(this);
//     }

//     getSelectOpt = (event) => {
//         this.setState({
//             selectOpt: event.target.value
//         });
//          console.log(this.state.selectOpt);
//     }

//     componentWillMount() {
//         this.setState({isLoading:true})
//         this.props.getAssets();
//         this.props.getCategories();
//         this.props.getModels();
//         this.props.getMemories();
//         this.props.getDisks();
//         this.props.getVCards();
//         this.props.getManufacturers();
//         this.props.getStatus();
//         this.props.getSuppliers();
//         this.props.getProcessors();
//         this.setState({isLoading:false})
//         }

//     handleChange = (event) => {
//         let fields = this.state.fields;
//         fields[event.target.name] = event.target.value
        

//         if(!fields["name"] && !fields["assetTag"] && !fields["modelId"] && !fields["status"]){
//             this.setState({isValidForm: false})
//         }

//         this.setState({
//             fields,
//             isValidForm: true
//         })

//         console.log(event.target.value);
//     }

//     handleSubmit = (event) => 
//     {
//         event.preventDefault();

//         this.props.postAPI(setup.BASE_URL + setup.Assets, this.state.fields)
//         .then(() => {
//             this.props.getAssets();
//           })
//         .catch(error => console.log(error));

//         event.target.reset();
//     }

//   render() {
//     if (this.props.unauthenticated === 401) {

//     console.log(this.props.unauthenticated)
//     }
//     else{
//         const {isLoading} = this.props;

//         if (isLoading) {
//          return <Code/>;
//         }
//     }   

//     var specForm = (
//         <div className="row">
//             <div className="col-lg-6">
//                 <div className="form-group">
//                     <label>{setup.FieldName.DISK}</label>
//                     <select className="form-control" onChange={this.handleChange} name="hardDiskId">
//                     <option></option>
//                     {
//                         this.props.disks.map((props, index) =>
//                         <option key={'disk_'+index} value={props.id}>{props.size}</option>)
//                     }
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>{setup.FieldName.Videocard}</label>
//                     <select className="form-control" onChange={this.handleChange} name="videoCardId">
//                     <option></option>
//                     {
//                         this.props.vcards.map((props,index) =>
//                         <option key={'vcard_'+index} value={props.id}>{props.size}</option>)
//                     }
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>{setup.FieldName.CPU}</label>
//                     <select className="form-control" onChange={this.handleChange} name="processorId">
//                     <option></option>
//                     {
//                         this.props.processors.map((props, index) =>
//                         <option key={'processor_'+index} value={props.id}>{props.name}</option>)
//                     }
//                     </select>
//                 </div>
//                 <div>
//                     <div className="form-group">
//                         <label>{setup.FieldName.MAC}</label>
//                         <input className="form-control" type="text" name="macAddress" onChange={this.handleChange}/>
//                     </div>
//                     <div className="form-group">
//                         <label>{setup.FieldName.RAM}</label>
//                         <select className="form-control" onChange={this.handleChange} name="memoryId">
//                         <option></option>
//                         {
//                             this.props.memory.map((props, index) =>
//                             <option key={'memory_'+index} value={props.id}>{props.size}</option>)
//                         }
//                         </select>
//                     </div>
//                 </div> 
//             </div>
//         </div>
//     );

//     var detailForm = (
//         <div className="col-lg-12">
//             <div className="form-group">
//                 <label>{setup.FieldName.AssetTag}<span style={requiredInput}> *</span></label>
//                 <input className="form-control" type="text" name="assetTag" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Category}</label>
//                 <select className="form-control" onChange={this.handleChange} name="categoryId">
//                     <option></option>
//                     {
//                         this.props.categories.map((props, index) =>
//                         <option key={'cate_'+index} value={props.id}>{props.name}</option>)
//                     }
//                 </select>
//                 {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Status}<span style={requiredInput}> *</span></label>
//                 <select className="form-control" onChange={this.handleChange} name="status" >
//                     <option></option>
//                     {
//                         this.props.status.map((props, index) =>
//                         <option key={'status_list_'+index} value={props.value}>{props.name}</option>)
//                     }
//                 </select>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.HostName}<span style={requiredInput}> *</span></label>
//                 <input className="form-control" type="text" name="name" onChange={this.handleChange}/>
//                 {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.AssignedTo}</label>
//                 <input className="form-control" type="text" name="assignedTo" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.IP}</label>
//                 <input className="form-control" type="text" name="ipAddress" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Notes}</label>
//                 <textarea className="form-control" rows="4" name="notes" onChange={this.handleChange}></textarea>
//             </div>
//             <div className="form-group">
//                 <label>Warranty</label>
//                 <input className="form-control" type="text" name="warranty" onChange={this.handleChange}/>
//             </div>
//         </div>
//         );
    
//         var acctgForm = (
//             <div className="col-lg-12">
//             <div className="form-group">
//                 <label>{setup.FieldName.PO}</label>
//                 <input className="form-control"type="text" name="poNo" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Receipt}</label>
//                 <input className="form-control" type="text" name="drNo" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Invoice}</label>
//                 <input className="form-control" type="text" name="siNo" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.DDate}</label>
//                 <input className="form-control" type="date" name="deliveryDate" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.PCost}</label>
//                 <input className="form-control" type="number" name="purchaseCost" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>Purchase Date</label>
//                 <input className="form-control" type="date" name="purchaseDate" onChange={this.handleChange}/>
//             </div>
//             <div className="form-group">
//                 <label>{setup.FieldName.Supplier}</label>
//                 <select className="form-control" onChange={this.handleChange} name="supplierId">
//                     <option></option>
//                     {
//                         this.props.suppliers.map((props,index) =>
//                         <option key={'supplier_'+index} value={props.id}>{props.name}</option>)
//                     }
//                 </select>
//             </div>
//         </div>
//         );

//     return (
//         <div>
//         {this.props.unauthenticated === 401 ? 
//              <div id="page-wrapper"><Error401/></div> :
//             <div>
//             <div id="page-wrapper">
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <h1 className="page-header">Create Asset</h1>
//                     </div>
//                 </div>
//                 <form onSubmit={this.handleSubmit}>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="panel panel-success">
//                             <div className="panel-heading">
//                                 <div className="form-group">
//                                     <label>Category</label>
//                                     <select className="form-control" onChange={this.getSelectOpt} name="categoryId">
//                                         <option></option>
//                                         {
//                                             this.props.categories.map((props, index) =>
//                                             <option key={'cate_'+index} value={props.id}>{props.name}</option>)
//                                         }
//                                     </select>
//                                 </div>
//                             </div>
//                             <div className="panel-body">
//                                 <div className="row">
//                                         <div className="col-lg-12">
//                                                 <div className="panel panel-success">
//                                                     <div className="panel-heading">
//                                                         <p>{setup.FieldName.Specs}</p>
//                                                     </div>
//                                                     <div className="panel-body">
//                                                         <div className="col-lg-6">
//                                                             <div className="form-group">
//                                                                 <label>{setup.FieldName.SN}</label>
//                                                                 <input className="form-control" type="text" name="serialNo" onChange={this.handleChange}/>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <label>{setup.FieldName.Model}<span style={requiredInput}> *</span></label>
//                                                                 <select className="form-control" onChange={this.handleChange} name="modelId">
//                                                                 <option></option>
//                                                                 {
//                                                                     this.props.models.map((props, index) =>
//                                                                     <option key={'model_'+index} value={props.id}>{props.name}</option>)
//                                                                 }
//                                                                 </select>
//                                                                 {/* {this.state.error.required ? <p><span style={requiredInput}>Required Input!</span></p> : null} */}
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <label>{setup.FieldName.Manufacturer}</label>
//                                                                 <select className="form-control" onChange={this.handleChange} name="manufacturerId">
//                                                                 <option></option>
//                                                                 {
//                                                                     this.props.manufacturers.map((props,index) =>
//                                                                     <option key={'manufacturer_'+index} value={props.id}>{props.name}</option>)
//                                                                 }
//                                                                 </select>
//                                                             </div>
//                                                             {this.state.selectOpt != 4 ? 
//                                                             <div>
//                                                             <div className="form-group">
//                                                                 <label>{setup.FieldName.BatterySN}</label>
//                                                                 <input className="form-control" type="text" name="battery" onChange={this.handleChange}/>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <label>{setup.FieldName.AdapterSN}</label>
//                                                                 <input className="form-control" type="text" name="adapter" onChange={this.handleChange}/>
//                                                             </div>
//                                                             </div> : null}
//                                                         </div>
//                                                         {this.state.selectOpt != 4 ? specForm : null}
//                                                     </div>
//                                                 </div>
//                                             </div>
                                        
//                                         <div className="col-lg-6">
//                                             <div className="panel panel-success">
//                                                 <div className="panel-heading">
//                                                     <p>{setup.FieldName.Details}</p>
//                                                 </div>
//                                                 <div className="panel-body">
//                                                     <div className="row">
//                                                         {detailForm}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div className="col-lg-6">
//                                             <div className="panel panel-success">
//                                                 <div className="panel-heading">
//                                                     <p>{setup.FieldName.Acctg}</p>
//                                                 </div>
//                                                 <div className="panel-body">
//                                                     <div className="row">
//                                                         {acctgForm}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="col-lg-6">
//                                             <div className="panel-body">
//                                                 <div className="row">
//                                                     <div className="col-lg-12">
//                                                         <div className="form-group">
//                                                             <input type="submit" value="Sumbit" className={this.state.isValidForm ? 
//                                                                 'btn btn-success btn-lg btn-block' : 'btn btn-success btn-lg btn-block disabled'}/>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//             </div> }
//         </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//     assets: state.assets.assetList,
//     models: state.models.modelList,
//     categories: state.categories.categoryList,
//     manufacturers: state.manufacturers.manufacturerList,
//     processors: state.processors.processorList,
//     suppliers: state.suppliers.supplierList,
//     disks: state.disks.diskList,
//     memory: state.memory.memoryList,
//     vcards: state.vcards.vcardList,
//     status: state.status.statusList,
//     isLoading: state.models.isLoading,
//     unauthenticated: state.unauthenticated.unauthenticatedError
//   })
  
//   export default connect(mapStateToProps, { getCategories, getModels, postAPI, getAssets,
//     getMemories, getDisks, getVCards, getManufacturers, getStatus, getSuppliers, getProcessors })(GetAsset);