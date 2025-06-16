import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading, searchMode, onModeChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          type="text"
          className="input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button
          className="send-button"
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>

      <div className="settings">
        <div>
          Mode:
          <select
            className="mode-selector"
            value={searchMode}
            onChange={(e) => onModeChange(e.target.value)}
            disabled={isLoading}
          >
            <option value="contextual">Contextual AI</option>
            <option value="semantic">Semantic Search</option>
            <option value="regular">Direct AI</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
