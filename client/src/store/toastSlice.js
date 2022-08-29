import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isDisplayToast: false,
    toastMessage: '',
    toastType: '',
}

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        displayToast: (state, action) => {
            state.isDisplayToast = true
            state.toastMessage = action.payload.message
            state.toastType = action.payload.type
        },
        hideToast: (state) => {
            state.isDisplayToast = false
            state.toastMessage = ''
            state.toastType = ''
        },
    },
})

export const { displayToast, hideToast } = toastSlice.actions

export default toastSlice.reducer
