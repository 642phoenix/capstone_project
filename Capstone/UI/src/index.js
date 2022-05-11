import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { connect, Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {createStore} from 'redux';
import rootReducer from "./reducers/index";
import {checkOutBook, intializeUser, logOut, returnBook} from "./actions/index";


  const store = createStore(rootReducer)


  const mapStateToProps = (state) =>{
    return state
  }

  const mapDispatchToProps = (dispatch) =>{
    return {
      userLogOut:function(){
        dispatch(logOut())
      },
      init_user:function(data){
        dispatch(intializeUser(data))
      },
      book_checkOut:function(payload){
        dispatch(checkOutBook(payload))
      },
      book_return:function(payload){
        dispatch(returnBook(payload))
      }
    }
  }

  // console.log(store.getState())

  function select(state){

    return state
    
  };

  let currValue = store.getState()
  function consoleState(){

    let preValue = currValue

    currValue = select(store.getState())

    if(preValue !== currValue){
    
      console.log(currValue, "updated")
    }
  }

  store.subscribe(consoleState)

  
  const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App)

      ReactDOM.render(
        <Provider store={store}>
          <Router>

            <Route path="/">
              <AppContainer />
            </Route>  

          </Router>,
        </Provider>,
      document.getElementById('root')
    );
  



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();