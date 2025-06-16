import {
  llmContextualSearch,
  llmRegularQuestion,
  semanticQuery,
} from './api.js';

const API_KEY =
  '7007cc48c38418581e069102c5a762e68bc70b21b5a4da0bd980ea430924750a';

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('semanticQuery', () => {
  it('should fetch data successfully for a given query', async () => {
    const mockResponseData = {
      results: [
        {
          chunk: 'Chunk',
          title: 'Semantic query title',
          url: 'https://www.gov.uk/test',
        },
      ],
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const query = 'test query';
    const result = await semanticQuery(query);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://13.43.178.119/semantic_query?query=test+query&n_chunks_to_return=5`,
      {
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should throw a generic error for non-422 API errors', async () => {
    const errorMessage = 'Internal Server Error';
    fetchMock.mockResponseOnce('Error', {
      status: 500,
      statusText: errorMessage,
    });

    const query = 'error query';
    await expect(semanticQuery(query)).rejects.toThrow(
      `API Error: 500 ${errorMessage}`,
    );
  });

  it('should throw a specific validation error for 422 API errors', async () => {
    const mockErrorResponse = {
      detail: [
        {
          loc: ['query', 'query'],
          msg: 'Missing parameter',
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), {
      status: 422,
      statusText: 'Unprocessable Entity',
    });

    const query = 'invalid query';
    await expect(semanticQuery(query)).rejects.toThrow(
      `API Error: Missing parameter {query,query}`,
    );
  });
});

describe('llmContextualSearch', () => {
  it('should fetch data successfully for a given query', async () => {
    const mockResponseData = {
      user: {
        role: 'user',
        content: 'What are the allies of the UK?',
      },
      assistant: {
        role: 'assistant',
        content: 'The allies include',
      },
      context: 'context',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const query = 'test query';
    const result = await llmContextualSearch(query);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://13.43.178.119/llm_contextual_search?query=test+query`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_history: [
            {
              role: 'user',
              content: query,
            },
          ],
        }),
      },
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should throw a generic error for non-422 API errors', async () => {
    const errorMessage = 'Internal Server Error';
    fetchMock.mockResponseOnce('Error', {
      status: 500,
      statusText: errorMessage,
    });

    const query = 'error query';
    await expect(llmContextualSearch(query)).rejects.toThrow(
      `API Error: 500 ${errorMessage}`,
    );
  });

  it('should throw a specific validation error for 422 API errors', async () => {
    const mockErrorResponse = {
      detail: [
        {
          loc: ['query', 'query'],
          msg: 'Missing parameter',
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), {
      status: 422,
      statusText: 'Unprocessable Entity',
    });

    const query = 'invalid query';
    await expect(llmContextualSearch(query)).rejects.toThrow(
      `API Error: Missing parameter {query,query}`,
    );
  });
});

describe('llmRegularQuestion', () => {
  it('should fetch data successfully for a given query', async () => {
    const mockResponseData = {
      user: {
        role: 'user',
        content: 'What is the population of Brazil?',
      },
      assistant: {
        role: 'assistant',
        content:
          'As of my last update in October 2023, the population of Brazil is estimated to be around 214 million people.',
      },
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponseData), {
      status: 200,
    });

    const query = 'test query';
    const result = await llmRegularQuestion(query);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://13.43.178.119/llm_regular_question?query=test+query`,
      {
        method: 'POST',
        headers: {
          'X-API-Key': API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_history: [
            {
              role: 'user',
              content: query,
            },
          ],
        }),
      },
    );
    expect(result).toEqual(mockResponseData);
  });

  it('should throw a generic error for non-422 API errors', async () => {
    const errorMessage = 'Internal Server Error';
    fetchMock.mockResponseOnce('Error', {
      status: 500,
      statusText: errorMessage,
    });

    const query = 'error query';
    await expect(llmRegularQuestion(query)).rejects.toThrow(
      `API Error: 500 ${errorMessage}`,
    );
  });

  it('should throw a specific validation error for 422 API errors', async () => {
    const mockErrorResponse = {
      detail: [
        {
          loc: ['query', 'query'],
          msg: 'Missing parameter',
        },
      ],
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockErrorResponse), {
      status: 422,
      statusText: 'Unprocessable Entity',
    });

    const query = 'invalid query';
    await expect(llmRegularQuestion(query)).rejects.toThrow(
      `API Error: Missing parameter {query,query}`,
    );
  });
});
