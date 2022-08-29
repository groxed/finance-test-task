import './TickerChoiceItem.sass'

const TickerChoiceItem = ({ tickerSymbol, tickerAction, actionButtonText }) => {
    return (
        <div className="TickerChoiceItem">
            {tickerSymbol}
            <h6
                className="TickerChoiceItem__actionButton"
                onClick={() => tickerAction(tickerSymbol)}
            >
                {actionButtonText}
            </h6>
        </div>
    )
}

export default TickerChoiceItem
