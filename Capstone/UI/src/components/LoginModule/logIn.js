import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import './login.css';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

let mylocation = "/login";
class LoginModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username:"",
      useremail:"",
      userpassword:""
     }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
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


  handleSubmitLogin(){
    // event.preventDefault();
    let obj = this.state;
    // console.log(obj)
    if(obj.username===""||obj.useremail===""||obj.userpassword===""){
      $("#allfieldsTextLogIn").css("visibility","visible");
      $("#allfieldsTextLogIn_responsive").css("visibility","visible");
      return
    }else{
      $("#allfieldsTextLogIn").css("visibility","hidden");
      $("#allfieldsTextLogIn_responsive").css("visibility","hidden");
    }

    axios.post('http://localhost:7100/logIn',{
      _username:obj.username,
      _useremail:obj.useremail,
      _userpassword:obj.userpassword
    }).then((response)=>{
      // console.log(response)
      if(response.data==="Incorrect Password"){
        $("#errorMsg").text(response.data)
        $("#errorMsg_responsive").text(response.data)
        return;
      }
      else if(response.data === "Incorrect Username"){
        $("#errorMsg").text(response.data)
        $("#errorMsg_responsive").text(response.data)
        return;
      }
      else if(response.data === "Invalid Account Info"){
        $("#errorMsg").text("Invalid Email Address")
        $("#errorMsg_responsive").text("Invalid Email Address")
        return;
      }
      else if(response.statusText==="OK"){
        mylocation="/userprofile";
        document.cookie = `userID=${response.data._id}`;
        this.props.logIn(response.data);
        setTimeout(()=>{
          mylocation="/login";
        }, 500)
      }
      
    }).catch(err=>{throw err})
   
  }

  handleEnterKey(event){
    if(event.keyCode === 13){
      this.handleSubmitLogin()
    }
    return
  }


  render() { 
    
    return (
    <div id="logInForm">
    
      <form id="fullLogin">

        <label>Username:<br/>
          <input id="username" type="text" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
        </label><br/>
        <label>Email:<br/>
          <input id="useremail" type="email" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
        </label><br/>
        <label>Password:<br/>
          <input id="userpassword" type="password" autoComplete="false" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
        </label><br/>
        <input id="loginBtn" type="button" value="LogIn" onClick={this.handleSubmitLogin} required /><br/>
        <p id="allfieldsTextLogIn">** All Fields Required **</p>
        <p id="errorMsg"></p>

      </form>
      
      {/* <Link to="/"><button className="backBtn">⬅BACK</button></Link> */}

      <div id="responsiveLogin">
        <form>

          <label>Username:<br/>
            <input id="username_responsive" type="text" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
          </label><br/>
          <label>Email:<br/>
            <input id="useremail_responsive" type="email" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
          </label><br/>
          <label>Password:<br/>
            <input id="userpassword_responsive" type="password" autoComplete="false" onChange={this.handleChange} onKeyDown={this.handleEnterKey} required />
          </label><br/>
          <input id="loginBtn_responsive" type="button" value="LogIn" onClick={this.handleSubmitLogin} required /><br/>
          <p id="allfieldsTextLogIn_responsive">** All Fields Required **</p>
          <p id="errorMsg_responsive"></p>

        </form>


      </div>

      <Link to="/" id="backLink"><button className="backBtn">⬅BACK</button></Link>

      <Redirect to={`${mylocation}`}/>
    </div>
    );
  }
}
 
export default LoginModule;