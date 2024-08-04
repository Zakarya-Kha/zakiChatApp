import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  const { messages } = useSelector((store) => store.message);
  
  // hooks
  useGetMessages();
  useGetRealTimeMessage();

  return (
    <div className='px-4 h-96 overflow-auto'>
      {
        messages?.length > 0 ? (
          messages.map((message, id) => (
            <Message key={id} message={message} />
          ))
        ) : (
          <p className='text-center text-2xl text-white '>No messages yet!</p>
        )
      }
    </div>
  );
};

export default Messages;
