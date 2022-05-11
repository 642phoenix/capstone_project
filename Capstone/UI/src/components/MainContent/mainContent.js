import React from 'react';
import HomeComponment from '../HomeComponent/HomeComponent';
import LoginModule from '../LoginModule/logIn';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileComponent from '../ProfileComponent/profileComponent';
import SignUpModule from '../SignUpModule/signUp';



class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 


    return ( 
      <div id="mainContentCont">
        <Switch>

          <Route exact path="/">
            <HomeComponment />
          </Route>

          <Route exact path="/login">
            <LoginModule logIn={this.props.logIn} status={this.props.status}/>
          </Route>

          <Route exact path="/signUp">
            <SignUpModule />
          </Route>

          <Route exact path="/userprofile">
            <ProfileComponent logOut={this.props.logOut} checkOut={this.props.checkOut} bookReturn={this.props.bookReturn} />
          </Route>

        </Switch>

      </div> 
    );
  }
}
 
export default MainContent;