import React from 'react'
import "../styles/Pages/NotificationPage.css"
import { NotificationsList } from '../Test Data/NotificationData'
import NotificationUnit from '../components/NotificationUnit'

function NotificationPage() {
  return (
    <div className='notification-page'>
      <div className="noti-header">Notifications</div>
      <div className='noti-list'>
          { NotificationsList.map(notification => (
            <NotificationUnit key={notification.id} img={notification.image} text={notification.text}/>
          ))
        }
      </div>
    </div>
  )
}

export default NotificationPage
