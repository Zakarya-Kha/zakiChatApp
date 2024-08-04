
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import HomePage from './components/HomePage'
import Signup from './components/Signup'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import io from'socket.io-client'
import { setSocket } from './components/redux/socketSlice'
import { setOnlineUsers } from './components/redux/userSlice'
import { BASE_URL } from './main'

function App() {
 const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if(authUser){
      const socketio = io(`${BASE_URL}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser])
  
    

 

  const router = createBrowserRouter([
    {
      path: '/',
      element: < HomePage/>
    },
    {
      path: '/register',
      element: <Signup/>
    },
    {
      path: '/login',
      element: <Login/>
    },
  ])

  return (
    <div className='p-4 flex justify-center items-center h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
