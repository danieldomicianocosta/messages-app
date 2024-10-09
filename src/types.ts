export interface Topic {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  icon: string;
}

export interface Message {
  id: string;
  topicName: string;
  text: string;
  timestamp: Date;
}