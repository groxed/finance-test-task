import { useDispatch, useSelector } from 'react-redux'
import { trackTicker } from '../../../store/tickerDataSlice'
import TickerChoiceItem from '../../elements/TickerChoiceItem/TickerChoiceItem'
import './TickerChoiceRow.sass'

const TickerChoiceRow = () => {
    const availableTickerNames = useSelector(
        (state) => state.tickerData.availableTickerNames
    )
    const trackingTickerNames = useSelector(
        (state) => state.tickerData.trackingTickerNames
    )
    const dispatch = useDispatch()

    const untrackedTickers = availableTickerNames.filter(
        (tickerSymbol) => !trackingTickerNames.includes(tickerSymbol)
    )

    return (
        <div className="TickerChoiceRow">
            <h2 className="TickerChoiceRow__title">
                Tickers available for tracking:
            </h2>
            <div className="TickerChoiceRow__availableTickers">
                {!!untrackedTickers.length ? (
                    untrackedTickers.map((tickerSymbol, idx) => (
                        <TickerChoiceItem
                            tickerSymbol={tickerSymbol}
                            tickerAction={() => {
                                dispatch(
                                    trackTicker({
                                        tickerSymbol,
                                    })
                                )
                            }}
                            actionButtonText="+"
                            key={idx}
                        />
                    ))
                ) : (
                    <h3 className="TickerChoiceRow__availableTickers--noTickers">
                        None (add some in settings)
                    </h3>
                )}
            </div>
        </div>
    )
}

export default TickerChoiceRow
