import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    availableTickerNames: ['AAPL', 'GOOGL', 'MSFT', 'FB', 'AMZN', 'TSLA'],
    fetchedTickers: [],
    trackingTickerNames: [],
}

export const tickerDataSlice = createSlice({
    name: 'tickerData',
    initialState,
    reducers: {
        setFetchedTickers: (state, action) => {
            state.fetchedTickers = action.payload.tickers
        },
        addTickerName: (state, action) => {
            const tickerSymbol = action.payload.tickerSymbol.toUpperCase()
            state.availableTickerNames = [
                ...state.availableTickerNames,
                tickerSymbol,
            ]
        },
        removeTickerName: (state, action) => {
            state.availableTickerNames = state.availableTickerNames.filter(
                (tickerSymbol) => tickerSymbol !== action.payload.tickerSymbol
            )
        },
        trackTicker: (state, action) => {
            state.trackingTickerNames = [
                ...state.trackingTickerNames,
                action.payload.tickerSymbol,
            ]
        },
        untrackTicker: (state, action) => {
            state.trackingTickerNames = state.trackingTickerNames.filter(
                (tickerSymbol) => tickerSymbol !== action.payload.tickerSymbol
            )
        },
    },
})

export const {
    setFetchedTickers,
    addTickerName,
    removeTickerName,
    trackTicker,
    untrackTicker,
} = tickerDataSlice.actions

export default tickerDataSlice.reducer
