import { useNotificationValue } from '../NotificationContext'

const Notification = () => {
  const notification = useNotificationValue()
  if (notification === null) {
    return null
  }

  if (notification.type === 'success'){
    return(
      <div className='success'>
        {notification.message}
      </div>
    )
  }
  return (
    <div className='error'>
      {notification.message}
    </div>
  )
}

export default Notification