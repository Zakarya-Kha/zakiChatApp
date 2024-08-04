import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUsers } from './redux/userSlice';
import { IoArrowBack } from "react-icons/io5";

const MessageContainer = () => {
  const { selectedUsers, authUser, onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const isOnline = onlineUsers?.includes(selectedUsers?._id);

  return (
    <div className='flex flex-col flex-1 md:w-[550px]'>
      {selectedUsers ? (
        <div className='md:flex-1 flex flex-col'>
          <div className="bg-zinc-700 flex items-center gap-3 text-white p-2 cursor-pointer">
            <button className="md:hidden" onClick={() => dispatch(setSelectedUsers(null))}>
              <IoArrowBack className="w-6 h-6" />
            </button>
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className="w-12 rounded-full">
                <img
                  src={selectedUsers?.profilePhoto}
                  alt="Profile"
                />
              </div>
            </div>
            <div>
              <h3>{selectedUsers?.fullName}</h3>
            </div>
          </div>
          <div className="divider"></div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        <div className='hidden md:block'>
          <div className='flex-1 flex  flex-col justify-center items-center'>
          <h1 className='text-3xl font-bold'>Hi! {authUser?.fullName}</h1>
          <p className='text-slate-200 font-semibold'>Let's start conversations</p>
        </div>
        </div>
      )}
    </div>
  );
}

export default MessageContainer;
