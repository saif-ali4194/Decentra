import React from 'react'
import "../styles/NotificationUnit.css"

function NotificationUnit({img, text}) {
  return (
    <div className='noti-unit'>
        {img && (
            <img src={img} alt="Notification Image" className="noti-img" />
        )}
        <p className="noti-text">{text}</p>

    </div>
  )
}

export default NotificationUnit
