import './App.css';
import React from 'react';
import MainContent from './components/MainContent/mainContent';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state={  }
  }

  render(){

    return(
      <div id="app-container">

        <MainContent 
          logIn={this.props.init_user}
          logOut={this.props.userLogOut}
          status={this.props.logged}
          checkOut={this.props.book_checkOut}
          bookReturn={this.props.book_return}
        />


      </div>
    )
  }
}

export default App;