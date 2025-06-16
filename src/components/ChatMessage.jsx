import React from 'react';

const ChatMessage = ({ message }) => {
  const text = message?.text;
  const isUser = message?.isUser;
  const sources = message?.sources;
  const context = message?.context;
  return (
    <div
      className={`message ${isUser ? 'user' : 'assistant'}`}
      data-testid="message-container"
    >
      <div className="message-content">
        {text}

        {context && (
          <div className="context">
            <div className="context-title">Context Used:</div>
            <div className="context-content">{context}</div>
          </div>
        )}

        {sources && sources.length > 0 && (
          <div className="sources">
            <div className="sources-title">Sources:</div>
            {sources.map((source, idx) => (
              <div key={idx} className="source-item">
                <div className="source-title">{source.title || 'Document'}</div>
                <div className="source-content">{source.chunk}</div>
                {source.url && (
                  <div className="source-url">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Source
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
