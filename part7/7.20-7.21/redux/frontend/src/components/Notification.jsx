import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (!notification) {
    return (<div></div>)
  }

  if (notification.type === 'success'){
    return(
      <Alert severity="success">
        {notification.message}
      </Alert>
    )
  } else if (notification.type === 'error') {
    return (
      <Alert severity="error">
        {notification.message}
      </Alert>
    )
  }
}

export default Notification