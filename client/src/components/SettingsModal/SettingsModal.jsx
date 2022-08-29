import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTickerName,
    removeTickerName,
    untrackTicker,
} from '../../store/tickerDataSlice'
import { displayToast } from '../../store/toastSlice'
import { TickerNames } from '../../utils/consts'
import ContentWrapper from '../elements/ContentWrapper/ContentWrapper'
import TickerChoiceItem from '../elements/TickerChoiceItem/TickerChoiceItem'
import { ToastType } from '../elements/Toast/Toast'
import { changeTickerFetchInterval } from '../TickersSocket/TickersSocket'
import './SettingsModal.sass'

const SettingsModal = ({
    handleClose,
    tickerFetchInterval,
    setTickerFetchInterval,
}) => {
    const [newTicker, setNewTicker] = useState({
        tickerTitle: '',
        tickerSymbol: '',
    })

    const availableTickerNames = useSelector(
        (state) => state.tickerData.availableTickerNames
    )
    const trackingTickerNames = useSelector(
        (state) => state.tickerData.trackingTickerNames
    )
    const dispatch = useDispatch()

    const handleNewTickerInput = (e) => {
        setNewTicker({ ...newTicker, [e.target.name]: e.target.value })
    }
    const handleChangeTickerFetchInterval = (e) => {
        setTickerFetchInterval(e.target.value)
    }

    const submitNewTickerName = () => {
        const tickerTitle = newTicker.tickerTitle
        const tickerSymbol = newTicker.tickerSymbol.toUpperCase()

        if (!tickerSymbol.length) {
            dispatch(
                displayToast({
                    message: 'Please fill in ticker symbol',
                    type: ToastType.Warning,
                })
            )
        } else if (availableTickerNames.includes(tickerSymbol)) {
            dispatch(
                displayToast({
                    message: 'Duplicate ticker',
                    type: ToastType.Warning,
                })
            )
        } else {
            TickerNames[tickerSymbol] = tickerTitle.length
                ? tickerTitle
                : 'Unnamed ticker'
            dispatch(
                addTickerName({
                    tickerSymbol: tickerSymbol,
                })
            )
            setNewTicker({ tickerTitle: '', tickerSymbol: '' })
        }
    }

    const sendTickerDataInterval = () => {
        changeTickerFetchInterval(tickerFetchInterval)
        dispatch(
            displayToast({
                message: 'Successfully set fetch interval',
                type: ToastType.Success,
            })
        )
    }

    const removeTicker = (tickerSymbol) => {
        dispatch(removeTickerName({ tickerSymbol }))
        if (trackingTickerNames.includes(tickerSymbol))
            dispatch(untrackTicker({ tickerSymbol }))
    }

    return (
        <div className="SettingsModal__backdrop" onClick={handleClose}>
            <ContentWrapper stopPropagation={true}>
                <h1
                    className="SettingsModal__closeButton"
                    onClick={handleClose}
                >
                    x
                </h1>
                <div className="SettingsModal__content">
                    {/* Fetch interval */}
                    <h2 className="SettingsModal__content__settingRow__title">
                        Data fetching interval, ms
                    </h2>
                    <input
                        className="SettingsModal__content__settingRow__input--noUserInput"
                        type="number"
                        step="1000"
                        min="1000"
                        max="60000"
                        value={tickerFetchInterval}
                        onChange={handleChangeTickerFetchInterval}
                        onKeyDown={(e) => e.preventDefault()}
                    />

                    <span className="SettingsModal__content__settingRow__submitButton">
                        <h2
                            className="SettingsModal__content__settingRow__submitButton__text"
                            onClick={sendTickerDataInterval}
                        >
                            Set
                        </h2>
                    </span>

                    {/* Add new ticker */}
                    <h2 className="SettingsModal__content__settingRow__title">
                        Add a ticker
                    </h2>
                    <div className="SettingsModal__content__settingRow__tickerNameInputs">
                        <input
                            className="SettingsModal__content__settingRow__input"
                            name="tickerTitle"
                            placeholder="Ticker title"
                            value={newTicker.tickerTitle}
                            onChange={handleNewTickerInput}
                        />
                        <input
                            className="SettingsModal__content__settingRow__input"
                            name="tickerSymbol"
                            placeholder="Ticker symbol"
                            value={newTicker.tickerSymbol}
                            onChange={handleNewTickerInput}
                        />
                    </div>

                    <span className="SettingsModal__content__settingRow__submitButton">
                        <h2
                            className="SettingsModal__content__settingRow__submitButton__text"
                            onClick={submitNewTickerName}
                        >
                            Add
                        </h2>
                    </span>

                    {/* Available tickers */}
                    <h2 className="SettingsModal__content__settingRow__title">
                        Available tickers:
                    </h2>
                    <div className="SettingsModal__content__settingRow__tickerNamesContainer">
                        {!!availableTickerNames.length ? (
                            availableTickerNames.map((tickerSymbol, idx) => (
                                <TickerChoiceItem
                                    tickerSymbol={tickerSymbol}
                                    tickerAction={() =>
                                        removeTicker(tickerSymbol)
                                    }
                                    actionButtonText="x"
                                    key={idx}
                                />
                            ))
                        ) : (
                            <h3 className="SettingsModal__content__settingRow__tickerNamesContainer--noTickers">
                                No tickers yet.
                            </h3>
                        )}
                    </div>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default SettingsModal
