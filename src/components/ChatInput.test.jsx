import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatInput from './ChatInput';
import userEvent from '@testing-library/user-event';

describe('ChatInput', () => {
  it('should render the input field and send button', () => {
    const { container } = render(
      <ChatInput
        onSendMessage={jest.fn()}
        isLoading={false}
        searchMode="contextual"
        onModeChange={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('should update the input value when typed into', async () => {
    render(
      <ChatInput
        onSendMessage={() => {}}
        isLoading={false}
        searchMode="contextual"
        onModeChange={() => {}}
      />,
    );

    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'Hello world');
    expect(inputElement).toHaveValue('Hello world');
  });

  it('should call onSendMessage with the input value when send button is clicked', async () => {
    const mockOnSendMessage = jest.fn();
    render(
      <ChatInput
        onSendMessage={mockOnSendMessage}
        isLoading={false}
        searchMode="contextual"
        onModeChange={() => {}}
      />,
    );
    await userEvent.type(screen.getByRole('textbox'), 'Test message');
    await userEvent.click(screen.getByRole('button'));
    expect(mockOnSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('should call onModeChange when the mode selector value changes', async () => {
    const mockOnModeChange = jest.fn();
    render(
      <ChatInput
        onSendMessage={() => {}}
        isLoading={false}
        searchMode="contextual"
        onModeChange={mockOnModeChange}
      />,
    );

    await userEvent.selectOptions(screen.getByRole('combobox'), 'semantic');

    expect(mockOnModeChange).toHaveBeenCalledTimes(1);
    expect(mockOnModeChange).toHaveBeenCalledWith('semantic');
  });
});
