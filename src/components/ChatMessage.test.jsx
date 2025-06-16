import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatMessage from './ChatMessage.jsx';
import { semantic } from '../api/semantic.js';

const messageData = (isUser = true) => {
  return {
    text: 'Message text',
    isUser: isUser,
    sources: semantic.results,
  };
};

test('renders default', () => {
  const container = render(<ChatMessage message={messageData} />);
  expect(container).toMatchSnapshot();
});

test('renders ai assistant message', () => {
  render(<ChatMessage message={messageData(false)} />);
  const messageContainer = screen.getByTestId('message-container');
  expect(messageContainer).toHaveClass('message assistant');
});

test('renders with context if contextual ai', () => {
  render(
    <ChatMessage
      message={{ ...messageData(), context: 'This is the context' }}
    />,
  );
  expect(screen.getByText('This is the context')).toBeVisible();
});
