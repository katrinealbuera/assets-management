import React, { Component } from "react";
import setup from '../../js/setup/api';
import { Code } from 'react-content-loader';
import CreateManufacturer from '../../js/actions/manufacturer/CreateManufacturer';
import { connect } from 'react-redux';
import { getManufacturers, putAPI } from '../../actions/assetAction';

class Manufacturer extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      nameId: null,
    }
  }

  componentWillMount() {
    this.props.getManufacturers();
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
      this.props.putAPI(setup.BASE_URL + setup.Manufacturers + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getManufacturers();
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
                      <table className="table table-hover">
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  manufacturers: state.manufacturers.manufacturerList
})

export default connect(mapStateToProps, { getManufacturers, putAPI })(Manufacturer);