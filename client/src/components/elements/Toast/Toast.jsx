import { useDispatch, useSelector } from 'react-redux'
import SuccessIcon from '../../../assets/icons/success'
import WarningIcon from '../../../assets/icons/warning'
import { hideToast } from '../../../store/toastSlice'
import './Toast.sass'

export const ToastType = {
    Warning: 'warning',
    Success: 'success',
}

const Toast = () => {
    const message = useSelector((state) => state.toast.toastMessage)
    const toastType = useSelector((state) => state.toast.toastType)
    const dispatch = useDispatch()

    const toastIcon = (toastType) => {
        switch (toastType) {
            case ToastType.Warning:
                return <WarningIcon color="yellow" size="16px" />
            case ToastType.Success:
                return <SuccessIcon color="white" size="16px" />
            default:
                return <></>
        }
    }

    return (
        <div className={`Toast type--${toastType}`}>
            {toastIcon(toastType)}
            <h4>{message}</h4>
            <h4
                className="Toast__closeButton"
                onClick={() => {
                    dispatch(hideToast())
                }}
            >
                X
            </h4>
        </div>
    )
}

export default Toast
