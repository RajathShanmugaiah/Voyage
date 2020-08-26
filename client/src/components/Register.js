import React, { Component } from 'react'
import { toast } from 'react-toastify';
import { register } from './UserFunctions'
// import { Link, withRouter } from 'react-router-dom'

class Register extends Component {
    constructor() {
        super()
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit (e) {
        e.preventDefault()

        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
        password: this.state.password
        }
        
        const errors = {}
        const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        errors.email = !user.email.match(emailformat) ?
                toast.warn('Invalid Email') :''
        errors.password = user.password.length < 6 ?
                toast.warn("Password should be more than 6 characters") : ""
        errors.first_name = user.first_name < 3 ?
                toast.warn("Please enter first name") : ""
        errors.first_name = user.first_name < 3 ?
                toast.warn("Please enter last name") : ""
                        
                console.log(errors)

                if (errors.email === "" && errors.password === "") {
                    register(user).then(res => {
                        this.props.history.push(`/`)
                        toast.success("Successfully Registered")
                        
                    })
        
    }
    
}

    render () {
        return (
            <div class="diary-header-image">
                <div class="container">
                    <div class="row">
                    <div id="head1"  style={{ fontSize: "20px"}} class="col-md-6">
                        <p> 
                        <img className="diary-logo" src={require("../assets/mylogo.png")}></img>
                        </p>
                        <h2  style={{ fontSize: "25px",marginLeft:"-7%" }} ><b>CAPTURE YOUR MOMENTS.</b></h2>
                        <h3 style={{ fontSize: "20px",marginLeft:"4%" }}>Relive past stories</h3>
                        <h6 class="header_sub_title_final" style={{ fontSize: "20px"}}><strong>Experience.Write.Re-live.</strong></h6>
                    </div>
                    <div id="head"   style={{ fontSize: "20px" }} class="col-md-6"> 

                        <div class="box">          
                            <center style={{marginTop: "-5%",marginBottom: "-10%"}}><a class="btn btn-lg  btn-success"   style={{fontSize:"20px", color:"white"}} onClick={() => this.props.history.push('/')}> Log In </a></center>
                        <br/><br/>
                            <h6 class="or">OR</h6>
                            <h2>Sign Up</h2>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="inputBox">
                                <input type="text" name="first_name" placeholder="Enter First Name.." aria-label= "Enter your First name" value={this.state.first_name} onChange={this.onChange}/>
                            </div>
                            <div class="inputBox">
                                <input type="text"  name="last_name" placeholder="Enter Last Name.." aria-label= "Enter your Last name" value={this.state.last_name} onChange={this.onChange}/>
                            </div>
                            <div class="inputBox">
                                <input type="text" name="email" placeholder="Enter email.." aria-label= "Enter your Email id" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            <div class="inputBox">
                            <input type="password"  name="password" placeholder="Enter Password.." aria-label= "Enter your password" value={this.state.password} onChange={this.onChange} type="password"/>
                            </div>
                            <div class="row">
                                <div class="col-8"></div>
                                <button id="submit"  aria-label= "click on the button  to register"  type="submit" style={{alignItems:"center", color:"white"}} className="btn btn-lg btn-primary">Register</button>   
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

export default Register
