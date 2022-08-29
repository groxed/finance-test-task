import { useSelector } from 'react-redux'
import ContentWrapper from './components/elements/ContentWrapper/ContentWrapper'
import Toast from './components/elements/Toast/Toast'
import Header from './components/Header/Header'
import TickersWrapper from './components/Tickers/TickersWrapper'
import TickersSocket from './components/TickersSocket/TickersSocket'

const App = () => {
    const isDisplayToast = useSelector((state) => state.toast.isDisplayToast)

    return (
        <>
            {isDisplayToast && <Toast />}
            <ContentWrapper>
                <TickersSocket />
                <Header />
                <TickersWrapper />
            </ContentWrapper>
        </>
    )
}

export default App
