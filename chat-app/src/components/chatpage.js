
import { useState, useEffect } from 'react';
import ChatInput from './input';
import { useAccount } from 'wagmi';
import StreamrClient from 'streamr-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [permission, setPermission] = useState([]);
  const { address, privateKey } = useAccount();
  const streamId = '0x19eC44500065557D91760b3424F05d5416704C8c/chat-app'; // Stream ID for the chat messages
  const { StreamPermission } = require('streamr-client');

  StreamPermission.PUBLISH;
  StreamPermission.SUBSCRIBE;
  StreamPermission.EDIT;
  StreamPermission.DELETE;
  StreamPermission.GRANT;
  // Initialize Streamr client
  const client = new StreamrClient({
    auth: {
      ethereum: window.ethereum,
    },
  });
  useEffect(() => {
    // Create or get the Streamr stream
    const createOrGetStream = async () => {
      try {
        const stream = await client.getStream(streamId);
        console.log('Stream exists:', stream);
      } catch (error) {
        console.log('Stream does not exist. Creating a new stream...');
        const createdStream = await client.createStream({ id: streamId });
        console.log('Stream created:', createdStream);
      }
    };

    createOrGetStream();
  }, [client, streamId]);

  useEffect(() => {
    // Subscribe to the Streamr stream
    const subscribeToStream = async () => {
      const stream = await client.subscribe(streamId, 
        (content, metadata) => { 
          const newMessage = {
            sender: content.sender,
            message: content.message,
          };
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          setPermission();
         },
        
      );
      
    };
    subscribeToStream();
   

    // Cleanup subscription when component unmounts
    return () => {
      client.unsubscribe(streamId);
    };
  }, [client, streamId]);

  const handleSendMessage = (message) => {
    // Publish message to the Streamr stream
    console.log('address ', address );
        console.log('Private key ', privateKey );
    client.publish(streamId, {
      sender: address,
      message: message,
    });
  };

  useEffect(() => {
    const grantPublicPermission = async () => {
      const stream = await client.getStream(streamId);
      await stream.grantPermissions( {
        public: true,
        permissions: [StreamPermission.PUBLISH, StreamPermission.SUBSCRIBE]
    });
      console.log('Public permission granted.');
    };

    grantPublicPermission();
  }, [client, streamId]);

  return (
    <div>
      {/* Render the messages */}
      {messages.map((msg, index) => (
        <div key={index}>
          <span>{msg.sender}: </span>
          <span>{msg.message}</span>
        </div>
      ))}

      {/* Render the input field */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
