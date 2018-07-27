import React, { Component } from "react";
import setup from '../../setup/api';
import Vcard from '../../../views/sizes/Vcard';
import { connect } from 'react-redux';
import { putAPI, getVCards } from '../../../actions/assetAction';

class CreateVcard extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      sizeId: null,
    }

    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
  }

  componentWillMount() {
    this.props.getVCards();
  }

  handleInputChange = (event) => {
    this.setState({ size : event.target.value})
  }

  handleEditBtnClick = function(index, size, event) {
    event.preventDefault();

    this.setState({
      sizeId: index,
      size: size
    });

    let newSize = {
      id: index,
      size: this.state.size
  }

    if (this.state.isEditing) {
      this.props.putAPI(setup.BASE_URL + setup.Sizes.Videocard + setup.Id, index, newSize)
        .then(response => {
          this.setState({sizeId: null, isEditing: false})
        })
        .then(() => {
          this.props.getVCards();
        })
        .catch(error => console.log(error));
    }

    this.setState({isEditing: true})

  }

  render() {

    var vcardsItem = this.props.vcards.map(function(props, index) {
        return(
            <tr key={index}>
              <td>{props.id}</td>
              { 
                (props.id === this.state.sizeId) ? 
                <td className="col-lg-6">
                  <input type="text" 
                        name="name" 
                        className="form-control"
                        defaultValue={props.size} 
                        onChange={this.handleInputChange}/>
                </td>
              :
                <td className="col-lg-6"><p className=".col-xs-6 .col-md-4">{props.size}</p></td>       
              }
              <td>
                <input type="submit" 
                      value={this.state.sizeId !== props.id   ? 'Edit' : 'Save'} 
                      className="btn btn-success"
                      onClick={this.handleEditBtnClick.bind(this, props.id, props.size)}/>
              </td>
            </tr>
          );}, this); 
    
    return (
      <div className="col-lg-4">
      <div className="panel panel-info">
          <div className="panel-heading">
              <p>Videocard</p>
          </div>
          <div className="panel-body">
              <div className="table-responsive table-bordered">
                <Vcard getDisks={this.getDisks}/>
                  <div className="panel panel-success">
                      <div className="panel-heading">
                          <p> Edit Videocard Size </p>
                      </div>
                      <table className="table table-hover">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Size</th>
                                  <th>Edit</th>
                              </tr>
                          </thead>
                          <tbody>
                              { vcardsItem }
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
  </div>
    );
  }
}

const mapStateToProps = state => ({
    vcards: state.vcards.vcardList
  })
  
  export default connect(mapStateToProps, { getVCards, putAPI })(CreateVcard);