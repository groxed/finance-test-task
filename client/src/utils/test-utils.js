/* eslint-disable react/prop-types */
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import tickerDataReducer from '../store/tickerDataSlice'
import toastReducer from '../store/toastSlice'

export const setupStore = (preloadedState) => {
    return configureStore({
        reducer: {
            tickerData: tickerDataReducer,
            toast: toastReducer,
        },
        preloadedState,
    })
}

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        storeInternal = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={storeInternal}>{children}</Provider>
    }
    return {
        storeInternal,
        ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    }
}
