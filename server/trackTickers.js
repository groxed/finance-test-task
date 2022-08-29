let tickers = []

function randomValue(min = 0, max = 1, precision = 0) {
    const random = Math.random() * (max - min) + min
    return random.toFixed(precision)
}

function utcDate() {
    const now = new Date()
    return new Date(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours(),
        now.getUTCMinutes(),
        now.getUTCSeconds()
    )
}

function createTicker(ticker) {
    return {
        ticker,
        exchange: 'NASDAQ',
        price: randomValue(100, 300, 2),
        change: randomValue(-200, 200, 2),
        change_percent: randomValue(0, 1, 2),
        dividend: randomValue(0, 1, 2),
        yield: randomValue(0, 2, 2),
        last_trade_time: utcDate(),
    }
}

function getQuotes(socket) {
    if (!!tickers.length) {
        const quotes = tickers.map((ticker) => createTicker(ticker))
        socket.emit('tickers', quotes)
    }
}

function trackTickers(socket, fetchInterval, trackingTickers) {
    tickers = trackingTickers
    getQuotes(socket)
    let timer = setInterval(function () {
        getQuotes(socket)
    }, fetchInterval)

    socket.on('changeTickerFetchInterval', function (fetchInterval) {
        clearInterval(timer)
        timer = setInterval(function () {
            getQuotes(socket)
        }, fetchInterval)
    })
    socket.on('updateTrackingTickers', (trackingTickers) => {
        tickers = trackingTickers
    })

    socket.on('disconnect', function () {
        clearInterval(timer)
    })
}

module.exports = { trackTickers }
