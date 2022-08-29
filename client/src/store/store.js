import { configureStore } from '@reduxjs/toolkit'
import tickerDataReducer from './tickerDataSlice'
import toastReducer from './toastSlice'

const store = configureStore({
    reducer: {
        tickerData: tickerDataReducer,
        toast: toastReducer,
    },
})

export default store
