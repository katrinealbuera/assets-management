import React, { Component } from "react";
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getDisks, postAPI } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';

class Harddisk extends Component{
    constructor(props){
        super(props);

        this.state = {
            size: '',
        }
    }

    checkValidInput = (size) => {
        if (isNaN(size)){
            return false;
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newSize = {
            size: this.state.size
        }

        this.props.postAPI(setup.BASE_URL + setup.Sizes.Harddisk, newSize)
            .then(() => {
                this.props.getDisks();
            }).catch(error => console.log(error))
        this.setState({size: ''});
    }

    render(){
        console.log(this.props.error.errorMessages)
        return(
        <div>
            <div className="panel panel-success">
                <div className="panel-heading">
                    <p> Add New Disk Size </p>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Size</th>
                                <th>Add</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <Textbox
                                    tabIndex="1" id={'size'} name="name" type="text" value={this.state.size} 
                                    onChange={(size, e) => {
                                        this.setState({ size })
                                    }} 
                                    onBlur={() => {}}
                                    validationOption={{
                                        name: 'Size',
                                        type: 'number',
                                        check: true, 
                                        required: true 
                                    }} />
                                <p>{this.props.error ? this.props.error.errorMessages : null}</p>
                            </td>
                            <td><input type="submit" value="Add" className={(this.checkValidInput(this.state.size) | this.state.size) 
                                ? 'btn btn-success' : 'btn btn-success disabled'}/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error.error
  })

export default connect(mapStateToProps, { postAPI, getDisks })(Harddisk);