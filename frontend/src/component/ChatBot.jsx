import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTimes, FaPaperPlane, FaUser } from 'react-icons/fa';

function ChatBot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your financial assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Get user token from localStorage
      const userToken = localStorage.getItem('token');

      const response = await fetch('https://paytm-react-project-three.vercel.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          user_token: userToken
        })
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "Sorry, I couldn't process your request. Please try again.",
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, there was an error processing your request. Please try again later.",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    // Handle markdown-like formatting from the API response
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg shadow-xl w-full max-w-md h-[600px] flex flex-col border border-gray-700">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 rounded-t-lg flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <FaRobot className="mr-2 text-[#8fc5b8]" />
            <h3 className="text-lg font-semibold text-[#8fc5b8]">AI Assistant</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-800">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.isBot
                  ? 'bg-gray-700 text-white border border-gray-600'
                  : 'bg-[#8fc5b8] text-slate-800'
                  }`}
              >
                <div className="flex items-start">
                  {message.isBot && (
                    <FaRobot className="mr-2 mt-1 text-[#8fc5b8] flex-shrink-0" size={16} />
                  )}
                  {!message.isBot && (
                    <FaUser className="mr-2 mt-1 text-slate-800 flex-shrink-0" size={16} />
                  )}
                  <div>
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{
                        __html: formatMessage(message.text)
                      }}
                    />
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="mb-4 flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600">
                <div className="flex items-center">
                  <FaRobot className="mr-2 text-[#8fc5b8]" size={16} />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#8fc5b8] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#8fc5b8] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#8fc5b8] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="p-4 border-t border-gray-700 bg-gray-900 rounded-b-lg">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your finances..."
              className="flex-1 bg-slate-800 border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8fc5b8] focus:border-[#8fc5b8] placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-[#8fc5b8] text-slate-800 p-2 rounded-lg hover:bg-[#7db4a7] disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              <FaPaperPlane size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;