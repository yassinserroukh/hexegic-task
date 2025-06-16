const API_BASE_URL = 'https://13.43.178.119';
const API_KEY =
  '7007cc48c38418581e069102c5a762e68bc70b21b5a4da0bd980ea430924750a';

const createHeaders = () => ({
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json',
});

const handleResponse = async (response) => {
  if (!response.ok) {
    if (response.status === 422) {
      const error = await response.json();
      throw new Error(
        `API Error: ${error.detail[0].msg} {${error.detail[0].loc}}`,
      );
    } else {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  }
  return await response.json();
};

export const semanticQuery = async (query, nChunks = 5) => {
  const params = new URLSearchParams({
    query,
    n_chunks_to_return: nChunks.toString(),
  });

  const response = await fetch(`${API_BASE_URL}/semantic_query?${params}`, {
    headers: createHeaders(),
  });
  return handleResponse(response);
};

export const llmContextualSearch = async (query, chatHistory = []) => {
  const body = {
    chat_history: [
      ...chatHistory,
      {
        role: 'user',
        content: query,
      },
    ],
  };

  const params = new URLSearchParams({ query });

  const response = await fetch(
    `${API_BASE_URL}/llm_contextual_search?${params}`,
    {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(body),
    },
  );
  return handleResponse(response);
};

export const llmRegularQuestion = async (query, chatHistory = []) => {
  const params = new URLSearchParams({
    query,
  });
  const body = {
    chat_history: [
      ...chatHistory,
      {
        role: 'user',
        content: query,
      },
    ],
  };
  const response = await fetch(
    `${API_BASE_URL}/llm_regular_question?${params}`,
    {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(body),
    },
  );
  return handleResponse(response);
};
