import React from 'react'
import { renderWithProviders } from '../utils/test-utils'
import TickerChoiceRow from '../components/Header/TickerChoiceRow/TickerChoiceRow'
import TickersWrapper from '../components/Tickers/TickersWrapper'
import { fireEvent } from '@testing-library/react'

describe('TickerChoiceRow Component', () => {
    test('display all available tickers as choice items', () => {
        const availableTickerNames = [
            'AAPL',
            'GOOGL',
            'MSFT',
            'FB',
            'AMZN',
            'TSLA',
        ]

        const { getAllByRole } = renderWithProviders(<TickerChoiceRow />, {
            preloadedState: {
                tickerData: {
                    availableTickerNames: availableTickerNames,
                    fetchedTickers: [],
                    trackingTickerNames: [],
                },
            },
        })

        const tickerChoiceButtons = getAllByRole('heading', { name: '+' })

        expect(tickerChoiceButtons.length).toBe(availableTickerNames.length)
    })

    test('not display available tickers as choice items if they are tracked', () => {
        const availableTickerNames = [
            'AAPL',
            'GOOGL',
            'MSFT',
            'FB',
            'AMZN',
            'TSLA',
        ]
        const trackingTickerNames = ['MSFT', 'FB']

        const { getAllByRole } = renderWithProviders(<TickerChoiceRow />, {
            preloadedState: {
                tickerData: {
                    availableTickerNames: availableTickerNames,
                    fetchedTickers: [],
                    trackingTickerNames: trackingTickerNames,
                },
            },
        })

        const choiceItemsQuantity = availableTickerNames.filter(
            (ticker) => !trackingTickerNames.includes(ticker)
        ).length
        const tickerChoiceButtons = getAllByRole('heading', { name: '+' })

        expect(tickerChoiceButtons.length).toBe(choiceItemsQuantity)
    })
})
