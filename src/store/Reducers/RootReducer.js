import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer'

const Reducers = combineReducers({
    Login: LoginReducer,
})

export default Reducers;
