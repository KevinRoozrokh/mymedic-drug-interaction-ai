
import React from 'react';
import { Message, Sender } from '../types';
import { UserIcon, MyMedicIcon } from './icons/Icons';

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

// A simple markdown to HTML converter
const formatText = (text: string) => {
    let formattedText = text;
    // Bold: **text** or __text__
    formattedText = formattedText.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
    // Italic: *text* or _text_
    formattedText = formattedText.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
    // Strikethrough: ~~text~~
    formattedText = formattedText.replace(/~~(.*?)~~/g, '<del>$1</del>');
    // Unordered lists: * item or - item
    formattedText = formattedText.replace(/^\s*([*-])\s+(.*)/gm, '<li>$2</li>');
    formattedText = formattedText.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    // Newlines
    formattedText = formattedText.replace(/\n/g, '<br />');
    return formattedText;
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.sender === Sender.USER;

  if (isLoading) {
      return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-med-green flex items-center justify-center text-white">
                <MyMedicIcon className="w-5 h-5" />
            </div>
            <div className="flex items-center space-x-1.5 mt-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
            </div>
        </div>
      );
  }

  return (
    <div className={`flex items-start space-x-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-med-green flex items-center justify-center text-white">
          <MyMedicIcon className="w-5 h-5" />
        </div>
      )}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`max-w-xl p-4 rounded-2xl ${
            isUser
              ? 'bg-med-blue text-white rounded-br-none'
              : 'bg-light-primary dark:bg-dark-secondary text-gray-800 dark:text-gray-200 rounded-bl-none'
          }`}
        >
          <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{ __html: formatText(message.text) }} />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 px-2">
          {message.timestamp}
        </span>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-dark-tertiary flex items-center justify-center text-gray-600 dark:text-gray-300">
          <UserIcon className="w-5 h-5" />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
