import React from 'react'
import "../styles/NotificationUnit.css"
import logo from "../Data/Images/logo.png"

function NotificationUnit({img, text}) {
  return (
    <div className='noti-unit'>
      {console.log(img)}
        {img && (
            <img src={img === "../Data/Images/logo.png"?logo : img} alt="Notification Image" className="noti-img" />
        )}
        <p className="noti-text">{text}</p>

    </div>
  )
}

export default NotificationUnit
