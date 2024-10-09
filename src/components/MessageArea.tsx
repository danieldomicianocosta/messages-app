import React, { useState } from 'react';
import styled from 'styled-components';
import { Topic, Message } from '../types';

const MessageAreaContainer = styled.div<{ isSidebarOpen: boolean }>`
  width: ${props => props.isSidebarOpen ? '70%' : '100%'};
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  transition: width 0.3s ease-in-out;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
`;

const TopicIcon = styled.span`
  font-size: 1.2em;
  margin-right: 10px;
`;

const TopicName = styled.h2`
  margin: 0;
  font-size: 1em;
  color: #333;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 6px 10px;
  margin-bottom: 6px;
  border-radius: 16px;
  background-color: #ffffff;
  align-self: flex-start;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  color: black;
  font-size: 0.8em;
`;

const InputArea = styled.div`
  display: flex;
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 0.9em;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4a4a9c;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
`;

interface MessageAreaProps {
  messages: Message[];
  selectedTopic: Topic | null;
  onSendMessage: (text: string) => void;
  isSidebarOpen: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  messages,
  selectedTopic,
  onSendMessage,
  isSidebarOpen,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <MessageAreaContainer isSidebarOpen={isSidebarOpen}>
      {selectedTopic && (
        <Header>
          <TopicIcon>{selectedTopic.icon}</TopicIcon>
          <TopicName>{selectedTopic.name}</TopicName>
        </Header>
      )}
      <MessagesContainer>
        {messages.map((message) => (
          <MessageBubble key={message.id}>
            {message.text}
          </MessageBubble>
        ))}
      </MessagesContainer>
      <InputArea>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type a message to publish..."
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <SendButton onClick={handleSend}>Publish</SendButton>
      </InputArea>
    </MessageAreaContainer>
  );
};

export default MessageArea;