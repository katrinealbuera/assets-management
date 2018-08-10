import React, { Component } from "react";
import { Code } from 'react-content-loader';
import setup from '../../js/setup/api';
import CreateUser from '../../js/actions/user/CreateUser';
import { connect } from 'react-redux';
import { getUserId, getUsers, putAPI } from '../../actions/assetAction';
import Error401 from '../../views/error/Error401';
import { CommonPager } from '../common/pager';
import { Textbox } from 'react-inputs-validation';

class User extends Component {

  constructor(){
    super();

    this.state = {
      isEditing: false,
      userId: null,
      errors: {},
      currentPage: '',
      totalPage: '',
      total: '',
      fields: {},
      isValidForm: true,
      password: '',
    }
  }

  onPageChange = (page) => {
    this.props.getUsers(page, false)
  }

  componentWillMount() {
        this.setState({isLoading:true})
        this.props.getUsers()
        this.setState({isLoading:false})
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
            .then(() => {this.props.getUsers()})
            .catch(error => console.log(error))
        }
        this.setState({isEditing: false, password: ''})
    }

    handleClose = (event) => {
        event.preventDefault();
        this.setState({isEditing: false})
        this.props.getUsers()
    }

  render() 
  {
    var isAuth = localStorage.getItem('user');

    if (!this.props.unauthenticated === 401) {
      const { isLoading } = this.props;
      if (isLoading) {
       return <Code/>;
      }
    }

    var userList = this.props.users.map(function(props, index) {
      return(
        <tr key={'user_'+index}>
          <td className="col-lg-1">{props.id}</td>
          <td className="col-lg-3">{props.fullName}</td>
          <td className="col-lg-3">{props.userName}</td>
          <td className="col-lg-2"><input type="submit" className="btn btn-success" 
            value="Edit" onClick={this.getSelectedId.bind(this, props.id)}/></td>
        </tr>
      );}, this);

    var editList =
       (
        <div>
            <div className="form-group input-group">
                <span className="input-group-addon" role="img" aria-label="Name">Full Name</span>
                <input tye="text" className="form-control" name="fullName"
                    defaultValue={this.props.userId.fullName} onChange={this.handleChange} onInput={this.handleChange}/>
            </div>

            <div className="form-group input-group">
                <span className="input-group-addon" role="img" aria-label="UserName">UserName</span>
                <input tye="text" className="form-control" name="userName"
                    defaultValue={this.props.userId.userName}  onChange={this.handleChange} onInput={this.handleChange}/>
            </div>

            <div className="form-group input-group">
                <span className="input-group-addon" role="img" aria-label="Password">Password</span>
                <Textbox
                    tabIndex="1" id={'password'} name="password"
                    type="password" value={this.state.password} placeholder="Password"
                    onChange={(password, e) => {
                        this.setState({ password })
                    }}/>
            </div>
            
            <div className="form-group input-group">
                <input type="button" style={setup.styleCloseBtn} className={this.state.isValidForm ?
                 'btn btn-success' : 'btn btn-success disabled'}
                    value="Update" onClick={this.updateUser.bind(this, this.props.userId.id)}/>

                <input type="button" className="btn btn-info" style={setup.styleCloseBtn}
                    value="Close" onClick={this.handleClose}/>
            </div>
        </div>
        );
    
    return (
      <div id="page-wrapper">
        {this.props.unauthenticated === 401 || !isAuth ? 
        <Error401/> :
        <div>
          <div className="row">
          <div className="col-lg-12">
              <h1 className="page-header">User</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="panel panel-info">
              <div className="panel-heading">
                <p> List of User </p>
              </div>
                <div className="panel-body">
                    <div className="table-responsive table-bordered">
                      <form>
                      <table className="table table-striped table-hover table-borderless">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Username</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                              { userList }
                            </tbody>
                        </table>
                        {(this.props.totalPage && this.props.currentPage) 
                          && CommonPager(this.props.total, this.props.currentPage, this.onPageChange)}
                      </form>
                    </div>
                </div>
            </div>
        </div>
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
                </div>}
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
unauthenticated: state.unauthenticated.unauthenticatedError,
currentPage: state.models.userCurrentPage,
totalPage: state.models.userTotalPage,
total: state.models.userTotal,
page: state.page.page,
})

export default connect(mapStateToProps, { getUsers, getUserId, putAPI })(User);