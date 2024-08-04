import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuthUser } from './redux/userSlice';
import { BASE_URL } from '../main';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const onSubmitHandler =  async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://zaki-chat-app.vercel.app/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      // console.log(res)
      dispatch(setAuthUser(res.data))
      toast.success('Logged in successfully')
      navigate('/')
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    setUser({
      username: "",
      password: "",
    });
  }
  
  
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 p-6 max-w-md w-full">
        <div className="text-2xl font-bold mb-4">Login</div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className='mb-3'>
            <p>You don't have an account? <Link to="/register" className='text-blue-900 hover:text-blue-700'>SignUp</Link></p>
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
