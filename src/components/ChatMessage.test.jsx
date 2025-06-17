import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatMessage from './ChatMessage.jsx';

const messageData = (isUser = true) => {
  return {
    text: 'Message text',
    isUser: isUser,
    sources: [
      {
        chunk: 'Chunk 1',
        title: 'Title 1',
        url: 'https://www.gov.uk/',
      },
      {
        chunk: 'Chunk 2',
        title: 'Title 2',
        url: 'https://www.gov.uk/',
      },
    ],
  };
};

test('renders default', () => {
  const container = render(<ChatMessage message={messageData()} />);
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
