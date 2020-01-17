import * as TODO_APIS from './constants';

export const setUserLogin = (data) => {
    return {
        type: TODO_APIS.SET_USER_LOGIN,
        data: data
    }
}

export const setUserMark = (data) => {
    return {
        type: TODO_APIS.SET_USER_MARK,
        data: data
    }
}