import React, { Component } from "react";
import setup from '../../js/setup/api';
import { connect } from 'react-redux';
import { getVCards, postAPI } from '../../actions/assetAction';
import { Textbox } from 'react-inputs-validation';

class Vcard extends Component{
    constructor(props){
        super(props);

        this.state = {
            size: '',
            isValidForm: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const newSize = {
            size: this.state.size
        }

        if(this.state.isValidForm) {
        this.props.postAPI(setup.BASE_URL + setup.Sizes.Videocard, newSize)
            .then(() => {
                this.props.getVCards();
            }).catch(error => console.log(error))
        }
        this.setState({size: ''});
    }

    render(){
        return(
        <div>
            <div className="panel panel-success">
                <div className="panel-heading">
                    <p> Add New Videocard Size </p>
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
                                        if (isNaN(size) || size.length > 5 || !size){
                                            this.setState({ size, hasError: true, isValidForm: false })
                                        }
                                        else {
                                            this.setState({ size, hasError: false, isValidForm: true })
                                        }
                                    }} 
                                    onBlur={() => {}}
                                    validationOption={{
                                        name: 'Size',
                                        type: 'number',
                                        check: true, 
                                        required: true,
                                    }} />
                            </td>
                            <td><input type="submit" value="Add" className={this.state.size && !this.state.hasError
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

export default connect(null, { postAPI, getVCards })(Vcard);