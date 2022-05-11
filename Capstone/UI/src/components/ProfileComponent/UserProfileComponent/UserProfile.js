import React from 'react';
import './UserProfile.css';
import axios from 'axios';
import $ from 'jquery';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import placeholder from '../../../resources/Avatar 01.png';

class BookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      comments:this.props.info.comments
      // comments:[]
     }
    this.addComment = this.addComment.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }


  closeModal(){
    $('#bookModalContainer').css("visibility","hidden")
    this.props.refresh(this.props.user)
  }

  returnBook(book){
    this.closeModal()
    axios.post('http://localhost:7100/bookReturn',{
      _id:book._id,
      _user:this.props.user.name,
      _userID:this.props.user._id,
      _bookName:book.title
    }).then(response=>{
      if(response.data==="Book Returned Successfully"){
        
        this.props.bookReturn(book)
        this.props.refresh(this.props.books)

      }else{
        console.log(response.data,"error")
      }
    }).catch(err=>{
      throw err
    })
  }

  showTextArea(){
    $("#newCommentInput").toggle();
    $("#addCommentBtn").toggle();
    $("#submitCommentBtn").toggle();
  }

  addComment(){
    let text = $("#newCommentInput").val();
    if(text==="")return
    let obj = {
      bookID:this.props.info._id,
      commentator:this.props.user.name,
      comment:text
    }
  
    axios.put('http://localhost:7100/bookInfo/addComment',obj)
    .then(response=>{
      if(response.data!=="Invalid Entry"){
        let newList = this.state.comments
        newList.push({
          commentator:obj.commentator,
          comment:text
        });
        this.setState({
          comments:newList
        });
      }
    }).catch(err=>{
      throw err
    })

    $("#addCommentBtn").toggle();
    $("#submitCommentBtn").toggle();
    $("#newCommentInput").toggle();
    $("#newCommentInput").val("");
  }

  setDueDate(checkedOut){
    let checkedOutDate = new Date(checkedOut);
    let dueMonth = checkedOutDate.getMonth()+1;
    checkedOutDate.setMonth(dueMonth);
    return checkedOutDate.toLocaleDateString()
  }

  render() { 
    let data = this.props.info;
    let bookStatus = data.log[data.log.length-1].type;
    let dateCheckedOut = data.log[data.log.length-1].date;
    return ( 
      <div id="bookModal">
        <span className="bookModalClose" onClick={this.closeModal}>&times;</span>
        
        <header>
          {data.title}
          <div id="returnBookBtn" onClick={()=>this.returnBook(data)}>RETURN BOOK</div>
        </header><hr/>
        <div><span>Author :</span> {data.author}</div>
        <div><span>Status :</span> {bookStatus}<div/><span>Due Date :</span> {this.setDueDate(dateCheckedOut)}</div>
        <details>
          <hr/>
          {this.state.comments.map((element,index) => {
            return(
              <div htmlkey={`comment${index}`} key={`comment${index}`}>
                Comment Author : {element.commentator}<br/>
                <div>"{element.comment}"</div><hr className="commentSeperator" />
              </div>
            )
          })}
        </details>
        <div>
          <button id="addCommentBtn" onClick={this.showTextArea}>Add Comment</button>
          <button id="submitCommentBtn" onClick={this.addComment}>Submit</button>
          <div>
            <textarea id="newCommentInput"></textarea>
          </div>
        </div>
      </div>
     );
  }
}

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      bookInfo:"",
      user:this.props.data,
      books:this.props.data.books
     }
    this.showBook = this.showBook.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.libraryLink = this.libraryLink.bind(this);
    this.sendSong =this.sendSong.bind(this);
  }

  showBook(index){
    let books = this.props.data.books;
    let selectedBook = books[index];
    axios.post('http://localhost:7100/bookInfo',{
      _title:selectedBook.title
    }).then(response=>{
      this.setState({
        bookInfo:response.data
      })
      $('#bookModalContainer').css("visibility","visible")
    }).catch(err=>{
      throw err
    })
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
    let playlist = this.props.data.playlist;
    let player = document.getElementById("musicPlayer");
    let songList = document.getElementById("playlistContainer");
    let settings = this.props.data.settings;
    // let responsivePlaylist = document.getElementById("playlistContainer_responsive");
    // let responsivePlayer = document.getElementById("musicPlayer_responsive");
    
    if(this.props.data.img){
      $("#profilePic_responsive").attr('src', this.props.data.img)
    }



    function applySettings(pref){
      if(pref.cont_back!==""){
        $(".section").css('backgroundColor','transparent');
      }
    }
    applySettings(settings)

    if(playlist.length !== 0){
      playlist.map((song,i)=>{
        // this creates the Div for the user to be able to see their playlist
        let songDiv = document.createElement("DIV");
        let divId = document.createAttribute("id");
        let divClass = document.createAttribute("class");

        // this makes song change if user doubleClicks on other songDiv
        songDiv.addEventListener('dblclick',()=>{
          // console.log(event.target.id)
          let activeSong = player.childNodes[0];
          let selectedSong = song;
          let sourceNode = document.createElement("SOURCE");
          let songSrc = document.createAttribute("src");
          let songId = document.createAttribute("id");

          songId.value = selectedSong.title;
          songSrc.value = selectedSong.file;
          sourceNode.setAttributeNode(songSrc);
          sourceNode.setAttributeNode(songId);
          player.replaceChild(sourceNode, activeSong);
          // responsivePlayer.replaceChild(sourceNode,activeSong);
          player.load();
          // responsivePlayer.load();
        })

        songDiv.setAttributeNode(divId);
        songDiv.setAttributeNode(divClass);
        divClass.value= "songDiv";
        divId.value = `${song.title}_div`;
        songDiv.innerHTML = `${song.title} - <span>${song.artist}</span>`;
        songList.append(songDiv);
        // responsivePlaylist.append(songDiv);
      });
    }
    
    // this automatically replaces active song when current song ends
    player.addEventListener('ended',()=>{
     
      let endedTitle = player.childNodes[0].id;
      let endedIndex = playlist.findIndex(x=>x.title===endedTitle);
      if( endedIndex+1 !== playlist.length ){
        playThisSong(playlist[endedIndex+1])
      }
    });
    // responsivePlayer.addEventListener('ended',()=>{
     
    //   let endedTitle = player.childNodes[0].id;
    //   let endedIndex = playlist.findIndex(x=>x.title===endedTitle);
    //   if( endedIndex+1 !== playlist.length ){
    //     playThisSong(playlist[endedIndex+1])
    //   }
    // });

    function playThisSong(song){
      // this creates the source element for the musicplayer to start playing track 1
      let firstPlace = player.childNodes[0];
      let songNode = document.createElement("SOURCE");
      let srcNode = document.createAttribute("src");
      let idNode = document.createAttribute("id");
      let firstSong;
      if(song===undefined){
        firstSong = playlist[0];
      }
      else {
        firstSong = song
      }
      
      songNode.setAttributeNode(srcNode)
      songNode.setAttributeNode(idNode)
      srcNode.value = firstSong.file;
      idNode.value = `${firstSong.title}`;
      player.replaceChild(songNode, firstPlace);
      // responsivePlayer.replaceChild(songNode, firstPlace);
      player.load();
      // responsivePlayer.load();
    }
    player.volume = .5;
    // responsivePlayer.volume = .5;
    if(playlist.length!== 0 ){
      playThisSong()
    }
    

  }

  componentDidUpdate(prevProps){
    if (this.props.data !== prevProps.data) {
      this.fetchData(this.props.data);
    }
  }

  showDropdownOptions(){
    $(".dropdownOption").each((x,i)=>{
      $(i).toggle();
    })
  }

  // ??? idk wtf this does lol
  fetchData(x){
    this.setState({
      user:x,
      bookInfo:""
    })
  }

  libraryLink(){
    this.props.redirectLibrary()
  }

  sendSong(event){
    event.preventDefault();
    let reader = new FileReader();

    let title = $("#songFormTitle").val();
    let artist = $("#songFormArtist").val();
    let file = document.getElementById("songFormFile").files[0];
    let userID = this.props.data._id;

    if(title === "" || artist === "" ||file === "")return

      reader.addEventListener('load',()=>{

        axios.post('http://localhost:7100/addSong',{
          userID:userID,
          title:title,
          artist:artist,
          file:reader.result
        }).then(response=>{
          // this.componentDidUpdate(this.props.data)
          alert(response.data)
        }).catch(err=>{
          throw err
        })

      });

      if (file){
        reader.readAsDataURL(file)
      }
  }

  render() { 

    let bookLog = this.state.books;
    
    let tableRows = [];
    for (let i = 0; i < bookLog.length; i++) {
        tableRows.push(
          <tr
            className="userBookRow"
            id={`tableRow${i}`}
            key={`bookNum${i + 1}`}
            htmlkey={`book${i}`}
            onClick={(event) =>{
              let index = event.target.parentNode.id.match(/\d+$/)[0];
              this.showBook(index)
            }}
          >
            <td>{bookLog[i].title}</td>
            <td className="dueDateCell" >{bookLog[i].due}</td>
          </tr>
        );
      
    }

    return ( 
      <div>

        <div id="userprofile">
        <div id="dateContainer">
          <span className="dateText" >{new Date().toLocaleDateString()}</span>
        </div>
 
        <div id="searchBarContainer">
          <input id="tableSearchInput" placeholder="Search..." type="text" onChange={this.filterData}  />
        </div>

        <table id="currentBooksTable">
          <thead>
            <tr>
              <th>Book Title</th>
              <th className="dueDateCell" >Due Date</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            {[...tableRows]}
          </tbody>
        </table>

        {tableRows.length===0?<div id="libraryLinkCont">
          You have 0 books check out Go to <span onClick={this.libraryLink} >Library</span> to see whats available
        </div>:null}


        <div className="section">

          <div id="playlistContainer">
          </div>

          <audio id="musicPlayer" controls={true} autoPlay>
            <source src="" />
          </audio>

        </div>


        <div className="section">
          <div className="songForm">
            <p>Fill out these fields to upload a song to your playlist</p>
        
            <label htmlFor="songTitle">
              Title<br/>
              <input id="songFormTitle" type="text" name="songTitle"/>
            </label><br/>

            <label htmlFor="songArtist">
              Artist<br/>
              <input id="songFormArtist" type="text" name="songArtist"/>
            </label><br/><br/>

            
            <input id="songFormFile" type="file" name="songFile"/>
            <br/><br/>
              
            <input type="submit" onClick={this.sendSong} />
          </div>

        </div>



        </div>

        <div id="userprofile_responsive">
          
          <img id="profilePic_responsive" style={{"width":"100px","height":"100px", "borderRadius":"50%", "margin":"auto"}} src={placeholder} alt="" />

          <div id="greetingHeader_responsive">Welcome {this.state.user.name}<br/>{new Date().toLocaleDateString()}</div>

          <div id="contentContainer_responsive">

            {/* <div id="musicPlayer_responsive">
              <div id="playlistContainer_responsive"></div>
            

              <audio id="musicPlayer_responsive" controls={true} autoPlay>
               <source src="" />
              </audio>
            </div> */}

            <div id="currentBooksTable_responsive">
              <table id="currentBooksTable_responsive">

                <thead>
                  <tr>
                    <th className="titleHead">Book Title</th>
                    <th className="dateHead">Due Date</th>
                  </tr>
                </thead>

                <tbody id="tableBody_responsive">
                  {[...tableRows]}
                </tbody>

              </table>
            </div>  
          

            {tableRows.length===0?<div id="libraryLinkCont_responsive">
               You have 0 books check out Go to <span onClick={this.libraryLink} >Library</span> to see whats available
              </div>:null}

          </div>
          
          {/* <div id="navbar_responsive">
            <span className="active">Profile</span>
            <span onClick={this.props.changePage}>Library</span>
            <span onClick={this.props.changePage}>Settings</span>
            <span onClick={this.props.changePage}>Donate</span>
            <Link to="/"><span onClick={this.props.logout}>Log Out</span></Link>

          </div> */}

          <div id="dropdownMenu">

            <div className="dropdownOption" onClick={this.props.changePage}>Library</div>
            <div className="dropdownOption" onClick={this.props.changePage}>Settings</div>
            <div className="dropdownOption" onClick={this.props.changePage}>Donate</div>
            <Link to="/"><div className="dropdownOption" onClick={this.props.logout}>LogOut</div></Link>
            <div className="active" onClick={this.showDropdownOptions}>☰ Profile</div>
          </div>

        </div>

        <div id="bookModalContainer">
          {
          this.state.bookInfo===""? 
          <div/>:
          <BookModal user={this.state.user} info={this.state.bookInfo} books={this.state.books} bookReturn={this.props.bookReturn} refresh={this.componentDidUpdate} />}
        </div>

      </div>
     );
  }
}

export default UserProfile;


