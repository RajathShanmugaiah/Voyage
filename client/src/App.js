  import React, { Component } from 'react'
  import { BrowserRouter as Router, Route } from 'react-router-dom'
  import { Switch } from 'react-router-dom'
  // import Landing from './components/Landing'
  import Login from './components/Login'
  import Register from './components/Register'
  // import Profile from './components/Profile'
  import  RichTextEditor from "./components/Quill";
  import  RichTextEditorEdit from "./components/EditQuill";
  import Stories from './components/Stories';
  import Profile from './components/profile';
  import ProtectedRoute from './components/protected';
  import {  ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  class App extends Component {
    render() {
      return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/register" component={Register} />
              <ProtectedRoute exact path="/stories" component={Stories} />
              <ProtectedRoute exact path="/newstory" component={RichTextEditor} /> 
            </Switch>
              <ToastContainer/>
          </div>
        </Router>
      )
    }
  }

  export default App