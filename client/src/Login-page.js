import React, { Component } from 'react'
import { login } from './UserFunctions'

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
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'There is user with such ' + field;
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
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
      "Invalid Email" : ""
    errors.password = user.password.length < 6 ?
      "Password should be more than 6 characters" : ""
    console.log(errors)

    if (errors.email === "" && errors.password === "")
      login(user).then(res => {
        if (res) {
          this.props.history.push(`/stories`)
        }
      })
    else {
      alert("Incorrect email id or password");
    }
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
            <h1 class="header_title" style={{ fontSize: "28px"}} ><b>CAPTURE YOUR MOMENTS.</b></h1>
            <h3 class="header_sub_title" style={{ fontSize: "24px"}}>Relive past stories</h3>
            <h6 class="header_sub_title_final" style={{ fontSize: "20px"}}><strong>Experience.Write.Re-live.</strong></h6>
          </div>
          <div id="head"   style={{ fontSize: "20px" }} class="col-md-6"> 

              <div class="box">
                <h2>Login</h2><br/>
                <label>with: &nbsp;&nbsp;&nbsp;</label>
                <button class="btn-primary" style={{borderRadius: "50%"}}><i style={{width:"20px"}} class="fab fa-facebook-f"></i></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn-danger" style={{borderRadius: "50%"}}><i class="fab fa-google"></i></button> 
                <br/><br/>
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
                  <a  href="/Register" class="Register_Margin_Left" style={{color: "white"}} onClick={this.handleClick}> <br/><center >New User? Register Here </center>  </a>
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
