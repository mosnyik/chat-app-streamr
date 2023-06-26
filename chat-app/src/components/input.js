import { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState();

  const handleChange = (event) => {
    setMessage(event.target.value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   if(message != undefined){ if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }}else if(message == undefined){
      window.alert('Message can not be empty')
    }
    setMessage('');
  };

  return (
    <form className="flex items-center space-x-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        value={message}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:bg-green-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;