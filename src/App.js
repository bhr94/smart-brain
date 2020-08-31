import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import "./App.css";
// var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
// let Models = require('./Models');
const initialState = {
  input:'',
        imageUrl:'',
        boxes:[],
        route:'signin',
        isSignedIn: false,
        user:{
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
      }
}

  class App extends Component {
    constructor(){
      super();
      this.state = {
        input:'',
        imageUrl:'',
        boxes:[],
        route:'signin',
        isSignedIn: false,
        user:{
          id: '',
          name: '',
          email: '',
          entries: 0,
          joined: ''
      }
    }
  }

    loadUser = (data) =>{
      this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
    }

calculateFaceLocation = (data)=>{
  
  const clarifaiFace = data.region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}

 displayFaceBox = (box) =>{
      this.setState(prevState =>{
          prevState.boxes.push(box)
          this.setState({boxes:prevState.boxes})
      })
 }

inputOnChange = (event)=>{
    this.setState({input: event.target.value});
}

onSubmit= ()=>{
  this.state.boxes.splice(0, this.state.boxes.length);
  // console.log("state length1 " + this.state.boxes.length)

    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({input: this.state.input})
      })
      .then(response => response.json())
      .then(response =>{
        // console.log("response1: " + JSON.stringify(response));
        if(response){
          fetch('http://localhost:3001/image', {
             method: 'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              }),
              credentials: 'include'
              })
              .then(response =>{
                return response.json()
                
              } )
              .then(count => {
                  this.setState(Object.assign(this.state.user, {entries: count}))    
              })
              
        }

        for(let i =0; i < response.outputs[0].data.regions.length;i++){
          this.displayFaceBox(this.calculateFaceLocation(response.outputs[0].data.regions[i]))
        }

       })
    
    .catch(err =>{console.log(err)})
}


onRouteChange = (route)=>{
  if(route === "signout"){
    this.setState({isSignedIn:false});
    this.state.boxes.splice(0, this.state.boxes.length); 
    this.setState({imageUrl: ""})

   }

  else if(route === "home"){
    this.setState({isSignedIn:true});
  }
    this.setState({route:route});
}

  render(){
    return (
      <div className="App">
       <Particles  className= "particles"
       params={{
            particles: {
              number: {
                value: 250,
                density: {
                  enable: true,
                  value_area: 800
                }
              }
        }
    }}/>
        <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
        {this.state.route === 'home'?
         <div>
            <Logo/>
            <Rank entries = {this.state.user.entries} name = {this.state.user.name}/>
            <ImageLinkForm inputOnChange = {this.inputOnChange} onSubmit = {this.onSubmit}/>
            <FaceRecognition keys = {this.state.user.entries} boxes = {this.state.boxes} imageUrl = {this.state.imageUrl}/>
          </div>
            :(
              this.state.route === "signin"?
              <Signin loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
              :<Register loadUser = {this.loadUser} onRouteChange = {this.onRouteChange}/>
            )
        }
     </div>
  ) 
}
  }

export default App;

  