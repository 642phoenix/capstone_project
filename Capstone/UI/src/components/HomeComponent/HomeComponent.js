import React from 'react';
// import $ from 'jquery';
import './homeComponent.css'
// import { Switch, Route, Redirect} from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  render() { 
    return (
      <div id="homeComponentContainer">
        <div id="app-header">
          <p>Welcome</p>
          <h1>PERSEVERE</h1>
        </div>

        <div className="responsiveHome">
          <Link to="/login"><button id="loginSpan">Login</button></Link>
          <Link to="/signUp"><button id="signUpSpan">Sign Up</button></Link>
        </div>

      </div> 
    );
  }
}
 
export default HomeComponent;