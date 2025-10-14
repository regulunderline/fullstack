import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  if (!notification) {
    return (<div></div>)
  }

  if (notification.type === 'success'){
    return(
      <div className='success'>
        {notification.message}
      </div>
    )
  } else if (notification.type === 'error') {
    return (
      <div className='error'>
        {notification.message}
      </div>
    )
  }
}

export default Notification