import React from 'react';
import $ from 'jquery';
import './settings.css'
import AccountInfo from './SubSectionComponents/AccountInfo';
import DeleteAccount from './SubSectionComponents/DeleteAccount';
import Preferences from './SubSectionComponents/Preferences';
import {Link} from 'react-router-dom/cjs/react-router-dom.min';


class SettingsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user:{
        name:this.props.user.name,
        email:this.props.user.email,
        password:this.props.user.password,
        settings:this.props.user.settings
      },
      subSection:"Account Info"
     }
     this.changeSection = this.changeSection.bind(this);
  }

  changeSection(event){
    let current = this.state.subSection;
    let jQkey = current.match(/^\w+/)[0];
    
    $(`#navBtn${jQkey}`).fadeTo("fast",1);

    this.setState({
      subSection:event.target.textContent
    })
    let newjQkey = event.target.textContent.match(/^\w+/)[0];
    $(`#navBtn${newjQkey}`).fadeTo("fast",.5);
  }

  componentDidMount(){
    if (this.state.subSection==="Account Info"){
      $("#navBtnAccount").fadeTo("fast",.5)
    }
    let settings = this.state.user.settings
    // console.log("aqui", this.state)
    if(settings.nav_background){
      // console.log("aqui")
      $("#settingsNav").css('background',settings.nav_background);
    }

    if(settings.nav_border){
      $("#settingsNav").css('border',`3px solid ${settings.nav_border}`);
    }

    if(settings.nav_color){
      $("#settingsNav").css('color',settings.nav_color);
    }
  }

  showDropdownOptions(){
    $(".dropdownOption").each((x,i)=>{
      $(i).toggle();
    })
  }

  render() { 


    let currentSection = () =>{
      return(
        this.state.subSection==="Account Info"?
        <AccountInfo user={this.state.user} />:
        this.state.subSection==="Preferences"?
        <Preferences user={this.state.user} />:
        this.state.subSection==="Delete Account"?
        <DeleteAccount user={this.state.user} />:
        null
      )
    }
    return ( 
      <div id="settingsContainer">
        
        <div id="settingsNav">
          <span id="navBtnAccount" onClick={this.changeSection}>Account Info</span>
          <span id="navBtnPreferences" onClick={this.changeSection}>Preferences</span>
          <span id="navBtnDelete" onClick={this.changeSection}>Delete Account</span>
        </div>

        <div id="settingsDisplay">
          {currentSection()}
        </div>
        

        {/* <div id="navbar_responsive">

            <span onClick={this.props.changePage}>Profile</span>
            <span onClick={this.props.changePage}>Library</span>
            <span className="active">Settings</span>
            <span onClick={this.props.changePage}>Donate</span>
            <Link to="/"><span onClick={this.props.logout}>Log Out</span></Link>

        </div> */}

        <div id="dropdownMenu">

          <div className="dropdownOption" onClick={this.props.changePage}>Profile</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Library</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Donate</div>
          <Link to="/"><div className="dropdownOption" onClick={this.props.logout}>LogOut</div></Link>
          <div className="active" onClick={this.showDropdownOptions}>☰ Settings</div>

        </div>

      </div>
     );
  }
}
 
export default SettingsComponent;