import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'

const HomePage = () => {
  return (
    <div  className='bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 flex 
               flex-col md:flex-row  '>
      <Sidebar/>
      <MessageContainer />
    </div>
  )
}

export default HomePage