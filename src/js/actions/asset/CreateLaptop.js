import React, { Component } from "react";
import setup from '../../setup/api';

class CreateLaptop extends Component {

    constructor(){
        super();

        this.state = {
            statusType: [],
            modelType: [],
            manufacturerList: [],
            supplierList: []
        }

        this.getStatusType = this.getStatusType.bind(this);
        this.getModelType = this.getModelType.bind(this);
        this.getManufacturer = this.getManufacturer.bind(this);
        this.getSupplier = this.getSupplier.bind(this);
    }

    handleChange = event => {
        this.setState({
            name: event.target.value,
        });
    }

    componentDidMount() {
        this.getStatusType();
        this.getModelType();
        this.getManufacturer();
        this.getSupplier();
      }

    getStatusType(){
        setup.Get(setup.BASE_URL + setup.Status)
        .then(response => {
          const newData = response.data;
  
          const newState = Object.assign({}, this.state, {
            statusType: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }  

    getModelType(){
        setup.Get(setup.BASE_URL + setup.Models)
        .then(response => {
          const newData = response.data.list;
  
          const newState = Object.assign({}, this.state, {
            modelType: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }

    getManufacturer(){
        setup.Get(setup.BASE_URL + setup.Manufacturers)
        .then(response => {
          const newData = response.data.list;
  
          const newState = Object.assign({}, this.state, {
            manufacturerList: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }

    getSupplier(){
        setup.Get(setup.BASE_URL + setup.Suppliers)
        .then(response => {
          const newData = response.data.list;
  
          const newState = Object.assign({}, this.state, {
            supplierList: newData
          });
          this.setState(newState);
          })
        .catch(error => console.log(error));
    }

    handleSubmit = event => {
        event.preventDefault();
        
        setup.PostFunction(setup.BASE_URL + setup.Assets, this.state)
        .then(response => {
            console.log(response);
            console.log(response.data);
            this.props.getProcessor();
        })
    }

  render() {
    return (
<div>
    <form>
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
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.Model}</label>
                                    <select className="form-control">
                                    <option></option>
                                    {
                                        this.state.modelType.map((props) =>
                                        <option key="{props.id}">{props.name}</option>)
                                    }
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.BatterySN}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.AdapterSN}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.CPU}</label>
                                    <select className="form-control">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.RAM}</label>
                                    <select className="form-control">
                                        <option></option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="form-group">
                                    <label>{setup.FieldName.DISK}</label>
                                    <select className="form-control">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.Videocard}</label>
                                    <select className="form-control">
                                        <option></option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.MAC}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.OS}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.LicenseKey}</label>
                                    <input className="form-control" type="text"/>
                                </div>
                                <div className="form-group">
                                    <label>{setup.FieldName.Manufacturer}</label>
                                    <select className="form-control">
                                    <option></option>
                                    {
                                        this.state.manufacturerList.map((props) =>
                                        <option key="{props.id}">{props.name}</option>)
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
                                <label>{setup.FieldName.AssetTag}</label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Category}</label>
                                <select className="form-control">
                                    <option></option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Status}</label>
                                <select className="form-control">
                                    <option></option>
                                    {
                                        this.state.statusType.map((props) =>
                                        <option key="{props.id}">{props.name}</option>)
                                    }
                                    </select>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.HostName}</label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.AssignedTo}</label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.IP}</label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Notes}</label>
                                <textarea className="form-control" rows="4"></textarea>
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
                                <input className="form-control"type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Receipt}</label>
                                <input className="form-control" type="text"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Invoice}</label>
                                <input className="form-control" type="number"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.DDate}</label>
                                <input className="form-control" type="date"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.PCost}</label>
                                <input className="form-control" type="number"/>
                            </div>
                            <div className="form-group">
                                <label>{setup.FieldName.Supplier}</label>
                                <select className="form-control">
                                    <option></option>
                                    {
                                        this.state.supplierList.map((props) =>
                                        <option key="{props.id}">{props.name}</option>)
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

export default CreateLaptop;