import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import ChatMessage from './components/ChatMessage.jsx';
import ChatInput from './components/ChatInput.jsx';
import {
  llmContextualSearch,
  llmRegularQuestion,
  semanticQuery,
} from './api/api.js';

function App() {
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('contextual');
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const performSearch = async (query) => {
    let response;
    let responseText = '';
    let sources = null;
    let context = null;

    switch (searchMode) {
      case 'contextual':
        response = await llmContextualSearch(query, chatHistory);
        responseText = response?.assistant?.content || 'No response received';
        context = response.context;
        break;

      case 'semantic':
        response = await semanticQuery(query);
        responseText = 'Found relevant document passages:';
        sources = response.results || [];
        break;

      case 'regular':
        response = await llmRegularQuestion(query, chatHistory);
        responseText = response.assistant?.content || 'No response received';
        break;

      default:
        throw new Error('Invalid search mode');
    }
    return { responseText, sources, context };
  };

  const handleSendMessage = async (query) => {
    setIsLoading(true);
    setError(null);

    const userMessage = {
      text: query,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const { responseText, sources, context } = await performSearch(query);
      const aiMessage = {
        text: responseText,
        isUser: false,
        sources,
        context,
      };
      setMessages((prev) => [...prev, aiMessage]);

      if (searchMode === 'contextual' || searchMode === 'regular') {
        setChatHistory((prev) => [
          ...prev,
          { role: 'user', content: query },
          { role: 'assistant', content: responseText },
        ]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      {error && <div className="error">Connection Error: {error}</div>}

      <div className="chat-container">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}

        {isLoading && (
          <div className="message assistant">
            <div className="message-content">
              <div className="loading">
                <div className="spinner"></div>
                Processing your query...
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        searchMode={searchMode}
        onModeChange={setSearchMode}
      />
    </div>
  );
}

export default App;
