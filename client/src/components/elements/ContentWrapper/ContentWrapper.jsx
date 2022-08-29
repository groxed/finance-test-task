import './ContentWrapper.sass'

const ContentWrapper = ({ stopPropagation, children }) => {
    return stopPropagation ? (
        <div className="ContentWrapper" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    ) : (
        <div className="ContentWrapper">{children}</div>
    )
}

export default ContentWrapper
