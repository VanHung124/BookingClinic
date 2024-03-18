import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import 'bootstrap/dist/css/bootstrap.css';
import * as actions from "../../store/actions";
import './Login.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isShowPassword:false,
            errMessage:'',
        }
        
    }

    handleOnChangeInput=(event) => {
        this.setState({
            username: event.target.value
        })
    } 

    handleOnChangePassword=(event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin= async() =>{
        this.setState({
            errMessage:''
        })
        try{

            let data = await handleLoginApi(this.state.username,this.state.password)
            if(data &&data.errCode !==0){
                this.setState({errMessage:data.message})
            }
            if(data && data.errCode ===0){
                this.props.userLoginSuccess(data.user)
                console.log('dsasdasdad')
            }
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({errMessage:error.response.data.message})
                }
            }
        }
        
    }
    handleShowHidePassword = () =>{
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }  
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="col-12 text-login">Login <i class="bi bi-emoji-heart-eyes-fill"></i></div>
                        <div className="col-12 text-form-group">
                            <label > Username</label> 
                            <input type="text" className="form-control login-input " placeholder="Enter your username"
                            value={this.state.username}
                            onChange={(event)=> this.handleOnChangeInput(event)}/>
                        </div>
                        <div className="col-12 text-form-group">
                        <label > Password</label> 
                        <div className="login-input">
                            <div className="custom-input-password">
                                <input 
                                    type={this.state.isShowPassword ? 'text' : 'password'} 
                                    className="form-control " placeholder="Enter your password"
                                    value={this.state.password}
                                    onChange={(event) => this.handleOnChangePassword(event)}>
                                </input>
                                <span onClick={() => this.handleShowHidePassword()}>
                                <i class={this.state.isShowPassword ? 'bi bi-eye' : 'bi bi-eye-slash'}></i>
                                </span>
                                
                            </div>
                        </div>
                        
                        <div className="col-12" style={{color: 'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className="col-12 ">
                            <button className="btn btn-login" onClick={()=>{this.handleLogin()}}>Login</button>
                        </div>
                        <div className="col-12">
                            <span> Forgot your password</span>
                        </div>
                        <div className="col-12 text-center">
                            <span className="text-other-login ">Or Login with:</span>
                        </div> 
                        <div className="col-12 social-login">
                        
                        <i class="bi bi-google"></i>
                        <i class="bi bi-facebook"></i>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
