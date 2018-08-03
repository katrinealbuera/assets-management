import React, { Component } from "react";
import setup from '../../setup/api';
import Memory from '../../../views/sizes/Memory';
import { connect } from 'react-redux';
import { Code } from 'react-content-loader';
import { putAPI, getMemories } from '../../../actions/assetAction';
import { validateSize } from '../../validation/validateInput';

const requiredInput = {
  color: 'red'
}

class CreateMemory extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      sizeId: null,
      errors: {},
    }
  }

  componentWillMount() {
    this.setState({isLoading:true})
    this.props.getMemories();
    this.setState({isLoading:false})
  }

  handleInputChange = (event) => {
    this.setState({ size : event.target.value})
  }
  
  isValid() {
    const { errors, isValid } = validateSize(this.state);

    if (!isValid) {
      this.setState({errors});
    }

    return isValid;
  }

  handleEditBtnClick = (index, size, event) => {
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
      if (this.isValid()) {
        this.props.putAPI(setup.BASE_URL + setup.Sizes.Memory + setup.Id, index, newSize)
        .then(response => {
          this.setState({sizeId: null, isEditing: false})
        })
        .then(() => {
          this.props.getMemories();
        })
        .catch(error => console.log(error));
        this.setState({errors: {}});
      }
    }
    this.setState({isEditing: true})
  }

  render() {
    
    const {isLoading} = this.props;
    const { errors } = this.state;
		
    if (isLoading) {
    return <Code/>;
    }

    var memoryItem = this.props.memory.map(function(props, index) {
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
                  <p style={requiredInput}>{errors.size}</p>
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
              <p>Memory</p>
          </div>
          <div className="panel-body">
              <div className="table-responsive table-bordered">
                <Memory getMemories={this.getMemories}/>
                  <div className="panel panel-success">
                      <div className="panel-heading">
                          <p> Edit Memory Size </p>
                      </div>
                      <table className="table table-striped table-hover table-borderless">
                          <thead>
                              <tr>
                                  <th>ID</th>
                                  <th>Size</th>
                                  <th>Edit</th>
                              </tr>
                          </thead>
                          <tbody>
                              { memoryItem }
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
  memory: state.memory.memoryList,
  isLoading: state.memory.isLoading
  })
  
  export default connect(mapStateToProps, { getMemories, putAPI })(CreateMemory);