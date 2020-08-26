import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios'

function App() {

  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState('');

  const clickComponent = (response) =>{
    const user = {
      name:response.name,
      email: response.email,
      accessToken: response.accessToken
    }
    axios.post('users/facebook/login', user )
    .then(response => {
      localStorage.setItem('auth', JSON.stringify(response.data) )
      this.props.history.push('/stories')
      return response
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture.data.url);
    if (response.accessToken) {
      setLogin(true);
      return (<Redirect to='/stories'/>)
    } else {
      setLogin(false);
    }
  }

  return (
    <div>
          { !login && 
            <FacebookLogin
              appId="884192668721309"
              fields="name,email,picture"
              scope="public_profile,user_friends"
              onClick={clickComponent}
              callback={responseFacebook}
              cssClass="btnFacebook"
              icon={<i className="fab fa-facebook-f" style={{marginRight:"5%",fontSize:"17px"}} ></i>}
              />
          }
        { login &&
          <Redirect to="/stories"/>
        }
    </div>
  );
}

export default App;
