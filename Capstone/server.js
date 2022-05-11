
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("Mongoose");
// const fs = require("fs");
// const path = require("path");
// const bodyParser = require("body-parser");
// const { type } = require("os");
// const { time } = require("console");
const router = express.Router();
const PORT = process.env.PORT_URL;
const DB_PORT = process.env.MONGO_URI;
const { Schema } = mongoose;
const cors = require('cors');
// const { KeyObject } = require("crypto");
// const { response } = require("express");
// const { fileURLToPath } = require("url");

mongoose.connect(DB_PORT, {
  useUnifiedTopology:true,
  useNewUrlParser:true
});
let db = mongoose.connection;


app.use(cors())
app.use(express.json({limit:"50mb",extended:true, parameterLimit:50000}))
// app.use(express.json())


var entry = new Schema({
  commentator:String,
  comment:String
}, { _id: false, autoIndex: false });

var activity = new Schema({
  type:String,
  date:Date,
  user:String,
  due:String
}, { _id: false, autoIndex: false });

var book = new Schema({
  title:String,
  author:String,
  genre:String,
  comments:[entry],
  log:[activity],
  due:String
});

var preferSettings = new Schema({
  scheme:String,
  header_background:String,
  header_color:String,
  header_shadow:String,
  cont_back:String,
  nav_border:String,
  nav_background:String,
  nav_color:String,
  
},{ _id: false, autoIndex: false });

var song = new Schema({
  title:String,
  artist:String,
  file:String
},{ _id: false, autoIndex: false });


var user = new Schema({
  name:String,
  email:String,
  password:String,
  books:[book],
  img:String,
  playlist:[song],
  settings:preferSettings
});


var accounts = mongoose.model("cuentas", user );
var inventory = mongoose.model("libros", book );


db.once("open", () => {
  console.log("connected to db");

// this populates the libros collection if empty on start up
  inventory.countDocuments({}, (err, count) => {
    if (err) throw err;
    if (count === 0) {
      inventory.create([
        {
          title: "The Wisdom of Insecurity",
          author:"Alan W. Watts",
          genre:"philosophy",
          comments:[
            {
              commentator:"Library",
              comment:"This book is The Shit"
            }
          ],
          log:[
            {
              type:"IN",
              date:new Date(),
              user:"Librarian"
            }
          ],
          due:""
        },
        {
          title: "A New Earth",
          author:"Eckhart Tolle",
          genre:"philosophy",
          comments:[
            {
              commentator:"Library",
              comment:"Enlightening"
            }
          ],
          log:[
            {
              type:"IN",
              date:new Date(),
              user:"Library"
            }
          ],
          due:""
        },
        {
          title: "The Power of Now",
          author:"Eckhart Tolle",
          genre:"philosophy",
          comments:[],
          log:[
            {
              type:"IN",
              date:new Date(),
              user:"Library"
            }
          ],
          due:""
        },
        {
          title: "The Kybalion",
          author:"The Three Initiates",
          genre:"philosophy",
          comments:[
            {
              commentator:"Library",
              comment:"WTF"
            }
          ],
          log:[
            {
              type:"IN",
              date:new Date(),
              user:"Library"
            }
          ],
          due:""
        },
      ]);
    }
  });

// this populates the cuentas collection if empty on start up
  accounts.countDocuments({}, (err, count)=> {
    if(err) throw err;
    if(count === 0) {
      accounts.create([
        {
          name:"Villavicencio",
          email:"villavicencio@email.com",
          password:"test_123",
          books:[],
          img:"",
          playlist:[],
          settings:{
            scheme:"",
            header_background:"",
            header_color:"",
            header_shadow:"",
            cont_back:"",
            nav_border:"",
            nav_background:"",
            nav_color:"",
          }
        },
        {
          name:"Box",
          email:"box@email.com",
          password:"test_123",
          books:[],
          img:"",
          playlist:[],
          settings:{
            scheme:"",
            header_background:"",
            header_color:"",
            header_shadow:"",
            cont_back:"",
            nav_border:"",
            nav_background:"",
            nav_color:"",
          }
        },
        {
          name:"Franklin",
          email:"franklin@email.com",
          password:"test_123",
          books:[],
          img:"",
          playlist:[],
          settings:{
            scheme:"",
            header_background:"",
            header_color:"",
            header_shadow:"",
            cont_back:"",
            nav_border:"",
            nav_background:"",
            nav_color:"",
          }
        },
        {
          name:"Garcia",
          email:"garcia@email.com",
          password:"test_123",
          books:[],
          img:"",
          playlist:[],
          settings:{
            scheme:"",
            header_background:"",
            header_color:"",
            header_shadow:"",
            cont_back:"",
            nav_border:"",
            nav_background:"",
            nav_color:"",
          }
        }
      ])
    }
  })
});

