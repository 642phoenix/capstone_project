import './libraryComponent.css';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


class BookDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.checkOutBook = this.checkOutBook.bind(this);
  }

  closeModal(){
    $('#bookDetailsContainer').toggle();
  }

  checkOutBook(){
    let bookData = this.props.info;
    let userData = this.props.userData;
    let bookStat = bookData.log[bookData.log.length-1].type;
    if(bookStat==="OUT"){
      console.log("Boook unavailable")
      return
    }

    axios.post('http://localhost:7100/appLibrary/checkOut',{
      _id:bookData._id,
      _userID:userData._id,
      _user:userData.name,
      _date:new Date()
    }).then(response=>{ 
      // console.log(response.data);
      this.props.checkOut(bookData)
      $(`#status-${bookData.title}`).text("OUT");
      this.props.updateState()
      $("#bookDetailsContainer").css("display","none");
    }).catch(err=>{
      throw err
    })
  }

  render() { 
    let data = this.props.info;
    // console.log(this.props)

    return (
      <div id="bookDetailsModal">

        <header>
          {data.title}
          <span className="closebtn" onClick={this.closeModal}>
          &times;
        </span>
        <button id="checkOutbtn" onClick={this.checkOutBook}>
          CHECK OUT
        </button>
        </header>
        <hr />
        <div>
          <span>Author :</span> {data.author}
        </div>
        <div>
          {/* <span>Status : {this.bookStatus}</span>  */}
        </div>
        <details>
          <hr />
          {data.comments.map((element, index) => {
            return (
              <div htmlkey={`comment${index}`} key={`comment${index}`}  className="commentDiv">
                Comment Author : {element.commentator}
                <br />
                <div>"{element.comment}"</div>
                <hr className="commentSeperator" />
              </div>
            );
          })}
        </details>
      </div>
    );
  }
}
 

class LibraryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      library:[],
      bookInfo:""
     }
     this.componentDidMount = this.componentDidMount.bind(this);
     this.showBook = this.showBook.bind(this);
     this.forceUpdate = this.forceUpdate.bind(this);
  }

  filterData(e) {
    let text = new RegExp(e.target.value, "i");
    let data = document.getElementsByTagName("td");

    if (e.target.value === "") {
      for (let i = 0; i < data.length; i++) {
        data[i].removeAttribute("class");
      }
      return;
    }

    for (let i = 0; i < data.length; i++) {
      if (text.test(data[i].textContent)) {
        var cls = document.createAttribute("class");
        cls.value = "highLite";
        data[i].attributes.setNamedItem(cls);
      } else {
        data[i].toggleAttribute("class");
      }
    }
  }

  componentDidMount(){
    axios({
      method:"GET",
      url:"http://localhost:7100/appLibrary"
    }).then(response=>{
      if(response.data !== "Invalid Request"){
        this.setState({
          library:response.data
        })
      }
    }).catch(err=>{
      throw err
    })
  }

  showDropdownOptions(){
    $(".dropdownOption").each((x,i)=>{
      $(i).toggle();
    })
  }

  showBook(index){
    let books = this.state.library;
    let selectedBook = books[index];
    $("#bookDetailsContainer").css("display","unset");
    this.setState({
      bookInfo:selectedBook
    })

  }

  forceUpdate(){
    axios({
      method:"GET",
      url:"http://localhost:7100/appLibrary"
    }).then(response=>{
      if(response.data !== "Invalid Request"){
        this.setState({
          library:response.data
        })
      }
    }).catch(err=>{
      throw err
    })
  }

  render() { 
    let bookLog= this.state.library;
    // console.log(this.props)
    let tableRows = [];
    for (let i = 0; i < bookLog.length; i++) {
      let status = bookLog[i].log[bookLog[i].log.length-1].type;
      tableRows.push(
        <tr
          id={`tableRow${i}`}
          key={`bookNum${i + 1}`}
          htmlkey={`${bookLog[i].title}`}
          onClick={(event) => {
            let index = event.target.parentNode.id.match(/\d$/)[0];
            this.showBook(index);
          }}
        >
          <td>{bookLog[i].title}</td>
          <td>{bookLog[i].author}</td>
          <td>{bookLog[i].genre}</td>
          <td id={`status-${bookLog[i].title}`}>{status}</td>
        </tr>
      );
    }

    return (
      <div id="libraryContainer">

        <div id="bookDetailsContainer">
          {this.state.bookInfo?<BookDetails info={this.state.bookInfo} userData={this.props.user} updateState={this.forceUpdate} checkOut={this.props.checkOut} bookReturn={this.props.bookReturn} />:null}
        </div>


        <div id="searchBarContainer">
          <input id="tableSearchInput" placeholder="Search..." type="text" onChange={this.filterData}  />
        </div>
  
        <table id="libraryBooksTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="tableBody">{[...tableRows]}</tbody>
        </table>


        {/* <div id="navbar_responsive">

            <span onClick={this.props.changePage}>Profile</span>
            <span className="active">Library</span>
            <span onClick={this.props.changePage}>Settings</span>
            <span onClick={this.props.changePage}>Donate</span>
            <Link to="/"><span onClick={this.props.logout}>Log Out</span></Link>

        </div> */}

        <div id="dropdownMenu">

          <div className="dropdownOption" onClick={this.props.changePage}>Profile</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Settings</div>
          <div className="dropdownOption" onClick={this.props.changePage}>Donate</div>
          <Link to="/"><div className="dropdownOption" onClick={this.props.logout}>LogOut</div></Link>
          <div className="active" onClick={this.showDropdownOptions}>☰ Library</div>

        </div>

      </div>
    );
  }
}
 
export default LibraryComponent;