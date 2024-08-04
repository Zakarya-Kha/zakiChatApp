import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from './redux/messageSlice'
import { BASE_URL } from '../main'

const SendInput = () => {
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()
  const {selectedUsers} = useSelector((store) => store.user)
  const {messages} = useSelector((store) => store.message)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/message/send/${selectedUsers?._id}`, {message}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      console.log(res)
      dispatch(setMessages([...messages, res?.data?.newMessage]))
    } catch (error) {
      console.log(error)
    }

    setMessage("")
  }
  return (
    <div className='mt-5'>
      <form onSubmit={onSubmitHandler} className='flex' action="">
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder='send a message...' className='w-full p-2 outline-none ml-3   rounded-l-md' />
        <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-r-md'>Send</button>
      </form>
    </div>
  )
}

export default SendInput