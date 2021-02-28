import { changelogin } from './ActionTypes';

const changeLogin = (login) => {
    return (dispatch)=>{
        dispatch({type: changelogin, login:login})
    }
}

export default changeLogin;