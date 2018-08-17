import React, { Component } from "react";
import setup from '../../actions/setup/api';
import CreateUser from '../user/CreateUser';
import Error401 from '../../views/error/Error401';
import ErrorNetwork from '../../views/error/ErrorNetwork';
import Loader from '../common/Loader';
import { connect } from 'react-redux';
import { getUserId, getUsers, putAPI } from '../../actions/assetAction';
import { CommonRegisterForm, CommonRegisterFormHeader, 
    CommonOnInputText, CommonSubmitBtn, CommonSuccessMessage } from '../common/component';

class User extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      isSaved: false,
      isValidForm: true,
      userId: null,
      errors: {},
      currentPage: '1',
      totalPage: '',
      total: '',
      fields: {},
      password: '',
      errorMessage: '',
      isAuth: '',
    }
  }

    onPageChange = (page) => {
        this.setState({currentPage: page})
        this.props.getUsers(page, false)
    }

    componentWillMount() {
        this.setState({isAuth: localStorage.getItem('user')})
        this.props.getUsers()
        this.setLoading()
    }
  
    setLoading() {
        this.setState({isLoading: true})
        setTimeout(() => {
        this.setState({
            isLoading: false
        })
        }, 2000)
    }  

    getSelectedId = function(index, event) {
        event.preventDefault();

        this.setState({isEditing: true, userId: index})
        this.editSelectedUser(index)
    }

    editSelectedUser = (id) => {
        this.props.getUserId(id)
    }

    handleChange = (event) => {
        let fields = this.props.userId;
        fields[event.target.name] = event.target.value;

        if ((!fields["userName"] || !fields["fullName"]) || 
            (fields["userName"].length > 20 || fields["fullName"].length > 60)){
            this.setState({isValidForm: false})
        }
        else{
            this.setState({isValidForm: true})
        }

        this.setState({fields: this.props.userId})
    }

    updateUser = (id, event) => {
        event.preventDefault();

        if (this.state.isValidForm) {

            let newUser = {
                userId: id,
                id: id,
                password: this.state.password,
               ...this.props.userId,
            }

            this.props.putAPI(setup.BASE_URL + setup.GetUser, id, newUser)
            .then(() => {
                this.props.getUsers(this.state.currentPage)
                this.showSuccessMessage()
                this.setState({fullName: '', userName: '', errorMessage: ''})
            })
            .catch(error => {
                this.setState({fullName: this.state.fullName, userName: this.state.userName,
                     errorMessage: error.response.data.errorMessages, isEditing: true})
            })
        }
        this.setState({isEditing: false, password: '' })
    }

    handleClose = (event) => {
        event.preventDefault();
        this.setState({isEditing: false})
        this.props.getUsers()
    }

    showSuccessMessage = () => {
        this.setState({isSaved: true})
    
        setTimeout(() => {
            this.setState({
                isSaved: false
            })
        }, 2000)
      }

  render() 
  {
    const { isAuth } = this.state;

    var userList = this.props.users.map(function(props, index) {
      return(
        <tr key={'user_'+index}>
          <td className="col-lg-1">{props.id}</td>
          <td className="col-lg-3">{props.fullName}</td>
          <td className="col-lg-3">{props.userName}</td>
          <td className="col-lg-2"><input type="submit" className="btn btn-info" 
            value="Edit" onClick={this.getSelectedId.bind(this, props.id)}/></td>
        </tr>
      );}, this);

    var editList =
       (
        <div>
             { CommonOnInputText('Full Name', 'text', 'fullName', this.handleChange,this.handleChange, null, true, this.props.userId.fullName) }
             { CommonOnInputText('UserName', 'text', 'userName', this.handleChange,this.handleChange, null, true, this.props.userId.userName) }
             { CommonOnInputText('Password', 'password', 'password', this.handleChange,this.handleChange, null, true, this.props.userId.password) }
            
            <div className="form-group input-group">
                    { CommonSubmitBtn(this.state.isValidForm ?'btn btn-success' : 'btn btn-success disabled', 
                            'Update', this.updateUser.bind(this, this.props.userId.id)) }
                    { CommonSubmitBtn('btn btn-info', 'Close', this.handleClose) }
            </div>
        </div>
        );
    
    return (
    this.props.networkError ? <ErrorNetwork/> : (this.props.unauthenticated === 401 || !isAuth) ? <Error401/> :
    this.state.isLoading ? <Loader/> :
      <div id="page-wrapper">
        <div>
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">User</h1>
                        { CommonRegisterFormHeader(this.state.errorMessage) }
                        { this.state.isSaved && CommonSuccessMessage('updated') }
                </div>
            </div>
            <div className="row">
                { CommonRegisterForm('User', this.props.totalPage, this.props.currentPage, this.props.total,
                        this.onPageChange, userList, true) }
                {!this.state.isEditing ? <CreateUser getUser={this.getUser}/> : 
                <div className="col-lg-6">
                    <div className="panel panel-success">
                        <div className="panel-heading">
                            <p> Edit User </p>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    {this.state.userId === this.props.userId.id && editList}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> }
            </div>
         </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
users: state.users.userList,
userId: state.userId.user,
isLoading: state.models.isLoading,
currentPage: state.users.userCurrentPage,
totalPage: state.users.userTotalPage,
total: state.users.userTotal,
page: state.page.page,
userIsSuccess: state.users.userIsSuccess,
unauthenticated: state.unauthenticated.unauthenticatedError,
networkError: state.networkError.networkError,
})

export default connect(mapStateToProps, { getUsers, getUserId, putAPI })(User);