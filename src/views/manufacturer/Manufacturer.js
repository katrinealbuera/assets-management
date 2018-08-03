import React, { Component } from "react";
import setup from '../../js/setup/api';
import { Code } from 'react-content-loader';
import CreateManufacturer from '../../js/actions/manufacturer/CreateManufacturer';
import { connect } from 'react-redux';
import { getManufacturers, putAPI } from '../../actions/assetAction';
import { validateName } from '../../js/validation/validateInput';
import Error401 from '../../views/error/Error401';

const requiredInput = {
  color: 'red'
}

class Manufacturer extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
      errors: {},
    }
  }

  componentWillMount() {
    this.setState({isLoading:true})
    this.props.getManufacturers();
    this.setState({isLoading:false})
  }

  handleInputChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }

  isValid() {
    const { errors, isValid } = validateName(this.state);

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
        this.props.putAPI(setup.BASE_URL + setup.Manufacturers + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getManufacturers();
        })
        .catch(error => console.log(error));
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  render() {
    if (!this.props.unauthenticated === 401) {
      const { isLoading } = this.props;
      if (isLoading) {
       return <Code/>;
      }
    }
    const { errors } = this.state;

    var manufacturerItem = this.props.manufacturers.map(function(props, index) {
      return(
        <tr key={'manufacturer_'+index}>
          <td>{props.id}</td>
          { 
            (props.id === this.state.nameId) ? 
            <td className="col-lg-6">
              <input type="text" 
                    name="name" 
                    className="form-control"
                    defaultValue={props.name} 
                    onChange={this.handleInputChange}/>
               <p style={requiredInput}>{errors.name}</p>
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
        {this.props.unauthenticated === 401 ? 
          <Error401/> :
            <div>
              <div className="row">
                  <div className="col-lg-12">
                      <h1 className="page-header">Manufacturer</h1>
                  </div>
                </div>
              <div className="row">
                  <div className="col-lg-6">
                      <div className="panel panel-info">
                          <div className="panel-heading">
                              <p> List of Manufacturer </p>
                          </div>
                          <div className="panel-body">
                          <div className="table-responsive table-bordered">
                            <form>
                            <table className="table table-striped table-hover table-borderless">
                                  <thead>
                                      <tr>
                                          <th>ID</th>
                                          <th>Category</th>
                                          <th>Edit</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    { manufacturerItem }
                                  </tbody>
                              </table>
                            </form>
                          </div>
                      </div>
                      </div>
                  </div>
                <CreateManufacturer getManufacturer={this.getManufacturer}/>
              </div>
        </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manufacturers: state.manufacturers.manufacturerList,
  isLoading: state.manufacturers.isLoading,
  unauthenticated: state.unauthenticated.unauthenticatedError
})

export default connect(mapStateToProps, { getManufacturers, putAPI })(Manufacturer);