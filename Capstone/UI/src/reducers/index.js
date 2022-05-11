import { combineReducers} from "redux";
import loggedReducer from "./loggedReducer";
import profileReducer from './profileReducer';

const rootReducer = combineReducers({

  logged:loggedReducer,
  user_data:profileReducer
  
});


export default rootReducer