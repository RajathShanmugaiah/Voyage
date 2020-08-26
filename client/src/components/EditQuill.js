import React, { Component } from 'react';
import { toast } from 'react-toastify';
import CKEditor from 'ckeditor4-react';
import Footer from "./footer";
import Header from "./header";
import axios from 'axios'
import moment from 'moment';
import jwt from  'jwt-decode';


class RichTextEditorEdit extends Component {
    constructor() {
super()
this.state = {
    title: '',
    data:'',
    email:jwt(JSON.stringify(localStorage.getItem('auth'))).email
}

this.onChange = this.onChange.bind(this)
this.onClick = this.onClick.bind(this)
this.handleChange = this.handleChange.bind( this )
this.onEditorChange = this.onEditorChange.bind( this )
}

onChange(e) {
this.setState({ [e.target.name]: e.target.value })
}
onEditorChange( evt ) {
this.setState( {
    data: evt.editor.getData()
} );
}

handleChange( changeEvent ) {
this.setState( {
    data: changeEvent.target.value
} );
}

onClick(e) {
e.preventDefault()
const user = {
    title: this.state.title,
    data:this.state.data,
    email: this.state.email
}
const errors = {}
if(errors.title =  (user.title.length <1) )
{
    toast.error("Please enter title")
}
else if (errors.data = (user.data.length <1) )
{
    toast.error("Please enter story")
}
  console.log(errors)

axios.post('editordata/quill/', user )
.then(response => {
toast.success("Successfully Posted")
this.props.history.push('/stories')
return response.data
})
.catch(err => {
console.log(err.response.data)
})
}


    render() {
        return (

            <div class="row" style={{marginLeft:"0px",marginRight:"0px"}}>
                <Header />
                <div className="quill-image">
                    <h1 class="centered">New Journey</h1>
                    <h5 class="centered_sub_title">Please Enter your story below</h5>
                </div>
                <div className="container">
                <div className="row">
                        <div className="col-md-12">
                            <div className="quill" style={{ textAlign:"initial",marginTop:"3%",marginBottom:"3%" ,boxShadow:" 0px 15px 25px rgba(0,0,0,.5)"}}>

                                {/* <button id="save" onClick={this.Save.bind(this)}  aria-label= "Login to view the dashboard" style={{ width: "100px", alignItems: "center", color: "" }} className="btn btn-">
                                Save </button> */}
                                <br></br>
                                <br></br>
                                &nbsp; &nbsp; 
                                
                                        &nbsp;
                                        <div className="quill-inputBox">
                                            {/*<input type="" placeholder="Title....."   value={this.state.title} onChange={this.onChangeTitle} />*/}
                                            <p>Date and Time: &nbsp; <b>{new moment().format('LLLL')}</b> </p>
                                            <form>
                                                    <div class="inputBox">
                                                        <input type="text" name="title" placeholder="Enter Title.." value={this.state.title} onChange={this.onChange}/>
                                                    </div>
                                                    <input type="hidden" name="email" value={this.state.email}></input>
                                                
                                                <CKEditor
                                                data={this.state.data}
                                                onChange={this.onEditorChange} />
                                                <br/>
                                                <div class="row">
                                                <a class="btn btn-lg  btn-success" style={{fontSize:"20px", alignItems:"center", color:"white",marginLeft:"2%"}} onClick={this.onClick}> Submit </a>
                                                </div>
                                            </form>

                                            
                                        </div>
                                        
                                        &nbsp;
                                        &nbsp;
                                        &nbsp; 	
                                        {/*<button onClick={this.Save.bind(this)} >Save</button>*/}
                                <br></br>
                                <br></br>
                                <div>
                                
                            </div>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Footer />
            </div>




            

        );
    }

}


export default RichTextEditorEdit;
