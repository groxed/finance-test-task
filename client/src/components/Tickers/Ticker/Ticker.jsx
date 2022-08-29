import { useDispatch } from 'react-redux'
import { untrackTicker } from '../../../store/tickerDataSlice'
import { TickerNames } from '../../../utils/consts'
import Loader from '../../elements/Loader/Loader'
import './Ticker.sass'

const Ticker = ({ ticker, tickerSymbol }) => {
    const dispatch = useDispatch()

    return (
        <div className="Ticker">
            <h3 className="Ticker__name">
                {TickerNames[tickerSymbol]} ({tickerSymbol})
            </h3>
            <div className="Ticker__info">
                <h5
                    className="Ticker__unwatchTickerButton"
                    onClick={() =>
                        dispatch(
                            untrackTicker({
                                tickerSymbol,
                            })
                        )
                    }
                >
                    Untrack
                </h5>
                {ticker ? (
                    <>
                        <div className="Ticker__price">
                            <h3>${ticker.price}</h3>
                            {ticker.change > 0 ? (
                                <h3 className="Ticker__price-change--positive">
                                    ↑ {ticker.change} ({ticker.change_percent}%)
                                </h3>
                            ) : (
                                <h3 className="Ticker__price-change--negative">
                                    ↓ {ticker.change} ({ticker.change_percent}%)
                                </h3>
                            )}
                        </div>
                        <span>Exchange: {ticker.exchange}</span>
                        <span>
                            Dividend: {ticker.dividend}, yield: {ticker.yield}
                        </span>
                        <span>Last trade time: {ticker.last_trade_time}</span>
                    </>
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}

export default Ticker
