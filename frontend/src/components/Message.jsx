import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'


const Message = ({message}) => {
  const {authUser, selectedUsers} = useSelector((store) => store.user)
  const scroll = useRef()
  useEffect(() => {
    scroll.current.scrollIntoView({ behavior:'smooth' })
  }, [message])


  

  
  
  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? "chat-end" : "chat-start"} `}>
  <div className="chat-image avatar">
    <div className="md:w-10  w-7 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUsers?.profilePhoto } />
    </div>
  </div>
  <div className="chat-header">
    
  <time className="text-xs opacity-50 text-white">{new Date(message?.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
  </div>
  <div className={`chat-bubble text-sm md:text-lg ${message?.senderId !== authUser?._id ? 'bg-gray-900 text-white' : 'bg-green-900 text-white'} `}>{message?.message}</div>
 
</div>
  )
}

export default Message