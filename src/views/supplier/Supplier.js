import React, { Component } from "react";
import { Code } from 'react-content-loader';
import CreateSupplier from '../../js/actions/supplier/CreateSupplier';
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getSuppliers, putAPI, clearError } from '../../actions/assetAction';
import { validateName } from '../../js/validation/validateInput';
import Error401 from '../../views/error/Error401';
import { CommonPager } from '../common/pager';

class Supplier extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
      errors: {},
      currentPage: '',
      totalPage: '',
      total: '',
    }
  }

  onPageChange = (page) => {
    this.props.getSuppliers(page, false)
  }

  componentWillMount() {
    this.props.clearError()
    this.setState({isLoading:true})
    this.props.getSuppliers();
    this.setState({isLoading:false})
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  isValid() {
    const { errors, isValid } = validateName(this.state, 100);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
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
      if (this.isValid()) {
        this.props.putAPI(setup.BASE_URL + setup.Suppliers, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getSuppliers();
        })
        .catch(error => console.log(error));
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  render() {
    var isAuth = localStorage.getItem('user');

    if (!this.props.unauthenticated === 401) {
      const { isLoading } = this.props;
      if (isLoading) {
       return <Code/>;
      }
    }

    const { errors } = this.state;
    
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
             <p style={setup.requiredInput}>{errors.name}</p>
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
      {this.props.unauthenticated === 401 || !isAuth ? 
        <Error401/> :
        <div>
          <div className="row">
            <div className="col-lg-12">
                <h1 className="page-header">Supplier</h1>
                {this.props.error ? <p className="alert alert-danger">{this.props.error.errorMessages}</p>: null }
            </div>
          </div>
          <div className="row">
              <div className="col-lg-6">
                  <div className="panel panel-info">
                      <div className="panel-heading">
                          <p> List of Supplier </p>
                      </div>
                      <div className="panel-body">
                      <div className="table-responsive table-bordered">
                        <form>
                        <table className="table table-striped table-hover table-borderless">
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
                          {(this.props.totalPage && this.props.currentPage) 
                              && CommonPager(this.props.total, this.props.currentPage, this.onPageChange)}
                        </form>
                      </div>
                  </div>
                  </div>
              </div>
            <CreateSupplier getSupplier={this.getSupplier}/>
          </div>
        </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  suppliers: state.suppliers.supplierList,
  isLoading: state.suppliers.isLoading,
  unauthenticated: state.unauthenticated.unauthenticatedError,  
  currentPage: state.suppliers.supplierCurrentPage,
  totalPage: state.suppliers.supplierTotalPage,
  total: state.suppliers.supplierTotal,
  page: state.page.page,
  error: state.error.error
})

export default connect(mapStateToProps, { getSuppliers, putAPI, clearError })(Supplier);