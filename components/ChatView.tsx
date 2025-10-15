
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Sender } from '../types';
import ChatMessage from './ChatMessage';
import { startChat } from '../services/geminiService';
import type { Chat } from '@google/genai';
import { PaperPlaneIcon, WarningIcon, MenuIcon } from './icons/Icons';

interface ChatViewProps {
    toggleSidebar: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ toggleSidebar }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    chatRef.current = startChat();
   setMessages([{
    id: 'initial-ai-message',
  text: "Hello! I am MyMedic AI chat, I was coded by <a href=\"http://kevinroozrokh.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-med-blue dark:text-med-green underline hover:no-underline\">Kevin Roozrokh</a>. I can provide information on medications, drug interactions, and health conditions. How can I help you today? \n\n_Please remember, I am an AI assistant and not a substitute for professional medical advice._",
    sender: Sender.AI,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [userInput]);

  const handleSendMessage = useCallback(async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput || isLoading || !chatRef.current) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedInput,
      sender: Sender.USER,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');

    try {
      const stream = await chatRef.current.sendMessageStream({ message: trimmedInput });
      
      let aiResponseText = '';
      const aiMessageId = (Date.now() + 1).toString();
      const aiMessageTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setMessages((prev) => [...prev, {
        id: aiMessageId,
        text: '',
        sender: Sender.AI,
        timestamp: aiMessageTimestamp,
      }]);

      for await (const chunk of stream) {
        aiResponseText += chunk.text;
        setMessages((prev) => prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: aiResponseText } : msg
        ));
      }

    } catch (error) {
      console.error("Error sending message:", error);
       setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please check your API key and network connection, then try again.",
        sender: Sender.AI,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-light-secondary dark:bg-dark-primary">
      <div className="p-4 border-b border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-primary/50 backdrop-blur-sm flex items-center">
        <button onClick={toggleSidebar} className="p-1 rounded-full hover:bg-light-tertiary dark:hover:bg-dark-tertiary mr-3 -ml-1 text-gray-500 dark:text-gray-400">
            <MenuIcon />
        </button>
        <h2 className="text-xl font-semibold">MyMedic Chat Artificial Intelligence</h2>
      </div>

       <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 p-3 text-sm border-b border-light-tertiary dark:border-dark-secondary">
          <WarningIcon />
          <p className="ml-3">
              MyMedic is an AI assistant. Always consult with qualified healthcare professionals for medical advice.
          </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isLoading && messages[messages.length-1].sender === Sender.USER && (
            <ChatMessage 
                message={{
                    id: 'loading',
                    text: '',
                    sender: Sender.AI,
                    timestamp: ''
                }}
                isLoading={true}
            />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-light-tertiary dark:border-dark-secondary bg-light-primary dark:bg-dark-secondary">
        <div className="flex items-end bg-light-tertiary dark:bg-dark-tertiary rounded-xl p-2">
          <textarea
            ref={textareaRef}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask MyMedic AI about medications, symptoms, or conditions..."
            className="flex-1 bg-transparent p-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none resize-none max-h-40"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading || !userInput.trim()}
            className="ml-2 p-3 rounded-lg bg-med-blue text-white disabled:bg-gray-400 dark:disabled:bg-dark-tertiary disabled:cursor-not-allowed transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-med-blue dark:focus:ring-offset-dark-secondary"
          >
            <PaperPlaneIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
