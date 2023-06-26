
import { useState, useEffect } from 'react';
import ChatInput from './input';
import { useAccount } from 'wagmi';
import StreamrClient from 'streamr-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { address, privateKey } = useAccount();
  const streamId = '/chat-app'; // Stream ID for the chat messages

  // Initialize Streamr client
  const client = new StreamrClient({
    // auth: {
    //   privateKey: privateKey,
    // },
  });

  // useEffect(() => {
  //   // Subscribe to the Streamr stream
  //   const subscribeToStream = async () => {
  //     const stream = await client.subscribe({
  //       stream: streamId,
  //     });

  

  //     stream.on('data', (data) => {
  //       const newMessage = {
  //         sender: data.sender,
  //         message: data.message,
  //       };
  //       setMessages((prevMessages) => [...prevMessages, newMessage]);
  //     });
  //   };

  //   subscribeToStream();

  //   // Cleanup subscription when component unmounts
  //   return () => {
  //     client.unsubscribe(streamId);
  //   };
  // }, [client, streamId]);

  useEffect(() => {
    // Create or get the Streamr stream
    const createOrGetStream = async () => {
      try {
        const stream = await client.getStream(streamId);
        console.log('Stream exists:', stream);
        await stream.grantPermissions({
          user: "0x387672310b58e4e0cf62f46a92eca83276407bcd",
          permissions: [StreamPermission.PUBLISH],
        });
      } catch (error) {
        console.log('Stream does not exist. Creating a new stream...');
        const createdStream = await client.createStream({ id: streamId });
        console.log('Stream created:', createdStream);
      }
    };

    createOrGetStream();
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
