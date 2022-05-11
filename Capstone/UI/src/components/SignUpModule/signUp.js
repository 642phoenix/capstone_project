import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import './signUp.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


class SignUpModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      newusername:"",
      newuseremail:"",
      newuserpassword:""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  handleChange(event){
    let field = event.target.id;
    if(/_responsive$/.test(field)){
      let index = field.indexOf("_responsive");
      field = field.substring(0,index);
    }
    this.setState({
      [field]:event.target.value
    });

  }

  handleSubmitSignUp(event){
    event.preventDefault();

    let obj = this.state;

    if( obj.name===''||obj.email===''||obj.password==='' ){
      $("#allfieldsTextSignUp").css("visibility","visible")
      $("#allfieldsTextSignUp_responsive").css("visibility","visible")
      return
    }

    axios.post('http://localhost:7100/signUp',{
      _username:obj.newusername,
      _userpassword:obj.newuserpassword,
      _useremail:obj.newuseremail
    }).then(response=>{
      if(response.data === "Account Created. Please Log In."){
        alert(response.data)
        document.getElementById('myForm').reset();
      }
    }).catch(err=>{
      throw err
    })    
  }

  
  render() { 
    
    return (
    <div id="signUpForm">
      
      <form id="myForm">

        <label>Username:<br/>
          <input id="newusername" type="text" onChange={this.handleChange} required />
        </label><br/>
        <label>Email:<br/>
          <input id="newuseremail" type="email" onChange={this.handleChange} required />
        </label><br/>
        <label>Password:<br/>
          <input id="newuserpassword" type="password" autoComplete="false" onChange={this.handleChange} required />
        </label><br/>
        <input id="signUpBtn" type="button" value="Sign Up" onClick={this.handleSubmitSignUp} required /><br/>
        <p id="allfieldsTextSignUp">** All Fields Required **</p>

      </form>


      <form id="myResponsiveForm">

        <label>Username:<br/>
          <input id="newusername_responsive" type="text" onChange={this.handleChange} required />
        </label><br/>
        <label>Email:<br/>
          <input id="newuseremail_responsive" type="email" onChange={this.handleChange} required />
        </label><br/>
        <label>Password:<br/>
          <input id="newuserpassword_responsive" type="password" autoComplete="false" onChange={this.handleChange} required />
        </label><br/>
        <input id="signUpBtn_responsive" type="button" value="Sign Up" onClick={this.handleSubmitSignUp} /><br/>
        <p id="allfieldsTextSignUp_responsive">** All Fields Required **</p>

      </form>
      
      <div id="backButtonContainer">
        <Link to="/"><button id="backBtn">⬅BACK</button></Link>
      </div>

    </div> 
    );
  }
}
 
export default SignUpModule;