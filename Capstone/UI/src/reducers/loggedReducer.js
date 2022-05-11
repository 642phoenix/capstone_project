const loggedReducer = (state=false, action)=>{

  switch(action.type){
      case "INIT":
        return true
      case "LOG_OUT":
        return false
      default:
        return state;
  }
  
  };
  
  
  export default loggedReducer