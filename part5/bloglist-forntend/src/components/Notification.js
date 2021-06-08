import React from 'react'
const Notification = ({ errorMessage }) => {
    if (errorMessage === null) {
      return null
    }
  
    return (
      <div className={errorMessage.type}>
        {errorMessage.text}
      </div>
    )
  }

  export default Notification
  