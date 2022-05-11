import React from 'react';
import './DonateBook.css';
import axios from 'axios';
import $ from 'jquery';
import {Link} from 'react-router-dom/cjs/react-router-dom.min';

class DonateBookComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      bookTitle:"",
      bookGenre:"",
      bookAuthor:"",
      bookComments:""
     }
     this.handleChange = this.handleChange.bind(this);
     this.validateForm = this.validateForm.bind(this);
  }

  handleChange(event){
    let field = event.target.id;
    let val = event.target.value;
 
    this.setState({
    [field]:val
    });

  }

  validateForm(event){
    let data = this.state;
    event.preventDefault();

    if(data.bookTitle===""){
      $("#fieldRequirements").css("display","unset");
      return
    }

    if(data.bookAuthor===""){
      $("#fieldRequirements").css("display","unset");
      return
    }

    if(data.bookGenre===""){
      $("#fieldRequirements").css("display","unset");
      return
    }

    if($("#bookComments").val()===""){
      $("#fieldRequirements").css("display","unset");
      return
    }

    this.handleSubmit(data)
  }

  handleSubmit(obj){
    let user = this.props.user

    let formattedBook = {
      title:obj.bookTitle,
      author:obj.bookAuthor,
      genre:obj.bookGenre,
      comments:[{
        commentator:user.name,
        comment:$("#bookComments").val()
      }],
      log:[{
        type:"IN",
        date:new Date(),
        user:user.name
      }],
      due:""
    };
    
    axios.post('http://localhost:7100/bookDonation',formattedBook)
      .then(response=>{
        alert(response.data)
        document.getElementById("donateBookForm").reset();
      }).catch(err=>{
        throw err
      })

  }

  showDropdownOptions(){
    $(".dropdownOption").each((x,i)=>{
      $(i).toggle();
    })
  }

  render() { 
    return ( 
      <div id="donateBookContainer">
        <header>BOOK DONATION FORM</header>
        <form id="donateBookForm">

          <label>
            <span>Title:</span><br/>
            <input id="bookTitle" onChange={this.handleChange} type="text" required /><br/>
          </label>
          
          <label>
            <span>Author:</span><br/>
            <input id="bookAuthor" onChange={this.handleChange} type="text" required />
          </label><br/>

          <label>
            <span>Genre:</span><br/>
            <input id="bookGenre" onChange={this.handleChange} type="text" required />
          </label><br/>

          <label>
            <span>Description/Comments:</span><br/>
            <textarea id="bookComments" onChange={this.handleChange}  required  placeholder="give a general summary or leave a comment..." type="text" />
          </label><br/>

          <span id="fieldRequirements">***All fields required***</span><br/>
          <button id="donateBookBtn" onClick={this.validateForm}>Donate Book</button>
        </form>

        {/* <div id="navbar_responsive">
          <span onClick={this.props.changePage}>Profile</span>
          <span onClick={this.props.changePage}>Library</span>
          <span onClick={this.props.changePage}>Settings</span>
          <span className="active">Donate</span>
          <Link to="/"><span onClick={this.props.logout}>Log Out</span></Link>

        </div> */}

        <div id="dropdownMenu">
          <div className="dropdownOption" onClick={this.props.changePage}>Profile</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Library</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Settings</div>
          <Link to="/"><div className="dropdownOption" onClick={this.props.logout}>LogOut</div></Link>
          <div className="active" onClick={this.showDropdownOptions}>☰ Donate</div>
        </div>
        
      </div>
     );
  }
}
 
export default DonateBookComponent;