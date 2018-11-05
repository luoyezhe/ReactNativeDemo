import {ACCOUNT_LOGIN} from '../action/account'
import {ACCOUNT_LOGOUT} from '../redux/action/account/logout'

export default account = (state = {}, action) => {

    switch (action.type) {
        case ACCOUNT_LOGIN:
            return action.account;
        case ACCOUNT_LOGOUT:
            return {}
    }
    return state;
}
