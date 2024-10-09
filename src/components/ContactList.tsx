import React from 'react';
import styled from 'styled-components';
import { Topic } from '../types';

const ContactListContainer = styled.div<{ isOpen: boolean }>`
  width: ${props => props.isOpen ? '30%' : '50px'};
  background-color: #4a4a9c;
  color: white;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;
  position: relative;
`;

const TopicItem = styled.div<{ isSelected: boolean; isOpen: boolean }>`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
  padding: 12px 15px;
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? '#3a3a7c' : 'transparent')};
  &:hover {
    background-color: ${(props) => (props.isSelected ? '#3a3a7c' : '#5a5aa6')};
  }
`;

const TopicIcon = styled.span`
  font-size: 1.2em;
  margin-right: 10px;
`;

const TopicInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TopicName = styled.span`
  font-weight: bold;
  font-size: 0.8em;
`;

const TopicStatus = styled.span`
  font-size: 0.7em;
  opacity: 0.7;
`;

const Header = styled.div<{ isOpen: boolean }>`
  display: flex;
  justify-content: ${props => props.isOpen ? 'space-between' : 'center'};
  align-items: center;
  padding: 12px 15px;
  background-color: #3f3f8f;
`;

const Title = styled.h1<{ isOpen: boolean }>`
  margin: 0;
  font-size: 1em;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  align-items: center;
`;

const AppIcon = styled.svg`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const MenuIcon = styled.span`
  font-size: 1.2em;
  cursor: pointer;
`;

interface ContactListProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const ContactList: React.FC<ContactListProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  isOpen,
  onToggle,
}) => {
  return (
    <ContactListContainer isOpen={isOpen}>
      <Header isOpen={isOpen}>
        <Title isOpen={isOpen}>
          <AppIcon viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19l3-3m0 0l-3-3m3 3H3" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </AppIcon>
          Event Mesh Topics
        </Title>
        <MenuIcon onClick={onToggle}>☰</MenuIcon>
      </Header>
      {topics.map((topic) => (
        <TopicItem
          key={topic.id}
          isSelected={selectedTopic?.id === topic.id}
          onClick={() => onSelectTopic(topic)}
          isOpen={isOpen}
        >
          <TopicIcon>{topic.icon}</TopicIcon>
          <TopicInfo>
            <TopicName>{topic.name}</TopicName>
            <TopicStatus>{topic.status}</TopicStatus>
          </TopicInfo>
        </TopicItem>
      ))}
    </ContactListContainer>
  );
};

export default ContactList;