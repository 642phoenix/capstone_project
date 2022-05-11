const profileReducer = (state={}, action)=>{

  let stateCopy

  switch(action.type){
      case "INIT":
        return action.payload
      case "LOG_OUT":
        return {}
      case "CHECK_OUT":
        stateCopy = state;
        stateCopy.books.push(action.payload);
        console.log(stateCopy)
        return stateCopy
      case "BOOK_RETURN":
        stateCopy = state;
        let indexOfBook = stateCopy.books.findIndex(book=>book.title===action.payload.title);
        stateCopy.books.splice(indexOfBook,1);
        console.log(stateCopy)
        return stateCopy
      default:
        return state;
  }
  
  };
  
  
  export default profileReducer