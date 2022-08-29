import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFetchedTickers } from '../../store/tickerDataSlice'
import io from 'socket.io-client'
import { DEFAULT_FETCH_INTERVAL, SERVER_URL } from '../../utils/consts'

const socket = io.connect(SERVER_URL)

export const startConnection = (trackingTickers) => {
    socket.emit('start', DEFAULT_FETCH_INTERVAL, trackingTickers)
}

export const stopConnection = () => {
    socket.emit('disconnect')
}

export const updateTrackingTickers = (trackingTickers) => {
    socket.emit('updateTrackingTickers', trackingTickers)
}

export const changeTickerFetchInterval = (tickerFetchInterval) => {
    socket.emit('changeTickerFetchInterval', tickerFetchInterval)
}

const TickersSocket = () => {
    const trackingTickerNames = useSelector(
        (state) => state.tickerData.trackingTickerNames
    )
    const dispatch = useDispatch()

    useEffect(() => {
        if (socket) {
            startConnection(trackingTickerNames)
            socket.on('tickers', (tickers) => {
                dispatch(setFetchedTickers({ tickers }))
            })
        }
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (socket) {
            updateTrackingTickers(trackingTickerNames)
        }
    }, [trackingTickerNames])

    return <></>
}

export default TickersSocket
