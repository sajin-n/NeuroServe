'use client';

import React, { useEffect, useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'system';
  timestamp: string;
}

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  preventDefault(): void;
}

interface ChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
      h3: React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
      span: React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
      form: React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
      input: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
      button: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    }
  }
}

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    setIsConnecting(true);

    ws.onopen = () => {
      setSocket(ws);
      setIsConnecting(false);
      setMessages((prev: Message[]) => [...prev, {
        id: Date.now(),
        text: 'Connected to chat server',
        sender: 'system',
        timestamp: new Date().toISOString()
      }]);
    };

    ws.onmessage = (event: MessageEvent) => {
      const message = event.data;
      setMessages((prev: Message[]) => [...prev, {
        id: Date.now(),
        text: message,
        sender: 'system',
        timestamp: new Date().toISOString()
      }]);
    };

    ws.onerror = () => {
      setMessages((prev: Message[]) => [...prev, {
        id: Date.now(),
        text: 'Error connecting to chat server',
        sender: 'system',
        timestamp: new Date().toISOString()
      }]);
      setIsConnecting(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (socket && newMessage.trim()) {
      socket.send(newMessage);
      setMessages((prev: Message[]) => [...prev, {
        id: Date.now(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toISOString()
      }]);
      setNewMessage('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Real-time Chat</h3>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {isConnecting ? (
          <div className="flex justify-center items-center h-full">
            <LoadingSpinner />
          </div>
        ) : (
          messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white'
                    : msg.sender === 'system'
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                    : 'bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-white'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            type="submit"
            disabled={!socket || !newMessage.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}