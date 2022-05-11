import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class DeleteAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      passInp1:"",
      passInp2:""
     }
    this.handleChange = this.handleChange.bind(this);
    this.sendIt = this.sendIt.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  sendIt(){
    if($('#passInp1').val()===""||$('#passInp1').val()!==this.props.user.password){
      $('#passInp1').css('border','2px solid red')
      return
    }else{
      $('#passInp1').css('border','1px solid black')
    }
    if($('#passInp2').val()===""||$('#passInp2').val()!==this.props.user.password){
      $('#passInp2').css('border','2px solid red')
      return
    }else{
      $('#passInp2').css('border','1px solid black')
    }

    axios.post('http://localhost:7100/deleteUserAccount',{
      _useremail:this.props.user.email
    }).then(response=>{
      if(response.data === "User Account Deleted Successfully"){
        console.log(response)
        $("#loadingIcon").show()
        setTimeout(()=>{
          window.location="/"
        },5000) 
      }
      else{
        return
      }
    }).catch(err=>{
      throw err
    })
    
  }


  render() { 

    return ( 
      <div className="subSectionContainer">

        <div id="loadingIcon"></div>

        <div id="deleteAccountForm">
          <b>Are you Sure You want to Delete your Account ?</b>
          <label><b>Password:</b><br/><input id="passInp1" type="text" onChange={this.handleChange} /></label>
          <label><b>Confirm Password:</b><br/><input id="passInp2" type="text" onChange={this.handleChange} /></label>
          <label><b>Reason :</b><br/></label><textarea></textarea>
          <input id="deleteAccountBtn" onClick={this.sendIt} type="button" value="DELETE" />
        </div>
        
      </div>
     );
  }
}
 
export default DeleteAccount;