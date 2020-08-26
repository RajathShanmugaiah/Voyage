import React, { Component } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import FacebookLogin from './facebook'

class Login extends Component {
  
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password
    }
    const errors = {}
    const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    errors.email = !user.email.match(emailformat) ?
                toast.warn('Invalid Email') :''
    errors.password = user.password.length < 6 ?
                toast.warn("Password should be more than 6 characters") : ""
    axios.post('users/login', user )
    .then(response => {
      localStorage.setItem('auth', JSON.stringify(response.data) )
      this.props.history.push('/stories')
      return response.data
    })
    .catch(err => {
      console.log(err.response.data)
    })
  }


  
   responseFacebook(response){
    const user = {
      email: this.state.email,
      password: this.state.password
    }

    axios.post('users/facebook/login', user )
    .then(response => {
      localStorage.setItem('auth', JSON.stringify(response.accessToken) )
      this.props.history.push('/stories')
      return response.data
    })
    .catch(err => {
      console.log(err.response.data)
    })
    console.log(response);
  }

  render() {
    return (
      <div class="diary-header-image">
          <div class="container ">
        <div class="row">
          <div id="head1"  style={{ fontSize: "20px"}} class="col-md-6">
            <p> 
              <img className="diary-logo" src={require("../assets/mylogo.png")}></img>
            </p>
            <h2 class="header_title" style={{ fontSize: "28px"}} ><b>CAPTURE YOUR MOMENTS.</b></h2>
            <h3 class="header_sub_title" style={{ fontSize: "24px"}}>Relive past stories</h3>
            <h6 class="header_sub_title_final" style={{ fontSize: "20px"}}><strong>Experience.Write.Re-live.</strong></h6>
          </div>
          <div id="head"   style={{ fontSize: "20px" }} class="col-md-6"> 

              <div class="box">
                <h2>Login</h2><br/>
                <FacebookLogin/>
                <br/>
                <h6 class="or">OR</h6>                
              <form noValidate onSubmit={this.onSubmit}>
                <div class="inputBox">
                  <input type="text" name="email" placeholder="Enter email.." aria-label= "Enter your Email id" value={this.state.email} onChange={this.onChange}/>
                </div>
                <div class="inputBox">
                  <input type="password"  name="password" placeholder="Enter Password.." aria-label= "Enter your password" value={this.state.password} onChange={this.onChange} type="password"/>
                </div>
                <div class="row">
                  <input type="submit" name="" value="Log In" id="signin"  aria-label= "Login to view the dashboard"/>
                  <a  class="Register_Margin_Left register_hover" style={{color: "white"}}  onClick={() => this.props.history.push('/register')} > <br/><center >New User? Register Here </center>  </a>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
