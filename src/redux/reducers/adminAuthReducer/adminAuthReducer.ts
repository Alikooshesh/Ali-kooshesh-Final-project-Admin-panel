import {createSlice} from "@reduxjs/toolkit";

const init = {
    isLogin : false,
    userId: '',
    tokenId: '',
    fullName: '',
    phoneNumber: ''
}

const adminAuthReducer = createSlice({
    name : 'adminAuthReducer',
    initialState : init,
    reducers :{
        login : (state,action)=>{
            state.isLogin = true
            state.userId = action.payload.userId
            state.fullName = action.payload.fullName
            state.phoneNumber = action.payload.phoneNumber
            state.tokenId = action.payload.tokenId
        },
        logout : (state)=>{
            state.isLogin = false
            state.userId = ''
            state.fullName = ''
            state.phoneNumber = ''
            state.tokenId = ''
        }
    }
})

export const {login,logout} = adminAuthReducer.actions
export default adminAuthReducer.reducer