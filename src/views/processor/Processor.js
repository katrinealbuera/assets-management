import React, { Component } from "react";
import { Code } from 'react-content-loader';
import CreateProcessor from '../../js/actions/processor/CreateProcessor';
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getProcessors, putAPI } from '../../actions/assetAction';
import { validateName } from '../../js/validation/validateInput';
import Error401 from '../../views/error/Error401';

const requiredInput = {
  color: 'red'
}

class Processor extends Component {

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
    this.props.getProcessors();
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
        this.props.putAPI(setup.BASE_URL + setup.Processors + setup.Id, index, newName)
        .then(response => {
          this.setState({nameId: null, isEditing: false})
        })
        .then(() => {
          this.props.getProcessors();
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

    var processorItem = this.props.processors.map(function(props, index) {
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
                <h1 className="page-header">Processor</h1>
            </div>
          </div>
          <div className="row">
              <div className="col-lg-6">
                  <div className="panel panel-info">
                      <div className="panel-heading">
                          <p> List of Processor </p>
                      </div>
                      <div className="panel-body">
                      <div className="table-responsive table-bordered">
                        <form>
                        <table className="table table-striped table-hover table-borderless">
                              <thead>
                                  <tr>
                                      <th>ID</th>
                                      <th>Processor</th>
                                      <th>Edit</th>
                                  </tr>
                              </thead>
                              <tbody>
                                { processorItem }
                              </tbody>
                          </table>
                        </form>
                      </div>
                  </div>
                  </div>
              </div>
            <CreateProcessor getProcessor={this.getProcessor}/>
          </div>
        </div> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processors: state.processors.processorList,
  isLoading: state.processors.isLoading,
  unauthenticated: state.unauthenticated.unauthenticatedError
})

export default connect(mapStateToProps, { getProcessors, putAPI })(Processor);