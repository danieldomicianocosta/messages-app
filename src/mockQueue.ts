import { Message } from './types';

class MockQueue {
  private queue: Message[] = [];

  enqueue(message: Message): void {
    this.queue.push(message);
  }

  readMessages(topicName: string, count: number): Message[] {
    const messages = this.queue
      .filter(msg => msg.topicName === topicName)
      .slice(-count);
    return messages;
  }

  generateMockMessages(topicName: string, count: number): Message[] {
    const mockMessages: Message[] = [];
    for (let i = 0; i < count; i++) {
      mockMessages.push({
        id: `mock-${Date.now()}-${i}`,
        topicName,
        text: `Mock message ${i + 1} for ${topicName}`,
        timestamp: new Date(Date.now() - (count - i) * 60000), // Simulating messages from the past
      });
    }
    return mockMessages;
  }

  readMessages(topicName: string, count: number): Message[] {
    let messages = this.queue.filter(msg => msg.topicName === topicName);
    if (messages.length < count) {
      const mockMessages = this.generateMockMessages(topicName, count - messages.length);
      messages = [...mockMessages, ...messages];
    }
    return messages.slice(-count);
  }
}

export const mockQueue = new MockQueue();