// import { combineReducers } from 'redux';
import * as TODO_APIS from './constants'

// 全局state/flat
const defaultState = {
    logined: false, // 是否登录
    authMark: 0 // 登陆身份 
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case TODO_APIS.SET_USER_LOGIN:
            return Object.assign({}, state, {
                logined: action.data
            })

        case TODO_APIS.SET_USER_MARK:
            return Object.assign({}, state, {
                authMark: action.data
            })

        default:
            return state
    }
}