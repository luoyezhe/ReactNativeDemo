import {
    ACCOUNT_LOGIN
} from "../ActionTypes";

export const login = (account) => ({
		type: ACCOUNT_LOGIN,
		account
})
