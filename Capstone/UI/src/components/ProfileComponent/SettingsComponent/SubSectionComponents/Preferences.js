import React from 'react';
import $ from 'jquery';
import axios from 'axios';


class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // scheme:"",
      // header_background:"",
      // header_color:"",
      // header_shadow:"",
      // cont_back:"",
      // nav_border:"",
      // nav_background:"",
      // nav_color:"",
      userEmail:""
     }
    this.setScheme = this.setScheme.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.saveSettings = this.saveSettings.bind(this);
  }

  showField(event){
    let field = event.target.id;
    $(`.${field}`).toggleClass('preferencesColorInp');
  }

  hideField(x){
    let field = x.target.className;
    $(`.${field}`).toggleClass('preferencesColorInp');
  }

  changeColor(event, property, section){
    var userChoice = event.target.value;
    // console.log(userChoice, property, section)

    switch(section){
      case "header":

        $('.profileHeader').css(property,userChoice);
        if(property === 'text-shadow'){
          $('.profileHeader').css(property,`2px 2px 2px ${userChoice}`);
        }
        this.hideField(event);
        if(property!=='text-shadow'){
          let field = section.concat("_",property);
          this.setState({
            [field]:userChoice
          })
        }
        if(property === 'text-shadow'){
          let val = "2px 2px 2px ".concat(`${userChoice}`);
          this.setState({
            header_shadow:val
          })
        }
        
        break;

      case "page":
        $('#profileDisplayContainer').css(property,userChoice);
        this.hideField(event);
        this.setState({
          cont_back:userChoice
        })
        break;

      case "nav":
        let navBar = $("#settingsNav");
        navBar.css(property,userChoice);
        if(property === 'border'){
          navBar.css(property,`2px solid ${userChoice}`);
        }

        let field = `nav_${property}`;
        this.setState({
          [field]:userChoice
        });
        this.hideField(event);

        break;
      
      default:
        return
    }
    
  }

  saveSettings(){

    let settings = this.state;
    let userEmail = this.props.user.email;
    settings.userEmail = userEmail;
    // console.log(settings)

    axios.post('http://localhost:7100/editProfile',settings)
      .then(response=>{
        console.log(response.data)
      }).catch(err=>{
        throw err
      })

  }
  
  setScheme(event){
    this.componentDidUpdate(this.state);
    this.setState({
      scheme:event.target.value
    })
  }

  componentDidUpdate(prevState){
    if (prevState !== this.state) {
      switch(this.state.scheme){
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

 
  }


  render() { 

    return ( 
      <div className="subSectionContainer">

{/* *** HEADER SECTION *** */}
        <label><b>Profile Header</b></label><br/>
        <div>
          <button id="headerColor" onClick={this.showField}>Change Header Background</button>
          <div><input className="headerColor preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"background", "header")} /></div>
        </div>

        <div>
          <button id="headerFontColor" onClick={this.showField}>Change Header Font Color</button>
          <div><input className="headerFontColor preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"color", "header")} /></div>
        </div>

        <div>
          <button id="headerTextShadow" onClick={this.showField}>Change Header Text Shadow</button>
          <div><input className="headerTextShadow preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"text-shadow", "header")} /></div>
        </div>
        <hr/>
{/* *** END HEADER SECTION *** */}


{/* *** PAGE SECTION *** */}
        <label><b>Page Background</b></label><br/>
        <div>
          <button id="pageBackgroundColor" onClick={this.showField}>Change Page Background</button>
          <div><input className="pageBackgroundColor preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"backgroundColor", "page")} /></div>
        </div>

        <hr/>
{/* *** END PAGE SECTION *** */}


{/* NAVBAR SECTION */}
        <label><b>Navbar Border</b></label><br/>
        <div>
          <button id="navBarBorder" onClick={this.showField}>Change NavBar Border</button>
          <div><input className="navBarBorder preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"border", "nav")} /></div>
        </div>

        <label><b>Navbar Background</b></label><br/>
        <div>
          <button id="navBarBackground" onClick={this.showField}>Change NavBar Background</button>
          <div><input className="navBarBackground preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"background", "nav")} /></div>
        </div>

        <label><b>Navbar Font-Color</b></label><br/>
        <div>
          <button id="navBarFontColor" onClick={this.showField}>Change NavBar Font-Color</button>
          <div><input className="navBarFontColor preferencesColorInp" type="color" onChange={(e)=>this.changeColor(e,"color", "nav")} /></div>
        </div>
        <hr/>
{/* END NAVBAR SECTION */}



{/* *** SCHEME SECTION *** */}
        <label><b>Color Scheme</b></label><br/>
        <div>
          <select id="schemeDropDown" onChange={this.setScheme}>
            <option value="default">Default</option>
            <option value="light">Light</option>
            <option value="colorful">Colorful</option>
          </select>
        </div>
{/* *** END SCHEME SECTION *** */}

        <br/><hr/>

        <center><button onClick={this.saveSettings}>SAVE</button></center>

      </div>
     );
  }
}
 
export default Preferences;