app.route('/addSong')
// when a user adds a song to their playlist
  .post((req,res)=>{
    let id = req.body.userID;
    let title = req.body.title;
    let artist = req.body.artist;
    let file = req.body.file;
    console.log(id, title)

    accounts.findById(id)
      .then(data=>{
        // console.log(data)
        data.playlist.push({
          title:title,
          artist:artist,
          file:file
        });
        data.save();
        res.send("Song Upload Successful");
      }).catch(err=>{
        throw err
      })
    
  });

app.route('/deleteSong')
// when a user removes a song from their playlist
  .post((req,res)=>{
    let id = req.body.userID;
    let title = req.body.title;
    let artist = req.body.artist;
    let file = req.body.file;

    accounts.findById(id)
    .then(data=>{
      let songData ={
        title:title,
        artist:artist,
        file:file
      };
      data.playlist.pull(songData)
      data.save()
      res.send("Song Removed Successfully")
    }).catch(err=>{
      throw err
    })
  })

app.route('/logIn')
// login verification process
  .post((req,res)=>{
    let obj = {
      name:"",
      email:"",
      password:""
    }
    obj.name = req.body._username;
    obj.email = req.body._useremail;
    obj.password = req.body._userpassword;
    
    accounts.findOne({
      email:obj.email
    })
    .then(data=>{

      if(data===null){
        res.send("Invalid Account Info");
        return
      }
      accounts.findById({_id:data._id})
        .then(data=>{
          // console.log(data,"esto aqui")
        if(data.name!==obj.name){
          res.send("Incorrect Username");
          return
        }
        if(data.password!==obj.password){
          res.send("Incorrect Password");
          return
        }
        else{
          res.status(200).send(data)
        }
      }).catch(err=>{
          throw(err)
        })
    }).catch(err=>{
      throw err
    })


  })


app.route('/userprofile')
// when a user has not signed out and their browser refresh etc.
  .post((req,res)=>{
    let id = req.body.userID;
    accounts.findById(id)
      .then(data=>{
        console.log(data, "found")
        res.send(data)
      }).catch(err=>{
        throw err
      })
  })


app.route('/userAccountInfo/username')
// when user edits their username
  .post((req,res)=>{
    let newName = req.body.data.nombre;
    let userEmail = req.body.data.user.email;
    accounts.findOne({"email":userEmail})
      .then(data=>{
        data.name = newName
        data.save()
        res.send("Username Change Successful ")
      }).catch(err=>{
        throw err
      })
  })


app.route('/userAccountInfo/password')
// when user edits their password
  .post((req,res)=>{
    let newPassword = req.body.data.clave1;
    let userEmail = req.body.data.user.email;
  
    accounts.findOne({"email":userEmail})
      .then(data=>{
        data.password = newPassword
        data.save()
        res.send("Password Change Successful ")
      }).catch(err=>{
        throw err
      })
  })


app.route('/signUp')
// create a new library user account
  .post((req,res)=>{

    let obj = {
      name:"",
      email:"",
      password:""
    }
    obj.name = req.body._username;
    obj.email = req.body._useremail;
    obj.password = req.body._userpassword;

    accounts.create({
      name:obj.name,
      email:obj.email,
      password:obj.password,
      books:[],
      img:"",
      settings:{
        scheme:"",
        header_background:"",
        header_color:"",
        header_shadow:"",
        cont_back:"",
        nav_border:"",
        nav_background:"",
        nav_color:"",
      }
    }).then(response=>{
      res.send("Account Created. Please Log In.")
    }).catch(err=>{
      throw err
    })
    
  })


app.route('/bookInfo')
// grabs current data on certain book
  .post((req,res)=>{
    let obj = {
      title: req.body._title
    }

    inventory.findOne({
      title:obj.title
    }).then(data=>{
      // console.log(data,"esto aqui")
      if(data===null){
        res.send("Invalid Entry");
      }
      res.send(data)
    }).catch(err=>{
      throw err
    })
  })


app.route('/bookInfo/addComment')
// adds comment to certain book
  .put((req,res)=>{
    let obj = {
      commentator:req.body.commentator,
      comment:req.body.comment
    }
    let idNum=req.body.bookID;

    inventory.findById(idNum)
      .then(data=>{
        if(data===null){
          res.send("Invalid Entry");
        }
        data.comments.push(obj);
        data.save()
        // console.log(data)
        res.send(data)
      }).catch(err=>{
        throw err
      })
  })


