import React from 'react';
import './profileComponent.css'
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import UserProfile from './UserProfileComponent/UserProfile';
import LibraryComponent from './LibraryComponent/LibraryComponent';
import SettingsComponent from './SettingsComponent/SettingComnponent';
import DonateBookComponent from './DonateBookComponent/DonateBookComponent';
import placeholder from '../../resources/Avatar 01.png';
// import axios from 'axios';
// import { intializeUser } from '../../actions';
// import profileReducer from '../../reducers/profileReducer';

// const SetData = (data) => useDispatch(intializeUser(data));

const ProfileComponent = (props) => {

  var userData = useSelector(state=>state.user_data);


  var username = userData.name;
  const logOut = props.logout;

  // function SetDataAgain(data){
  //   // const [state ,intializeUser] = useReducer(profileReducer, {})
  //   // useDispatch(intializeUser(data))
  //   console.log(data.email , "grabbed")
  // }

  // function grabDataUsingCookie(){
    // let userID = getCookie("userID");
    // console.log("in the cook func",  userID)
    // axios.post('http://localhost:7100/userprofile',{
    //   userID:userID
    // }).then(response=>{
    //   SetDataAgain(response.data)
    //   console.log(response.data.name , "grabbed")
    //   userData = response.data
    // }).catch(err=>{
    //   console.log("error post", err)
    //   throw err
    // })

  // }

  // function getCookie(cname) {
  //   let name = cname + "=";
  //   let ca = document.cookie.split(';');
  //   for(let i = 0; i < ca.length; i++) {
  //     let c = ca[i];
  //     while (c.charAt(0) === ' ') {
  //       c = c.substring(1);
  //     }
  //     if (c.indexOf(name) === 0) {
  //       return c.substring(name.length, c.length);
  //     }
  //   }
  //   return "";
  // }


  function displayNav(){
    $("#SideNavBar").css("width","250px");
  }

  function closeNav(){
    $("#SideNavBar").css("width","0");
  }
  

  class UserInterface extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        display:"Profile"
      }
      this.changeDisplay = this.changeDisplay.bind(this);
      this.redirectLibrary = this.redirectLibrary.bind(this);
    }

    changeDisplay(event){
      let selection = event.target.textContent;
      let old = $("span.active").eq(0);
      old.click(this.changeDisplay)
      old.toggleClass("active");
      let nowActiive = $("#navbar_responsive").find(`.${selection}Span`);
      nowActiive.toggleClass("active")
      this.setState({
        display:selection
      })
      closeNav();
    }

    redirectLibrary(){
      let old = $("span.active").eq(0);
      old.click(this.changeDisplay)
      old.toggleClass("active");
      $("#navbar_responsive").find('.LibrarySpan').toggleClass("active")
      this.setState({
        display:"Library"
      })
    }

    // UNSAFE_componentWillMount(){
    //   // console.log(userData, " <=== aqui")
    //   if(userData.name === undefined){
    //     let userID = getCookie("userID");
    //     console.log("in the cook func",  userID)
    //     axios.post('http://localhost:7100/userprofile',{
    //       userID:userID
    //     }).then(response=>{
    //       SetData(response.data)
    //       // SetDataAgain(response.data)
    //       // console.log(response.data.name , "grabbed")
    //       userData = response.data
    //     }).catch(err=>{
    //       console.log("error post", err)
    //       throw err
    //     })
    //     // grabDataUsingCookie()
    //     // console.log("Trying")
    //   }
    // }

    componentDidMount(){
      let settings = this.props.user.settings;
      let profilePic = this.props.user.img;
      // console.log(settings)

      if(settings.scheme){
        switch(settings.scheme){
          case "default":
            $('.profileHeader').css("background", 'linear-gradient(to right, white , deepskyblue)');
            $('.profileHeader').css("color", 'rgb(0, 0, 0)');
            $('.profileHeader').css("text-shadow", '2px 2px 2px rgb(0, 116, 136)');
            $('.profileHeader').css("box-shadow", '5px 5px 3px rgb(8, 8, 8)');
            $('.profileHeader').css("border", '5px solid white');
            $('#menuIcon').css('color', 'white');
            $('#settingsNav').css('border', '3px solid white');
            $('#settingsNav').css('backgroundColor', 'rgb(0, 191, 255)');
            $('.subSectionContainer').css('backgroundColor', 'white');
            $('.subSectionContainer').css('border', '4px solid deepskyblue');
            $('.subSectionContainer').css('color', 'rgb(0, 0, 0)');
            $('body').css('backgroundColor', 'rgb(40, 44, 52)');
            $('body').css('color', 'rgb(0, 0, 0)');
  
            break;
            
          case "light":
            $('.profileHeader').css("background", "rgb(192, 192, 192)");
            $('.profileHeader').css("color", "black");
            $('.profileHeader').css("text-shadow", "2px 2px 2px grey");
            $('.profileHeader').css("box-shadow", "5px 5px 3px grey");
            $('.profileHeader').css("border", "5px solid black");
            $('#menuIcon').css('color','black');
            $('#settingsNav').css('border','3px solid black');
            $('#settingsNav').css('backgroundColor','grey');
            $('.subSectionContainer').css('backgroundColor','rgb(192, 192, 192)');
            $('.subSectionContainer').css('border','4px solid black');
            $('.subSectionContainer').css('color','black');
            $('body').css('backgroundColor','white');
            $('body').css('color','black');
            
            break;
  
          case "colorful":
            $('.profileHeader').css("background", "rgb(52, 119, 46)");
            $('.profileHeader').css("color", "lime");
            $('.profileHeader').css("text-shadow", "2px 2px 2px gold");
            $('.profileHeader').css("box-shadow", "5px 5px 3px rgb(2, 2, 190)");
            $('.profileHeader').css("border", "5px solid white");
            $('#menuIcon').css('color','rgb(168, 2, 2)');
            $('#settingsNav').css('border','3px solid black');
            $('#settingsNav').css('backgroundColor','orange');
            $('.subSectionContainer').css('backgroundColor','blue');
            $('.subSectionContainer').css('border','4px solid red');
            $('.subSectionContainer').css('color','white');
            $('body').css('backgroundColor','deepSkyBlue');
            $('body').css('color','black');
  
            break;
  
          default:
            return
        }
      }

      if(settings.header_background){
        $('.profileHeader').css('background',settings.header_background);
      }

      if(settings.header_color){
        $('.profileHeader').css('color',settings.header_color);
      }

      if(settings.header_shadow){
        $('.profileHeader').css('text-shadow',settings.header_shadow);
      }

      if(settings.cont_back){
        $('#profileDisplayContainer').css('background',settings.cont_back);
      }

      if(profilePic){

        $("#profilePic").attr('src', profilePic)

      }

    }

    render() { 
      
      let currentDisplay = () =>{
        return(
          this.state.display==="Profile"?
          <UserProfile data={userData} bookReturn={props.bookReturn} redirectLibrary={this.redirectLibrary} changePage={this.changeDisplay} logout={logOut} />:
          this.state.display==="Library"?
          <LibraryComponent user={userData} checkOut={props.checkOut} changePage={this.changeDisplay} logout={logOut} />:
          this.state.display==="Settings"?
          <SettingsComponent user={userData} changePage={this.changeDisplay} logout={logOut} />:
          this.state.display ==="Donate"?
          <DonateBookComponent user={userData} changePage={this.changeDisplay} logout={logOut} />:
          null
        )
      }

      return (
        <div id="profileContainer">
    
          <div className="profileHeader">Welcome {username}<div id="profilePicCont"><img id="profilePic" src={placeholder} alt="" /></div></div>
    
          <span id="menuIcon" onClick={displayNav}>☰ Menu</span>
    
          <div id="SideNavBar" className="sideNav">
            <span className="closebtn" onClick={closeNav}>&times;</span>
            <span onClick={this.changeDisplay}>Profile</span>
            <span onClick={this.changeDisplay}>Library</span>
            <span onClick={this.changeDisplay}>Settings</span>
            <span onClick={this.changeDisplay}>Donate</span>
            <Link to="/"><span onClick={logOut}>Log Out</span></Link>
          </div>

          <div id="profileDisplayContainer">{currentDisplay()}</div>        
        

          <div id="navbar_responsive">
            <span className="active ProfileSpan">Profile</span>
            <span className="LibrarySpan" onClick={this.changeDisplay}>Library</span>
            <span className="SettingsSpan" onClick={this.changeDisplay}>Settings</span>
            <span className="DonateSpan" onClick={this.changeDisplay}>Donate</span>
            <Link to="/"><span onClick={this.props.logout}>Log Out</span></Link>

          </div>

        </div>
      );
    }
  }
  
  return (
      <UserInterface user={userData} />
  )

}
 
export default ProfileComponent;