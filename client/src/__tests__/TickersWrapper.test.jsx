import React from 'react'
import { renderWithProviders } from '../utils/test-utils'
import TickersWrapper from '../components/Tickers/TickersWrapper'
import { fireEvent } from '@testing-library/react'

describe('TickersWrapper Component', () => {
    test('render tracking tickers', () => {
        const trackingTickerNames = ['MSFT', 'FB']

        renderWithProviders(<TickersWrapper />, {
            preloadedState: {
                tickerData: {
                    fetchedTickers: [],
                    trackingTickerNames: trackingTickerNames,
                },
            },
        })

        const renderedTickers = document.getElementsByClassName('Ticker')

        expect(renderedTickers).toHaveLength(2)
    })

    test('untrack ticker on untrack button click', () => {
        const trackingTickerNames = ['MSFT', 'FB', 'AMZN', 'TSLA']

        renderWithProviders(<TickersWrapper />, {
            preloadedState: {
                tickerData: {
                    fetchedTickers: [],
                    trackingTickerNames: trackingTickerNames,
                },
            },
        })

        const unwatchButton = document.getElementsByClassName(
            'Ticker__unwatchTickerButton'
        )[0]

        fireEvent.click(unwatchButton)
        const renderedTickers = document.getElementsByClassName('Ticker')

        expect(renderedTickers).toHaveLength(3)
    })
})
