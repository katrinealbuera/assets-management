import React, { Component } from "react";
import { Code } from 'react-content-loader';
import CreateSupplier from '../../js/actions/supplier/CreateSupplier';
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getSuppliers, putAPI } from '../../actions/assetAction';

class Supplier extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
    }
  }

  componentWillMount() {
    this.props.getSuppliers();
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  handleEditBtnClick = function(index, name, event) {
    event.preventDefault();

    this.setState({
      nameId: index,
      name: name
    });

    let newName = {
      id: index,
      name: this.state.name
  }

    if (this.state.isEditing) {
      this.props.putAPI(setup.BASE_URL + setup.Suppliers + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getSuppliers();
        })
        .catch(error => console.log(error));
    }

    this.setState({isEditing: true})

  }

  render() {
    const { isLoading, error } = this.state;

    if (isLoading) {
      return <Code />;
    }

    if (error) {
      return <p>{error.message}</p>;
    }
    
    var supplierItem = this.props.suppliers.map(function(props, index) {
      return(
        <tr key={index}>
          <td>{props.id}</td>
          { 
            (props.id === this.state.nameId) ? 
            <td className="col-lg-6">
              <input type="text" 
                    name="name" 
                    className="form-control"
                    defaultValue={props.name} 
                    onChange={this.handleInputChange}/>
            </td>
          :
            <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.name}</p></td>       
          }
          <td>
            <input type="submit" 
                  value={this.state.nameId !== props.id   ? 'Edit' : 'Save'} 
                  className="btn btn-success"
                  onClick={this.handleEditBtnClick.bind(this, props.id, props.name)}/>
          </td>
        </tr>
      );}, this); 

    return (
      <div id="page-wrapper">
        <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">Supplier</h1>
          </div>
        </div>
        <div className="row">
            <div className="col-lg-5">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <p> List of Supplier </p>
                    </div>
                    <div className="panel-body">
                    <div className="table-responsive table-bordered">
                      <form>
                      <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Supplier</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                              { supplierItem }
                            </tbody>
                        </table>
                      </form>
                    </div>
                </div>
                </div>
            </div>
          <CreateSupplier getSupplier={this.getSupplier}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  suppliers: state.suppliers.supplierList
})

export default connect(mapStateToProps, { getSuppliers, putAPI })(Supplier);