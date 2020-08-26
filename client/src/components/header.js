import React, { Component } from "react";
import jwt_decode from 'jwt-decode'
import { Redirect, Link } from "react-router-dom";

class Header extends Component{
  constructor(props){
    super(props)
    this.state = {
      name:''
    }
  }
 logOut(e) {
     e.preventDefault()
     
  }
  onRedirct(e){
    return(
      <Link to='/stories'/>
    )
  }
  render(){
    return (
      <div>
            <nav class="navbar navbar-dark default-color">
            <Link class="navbar-brand" to = '/stories' style={{marginTop:"-0.5%"}}>
              <img src={require("../assets/navbar_logo.png")} height="50" width="60"/>
            </Link>
              <form class="form-inline my-2 my-lg-0 ml-auto">
                <a class="btn btn-danger btn-md my-2 my-sm-0 ml-3" href="/"  onClick={() =>
                 { 
                  localStorage.clear();
                 }
                }  style={{fontSize:"15px", alignItems:"center", color:"white"}}> LOG OUT &nbsp;<i class="fa fa-sign-out-alt"></i></a>
              </form>
            </nav>
      </div>
  
    )
  }

}
export default Header;