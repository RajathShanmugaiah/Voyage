import React, { Component } from 'react';
import Footer from "./footer";
import Moment from 'react-moment';
import Header from "./header";
import {Redirect} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import { toast } from 'react-toastify';
import jwt from  'jwt-decode';


class Stories extends Component {

	constructor() {
		super()
		this.state={
			title:'',
			date:'',
			data:'',
			email:'',
			posts:[]
		}
	  }
	

	deleteStory = async (storyId) => {
		await axios.delete('editordata/quilldata/delete/' + storyId);
		toast.success("Story deleted Successfully")
        this.getStoriesPost();
	}

	getStoriesPost =() =>{
		axios.get('editordata/quilldata')
    .then(response => {
		let hasToken =JSON.stringify(localStorage.getItem('auth'))
		console.log(jwt(hasToken))
	  const content= response.data
	  this.setState({posts:content});
	  console.log('data recieved')
    })
    .catch(err => {
      console.log(err)
     })
	}

	  componentDidMount() {
		this.getStoriesPost();
	  }

	render() {

		const numItemsToGenerate = 20; //how many gallery items you want on the screen
		const imageHeight = 500; //desired image height in pixels
		

		let tokenUser = jwt(JSON.stringify(localStorage.getItem('auth'))).email
		const Blogstory = this.state.posts.map((data,index) => {
			if(data.email === tokenUser)
			{
				return (
					<div>
					<div class="card mb-12" style={{maxWidth: "100%",marginTop:"5%",marginBottom:"5%", boxShadow:" 0 15px 25px rgba(0,0,0,.5)" }}>
						  <div class="row no-gutters">
							<div class="col-md-4">
								<img src="https://source.unsplash.com/collection/827743/500x300/" class="card-img" alt="..."/>
							</div>
							<div class="col-md-8">
								<div class="card-body" key={data._id}>
									<h5 class="card-title">{data.title}</h5>
									<p class="card-text">{ReactHtmlParser(data.data)}</p>
									<p class="card-text"><small class="text-muted">Posted on <Moment local>{data.date}</Moment></small></p>
									<div class="row" style={{float:"right",marginRight:"2%"}}>
									<button class="btn btn-danger" style={{float:"right", marginTop:"3%",marginBottom:"10%"}} onClick={() => this.deleteStory(data._id)}><i class="fa fa-trash-alt"></i>&nbsp;DELETE</button>
									</div>
								</div>
							</div>
						</div>
					</div> 
					  </div>
					)
					
			}
		  });


		return (
			<div class="row" style={{marginLeft:"0px",marginRight:"0px"}}>
				<Header />
				<div class="stories-header-image">
				 	<h1 class="centered">Your Stories</h1>
					<div class="centered_new_button" style={{marginTop:"2%"}}>
						<a class="btn btn-lg  btn-success" onClick={() => this.props.history.push('/newstory')}  style={{fontSize:"20px", alignItems:"center", color:"white"}}> <i class="fa fa-plus"></i> ADD NEW </a>
					</div>
				</div>
			<div class="container">
					
					{Blogstory}		
			</div>
			
				<Footer />
			
		</div>
			
			
		)



	}
}
	

export default Stories;