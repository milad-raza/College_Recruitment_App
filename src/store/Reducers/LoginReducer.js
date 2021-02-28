import { changelogin } from '../Actions/ActionTypes';

const initialState = {
    login: false,
}

const LoginReducer = (state = initialState, action) => {
    switch(action.type){
        case changelogin: 
            return ({
                ...state,
                login: action.login
            })
        default :
            return state
    }

}

export default LoginReducer;