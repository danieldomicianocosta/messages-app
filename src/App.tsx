import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ContactList from './components/ContactList';
import MessageArea from './components/MessageArea';
import { Topic, Message } from './types';
import { mockQueue } from './mockQueue';

const AppContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setTopics([
      { id: '1', name: 'user.created', status: 'active', icon: '👤' },
      { id: '2', name: 'order.placed', status: 'inactive', icon: '🛒' },
      { id: '3', name: 'payment.processed', status: 'active', icon: '💳' },
      { id: '4', name: 'inventory.updated', status: 'active', icon: '📦' },
      { id: '5', name: 'email.sent', status: 'inactive', icon: '📧' },
      { id: '6', name: 'error.logged', status: 'inactive', icon: '⚠️' },
      { id: '7', name: 'data.synced', status: 'active', icon: '🔄' },
    ]);
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    const newMessages = mockQueue.readMessages(topic.name, 5);
    setMessages(newMessages);
  };

  const handleSendMessage = (text: string) => {
    if (selectedTopic) {
      const newMessage: Message = {
        id: Date.now().toString(),
        topicName: selectedTopic.name,
        text,
        timestamp: new Date(),
      };
      setMessages([...messages, newMessage]);
      mockQueue.enqueue(newMessage);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <AppContainer>
      <ContactList
        topics={topics}
        selectedTopic={selectedTopic}
        onSelectTopic={handleTopicSelect}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <MessageArea
        messages={messages}
        selectedTopic={selectedTopic}
        onSendMessage={handleSendMessage}
        isSidebarOpen={isSidebarOpen}
      />
    </AppContainer>
  );
};

export default App;