import React from "react";
import $ from "jquery";
import axios from "axios";

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      nombre: "",
      clave1: "",
      clave2: "",
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkListRequirements = this.checkListRequirements.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.uploadPicture = this.uploadPicture.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
    });
  }

  handleChange(e) {
    let field = e.target.id;
    this.setState({
      [field]: e.target.value,
    });
    if (/^clave/.test(field)) {
      setTimeout(() => {
        this.checkListRequirements(field);
      }, 100);
    }

    if (field === "nombre") {
      setTimeout(() => {
        this.checkListRequirements(field);
      }, 100);
    }
  }

  checkListRequirements(stateKey) {
    if (/^clave/.test(stateKey)) {
      let pw = this.state[stateKey];
      let checkMarks = 0;
      if (/\d/.test(pw)) {
        $("#digit").css("color", "green");
        checkMarks++;
      } else {
        $("#digit").css("color", "red");
      }
      if (/[A-Z]/.test(pw)) {
        $("#uppercase").css("color", "green");
        checkMarks++;
      } else {
        $("#uppercase").css("color", "red");
      }
      if (/[a-z]/.test(pw)) {
        $("#lowercase").css("color", "green");
        checkMarks++;
      } else {
        $("#lowercase").css("color", "red");
      }
      if (/[!@#$%^&*_)(-]/.test(pw)) {
        $("#special").css("color", "green");
        checkMarks++;
      } else {
        $("#special").css("color", "red");
      }
      if (/[ ]/.test(pw)) {
        $("#spaces").css("color", "red");
      } else {
        $("#spaces").css("color", "green");
        checkMarks++;
      }
      if (pw.length >= 8) {
        $("#length").css("color", "green");
        checkMarks++;
      } else {
        $("#length").css("color", "red");
      }
      if (this.state.clave1 === this.state.clave2) {
        $("#comparison").css("color", "green");
        checkMarks++;
      } else {
        $("#comparison").css("color", "red");
      }

      if (checkMarks === 7) {
        $("#PasswordBtn").attr("disabled", false);
        // $("#PasswordBtn").attr('onClick',`{${this.handleSubmit}}`)
      } else {
        $("#PasswordBtn").attr("disabled", true);
      }
    }

    if (stateKey === "nombre") {
      let name = this.state[stateKey];
      let nameChecks = 0;

      if (name.length < 3) {
        $("#usernameErrorMsg").text(
          "Username Must Be Atlest Three(3) characters"
        );
        $("#UsernameBtn").attr("disabled", true);
        return;
      } else {
        $("#usernameErrorMsg").text("");
        nameChecks++;
      }
      if (/[ ]/.test(name)) {
        $("#usernameErrorMsg").text("Username may NOT contain spaces");
        $("#UsernameBtn").attr("disabled", true);
        return;
      } else {
        $("#usernameErrorMsg").text("");
        nameChecks++;
      }
      if (/[A-Za-z]/.test(name) === false) {
        $("#usernameErrorMsg").text("Username Must Contain Letters");
        $("#UsernameBtn").attr("disabled", true);
        return;
      } else {
        $("#usernameErrorMsg").text("");
        nameChecks++;
      }

      if (nameChecks === 3) {
        $("#UsernameBtn").removeAttr("disabled");
        // $("#UsernameBtn").attr('disabled',false)
        // $("#UsernameBtn").click('onClick',`{${this.handleSubmit}}`)
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let field = event.target.id;

    let subroute = () => {
      return field === "UsernameBtn"
        ? (subroute = "username")
        : field === "PasswordBtn"
        ? (subroute = "password")
        : null;
    };

    axios
      .post(`http://localhost:7100/userAccountInfo/${subroute()}`, {
        data: this.state,
      })
      .then((response) => {
        $(".loadingIcon").css("display", "unset");
        setTimeout(() => {
          $("#changeResultMessage").text(`${response.data}`);
          $("#nombre").val("");
          $(".loadingIcon").css("display", "none");
        }, 2000);
      })
      .catch((err) => {
        throw err;
      });
  }

  showPreview(event){
    event.preventDefault();
    let file = document.getElementById("profileImage").files[0];
    let reader = new FileReader();

    if(file){
      reader.readAsDataURL(file)
    }

    reader.addEventListener('load',()=>{
      let img = document.getElementById('profilePreview');
      img.src = reader.result;
      img.style.visibility = "visible";
    })
  }

  uploadPicture(event) {
    event.preventDefault();
    let file = document.getElementById("profileImage").files[0];
    // console.log(document.getElementById("profileImage"))
    // console.log(file)
    let reader = new FileReader()

    reader.addEventListener('load',()=>{

      $("#profilePic").attr('src', reader.result)
      // console.log($("#profilePic_responsive"))
      // $("#profilePic_responsive").attr('src', reader.result)

      axios.post('http://localhost:7100/uploadPicture',{
        email:this.state.user.email,
        file:reader.result
      }).then(response=>{
        alert(response.data)
        $("#profilePreview").css('visibility','hidden');
        $('#profileImage').val("");
      }).catch(err=>{
        throw err
      })

    });

    if(file){
      reader.readAsDataURL(file)
    }

    
  }

  render() {
    return (
      <div className="subSectionContainer">
        <p>
          <b>Fill Out Any Section of this Form to Edit Account Info</b>
        </p>


        <div id="accountInfoForm">
          
          <div className="loadingIcon"></div>
          <div id="changeResultMessage"></div>

          {/* =========== *** PROFILE PICTURE SECTION *** ==================== */}

          <form id="photoForm">
            <label htmlFor="file">
              <b>Profile Picture:</b>
              <br />
              <input id="profileImage" name="file" type="file" onChange={this.showPreview} />
              <br />
            </label>
              <img id="profilePreview" alt="" />
              <br />
            
            <input id="UserPicture" className="submitChangeBtn" type="submit" onClick={this.uploadPicture} />
            {/* <div id="profileImageErrorMsg"></div> */}
          </form>
          <hr />

          {/* =========== *** USERNAME SECTION *** ==================== */}

          <label>
            <b>Username:</b>
            <br />
            <input id="nombre" type="text" onChange={this.handleChange} />
            <br />
            <br />
            <button id="UsernameBtn" className="submitChangeBtn" onClick={this.handleSubmit}>
              Change Username
            </button>
          </label>
          <div id="usernameErrorMsg"></div>
          <hr />

          {/* =========== *** PASSWORD SECTION *** ==================== */}

          <label>
            <b>Password:</b>
            <br />
            <input id="clave1" type="password" onChange={this.handleChange} />
            <br />
          </label>
          <label>
            <b>Confirm New Password:</b>
            <br />
            <input id="clave2" type="password" onChange={this.handleChange} />
            <br />
          </label>
          <br />
          <button id="PasswordBtn" className="submitChangeBtn" onClick={this.handleSubmit}>
            Change Password
          </button>
        </div>

        <div className="requirementContainer">
          <p>
            Password <b>Must</b> adhere to following requirements:
          </p>
          <ul id="requirementList">
            <li id="uppercase">Atleast One(1) Uppercase Letter</li>
            <li id="special">Atleast One(1) Special Character</li>
            <li id="digit">Atleast One(1) Number</li>
            <li id="spaces">No Spaces</li>
            <li id="lowercase">Atleast One(1) Lowercase Letter</li>
            <li id="length">Atleast 8 characters</li>
            <li id="comparison">Both Passwords Must be identical</li>
          </ul>
        </div>
        
      </div>
    );
  }
}

export default AccountInfo;
