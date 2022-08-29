import { useSelector } from 'react-redux'
import Ticker from './Ticker/Ticker'
import './TickersWrapper.sass'

const TickersWrapper = () => {
    const tickers = useSelector((state) => state.tickerData.fetchedTickers)
    const trackingTickerNames = useSelector(
        (state) => state.tickerData.trackingTickerNames
    )

    return (
        <div className="TickersWrapper">
            {!!trackingTickerNames.length ? (
                trackingTickerNames.map((tickerSymbol, idx) => (
                    <Ticker
                        ticker={tickers.find(
                            (ticker) => ticker.ticker === tickerSymbol
                        )}
                        tickerSymbol={tickerSymbol}
                        key={idx}
                    />
                ))
            ) : (
                <h3 className="TickersWrapper--noTrackingTickers">
                    No tickers are being tracked right now.
                </h3>
            )}
        </div>
    )
} 

export default TickersWrapper
