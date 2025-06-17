import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App Component End-to-End Tests', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  });

  const sendMessage = async (query) => {
    const inputElement = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');

    await userEvent.type(inputElement, query);
    await userEvent.click(sendButton);
  };

  it('should handle contextual AI search correctly', async () => {
    const userQuery = 'What is the UK cyber security strategy?';
    const aiResponseText =
      "The UK's cyber security strategy focuses on protecting critical national infrastructure and promoting cyber resilience.";

    fetchMock.mockResponseOnce(
      JSON.stringify({
        assistant: { content: aiResponseText },
        context: ['Some relevant document context here'],
      }),
      { status: 200 },
    );

    render(<App />);

    await sendMessage(userQuery);

    expect(screen.getByText(userQuery)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(aiResponseText)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/llm_contextual_search'),
      expect.any(Object),
    );
  });

  it('should handle semantic search correctly', async () => {
    const userQuery = 'Documents about naval defence equipment';
    const mockSemanticResults = [
      {
        chunk: 'Chunk 1',
        title: 'First title',
        url: 'https://www.gov.uk/government/statistics/uk-innovation-survey-2023-report/united-kingdom-innovation-survey-2023-report',
      },
    ];

    fetchMock.mockResponseOnce(
      JSON.stringify({
        results: mockSemanticResults,
      }),
      { status: 200 },
    );

    render(<App />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'semantic');

    await sendMessage(userQuery);

    expect(screen.getByText(userQuery)).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText(mockSemanticResults[0].title),
      ).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/semantic_query'),
      expect.any(Object),
    );
  });

  it('should handle direct AI questions correctly', async () => {
    const userQuery = 'What is the capital of France?';
    const aiResponseText = 'The capital of France is Paris.';

    fetchMock.mockResponseOnce(
      JSON.stringify({
        assistant: { content: aiResponseText },
      }),
      { status: 200 },
    );

    render(<App />);

    await userEvent.selectOptions(screen.getByRole('combobox'), 'regular');

    await sendMessage(userQuery);
    expect(screen.getByText(userQuery)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(aiResponseText)).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/llm_regular_question'),
      expect.any(Object),
    );
  });
});