app.route('/bookReturn')
// when user returns a book
  .post((req,res)=>{
    let id = req.body._id;
    let user = req.body._user;
    let userID = req.body._userID;
    let book = req.body._bookName;

    // update the book's activity log
    inventory.findOne({_id:id})
    .then(data=>{

      // update the user's account that just returned book
      accounts
        .findById(userID)
        .then((user) => {
          user.books.pull(data);
          user.save();
        })
        .catch((err) => {
          throw err;
        })

      data.log.push({
        type: "IN",
        date: new Date(),
        user: user,
      })
      data.due="";
      data.save();
      res.send("Book Returned Successfully");
    }).catch(err=>{
      throw err
    });



  })


app.route('/appLibrary')
// grabs all book documents
  .get((req,res)=>{
    inventory.find({})
      .then(data=>{
        if(data===null){
          res.send("Invalid Request")
        }
        res.send(data)
      }).catch(err=>{
        throw err
      })
  });


app.route('/bookDonation')
// when a user donates a book to library
  .post((req,res)=>{
    inventory.create(req.body)
      .then(ansr=>{
        res.send("Thank you for your Donation <3")
      }).catch(err=>{
        throw err
      })
  })

app.route('/appLibrary/checkOut')
// when user checks out book
  .post((req,res)=>{
    let bookID = req.body._id;
    let userID = req.body._userID;
    let user = req.body._user;

    function setDueDate(){
      let todayDate = new Date();
      let dueMonth = todayDate.getMonth()+1;
      todayDate.setMonth(dueMonth);
      return todayDate.toLocaleDateString()
    }
    let dueDate = setDueDate()
    console.log(dueDate)

    let activityEntry={
      type:"OUT",
      date:req.body._date,
      user:user,
      due:dueDate
    }

    // find the book to put into user's book array
    inventory.findById(bookID)
      .then(data=>{
        accounts.findById(userID)
          .then(user=>{
            data.log.push(activityEntry)
            data.due = dueDate
            data.save()
            user.books.push(data);
            user.save();
            res.send(user)
          }).catch(err=>{
            throw err
          })
      }).catch(err=>{
        throw err
      })
  })


app.route('/deleteUserAccount')
// when user deletes their account
  .post((req,res)=>{
    let email = req.body._useremail;
    
    // var idRemoval;

    accounts.findOne({"email":email})
      .then(data=>{
        data.books.map(elem=>{
          inventory.findById(elem._id)
            .then(book=>{
              book.log.push({
                type: "IN",
                date: new Date(),
                user: data.name,
              })
              book.save();
            }).catch(error=>{
              throw error
            })
        })
          accounts.deleteOne(
            { _id:data._id }, 
            function (err) {})
          res.send("User Account Deleted Successfully")
      }).catch(err=>{
        throw err
      });
  })
  

app.route('/uploadPicture')
// when user uploads new profile pic
  .post((req,res)=>{
    let file = req.body.file;
    let email = req.body.email;
    // console.log(file)

    accounts.findOne({"email":email})
      .then(account=>{
        account.img = file;
        account.save();
        res.send("File Upload Successful")
      }).catch(err=>{
        throw err
      });    
  })


app.route('/editProfile')
// when user edits their profile preferences settings
  .post((req,res)=>{
    let user_email = req.body.userEmail;
    var settings = {
      scheme:"",
      header_background:"",
      header_color:"",
      header_shadow:"",
      cont_back:"",
      nav_border:"",
      nav_background:"",
      nav_color:"",
    }

    function runThroughValues(obj){
      let changedKeys = Object.keys(obj);
      Object.keys(settings).map((key)=>{
        if(changedKeys.includes(key)){
          if(obj[key]!==''){
            settings[key] = obj[key]
          }
          else{return}
        }
      })
      return settings
    }

    function setSettings(obj){
      Object.keys(settings).map((key)=>{
        settings[key] = obj[key];
      })

    }


    accounts.findOne({"email":user_email})
      .then(data=>{
        setSettings(data.settings);
        runThroughValues(req.body);
        data.settings = settings;
        data.save()
        res.send("Preference Save Successful")
      }).catch(err=>{
        throw err
      })
    
  })




app.listen(PORT, (err)=>{
  if(err)throw err;
  console.log(`The Library App Server is on ${PORT} !`)
})





