

export const logOut = () => {

  return {
    type:"LOG_OUT"
  }
}


export const intializeUser = (payload) => {

  return {
    type:"INIT",
    payload
  }
}

export const checkOutBook = (payload) =>{

  return{
    type:"CHECK_OUT",
    payload
  }
}

export const returnBook = (payload) =>{

  return{
    type:"BOOK_RETURN",
    payload
  }
}
