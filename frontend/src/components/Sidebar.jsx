import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUsers } from "./redux/userSlice";
import { setMessages } from "./redux/messageSlice";

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { otherUsers, selectedUsers, authUser } = useSelector((store) => store.user);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUsers(null));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find(user => 
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found!");
    }
  };

  return (
    <div className={`flex flex-col border-r border-slate-500 p-4 md:relative ${selectedUsers ? 'hidden md:flex' : 'flex'}`}>
      <form onSubmit={searchSubmitHandler} className='flex items-center gap-2'>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='input input-bordered rounded-md' 
          type="text"
          placeholder='Search...'
        />
        <button type='submit' className='btn bg-zinc-700 text-white'>
          <BiSearchAlt2 className='w-6 h-6 outline-none'/>
        </button>
      </form>
      <div className="divider px-3"></div> 
      <OtherUsers/> 
      <div className='mt-2'>
        {authUser ? (
          <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        ) : (
          <div className="flex flex-col justify-center items-center ">
            <p className="text-white">Your are not Authenticated! Please login your account THANK YOU</p>
            <button onClick={() => navigate("/login")} className='btn btn-sm mt-4'>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
