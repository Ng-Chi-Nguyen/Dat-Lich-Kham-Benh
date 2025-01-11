import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         isShowPassword: false,
         errMessage: ''
      }
   }

   handleOnhangeUsername = (event) => {
      this.setState({
         username: event.target.value,
      })
   }

   handleOnhangePassword = (event) => {
      this.setState({
         password: event.target.value,
      })
   }

   handleLogin = async () => {
      this.setState({
         errMessage: ''
      })
      // console.log('username ', this.state.username, 'password: ', this.state.password)
      // console.log('all ', this.state)

      try {
         console.log("Calling handleLoginApi...");
         let data = await handleLoginApi(this.state.username, this.state.password)
         console.log(data)
         if (data && data.errCode !== 0) {
            console.log("errCode !0")
            this.setState({
               errMessage: data.message
            })
         }
         if (data && data.errCode === 0) {
            console.log("errCode 0")
            this.props.userLoginSuccess(data.userData.user);
            console.log("Login Thanh cong")
         }
      } catch (e) {
         if (e.response) {
            if (e.response.data) {
               this.setState({
                  errMessage: e.response.data.message
               })
            }
         }
         // console.log(e.message)
      }
   }

   handleShowHidePassword = () => {
      this.setState({
         isShowPassword: !this.state.isShowPassword,
      })
   }

   render() {

      return (
         <>
            <div className="LoginFrom">
               <div className="LoginFrom_title"><span>Login Form</span></div>
               <form action="#">
                  <div className="form-group">
                     <label>Username:</label>
                     <div className='row LoginFrom_EmailPhone'>
                        <i className="fas fa-user"></i>
                        <input type="text" placeholder="Email or Phone" required className="form-control"
                           value={this.state.username}
                           onChange={(event) => { this.handleOnhangeUsername(event) }}
                        />
                     </div>
                  </div>
                  <div className="form-group">
                     <label>Password:</label>
                     <div className='customPassword'>
                        <div className='row LoginFrom_Password'>
                           <i className="fas fa-lock"></i>
                           <input type={this.state.isShowPassword ? 'text' : 'password'} placeholder="Password" required className="form-control"
                              onChange={(event) => { this.handleOnhangePassword(event) }}
                           />
                        </div>
                        <span
                           onClick={() => { this.handleShowHidePassword() }}
                        ><i class={this.state.isShowPassword ? 'fa-solid fa-eye iconPassword' : 'fa-solid fa-eye-low-vision iconPassword'}></i></span>
                     </div>
                  </div>
                  <div className='col-12' style={{ color: "red" }}>
                     {this.state.errMessage}
                  </div>
                  <div className="LoginFrom_pass"><a href="#">Forgot password?</a></div>
                  <div className="row LoginFrom_buttonSubmit">
                     <input type="submit" value="Login" onClick={() => { this.handleLogin() }} />
                  </div>
                  <p className='text-center title_Social'>Or login with</p>
                  <div className='LoginFrom_social'>
                     <i className="fa-brands fa-google-plus-g"></i>
                     <i className="fa-brands fa-facebook"></i>
                  </div>
               </form>
            </div>
         </>
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
      userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
