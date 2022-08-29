import TickerChoiceRow from './TickerChoiceRow/TickerChoiceRow'
import './Header.sass'
import { useState } from 'react'
import SettingsModal from '../SettingsModal/SettingsModal'
import SettingsIcon from '../../assets/icons/settings'
import { DEFAULT_FETCH_INTERVAL } from '../../utils/consts'

const Header = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)
    const [tickerFetchInterval, setTickerFetchInterval] = useState(
        DEFAULT_FETCH_INTERVAL
    )

    return (
        <>
            {isSettingsModalOpen && (
                <SettingsModal
                    handleClose={() => setIsSettingsModalOpen(false)}
                    tickerFetchInterval={tickerFetchInterval}
                    setTickerFetchInterval={setTickerFetchInterval}
                />
            )}
            <div className="Header">
                <h1 className="Header__title">Tickers</h1>
                <div
                    className="Header__settingsSection"
                    onClick={() => setIsSettingsModalOpen(true)}
                >
                    <SettingsIcon color="purple" size="16px" />
                    <h4>Settings...</h4>
                </div>
            </div>
            <TickerChoiceRow />
        </>
    )
}

export default Header
