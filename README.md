# MOD Documentation Chat System

An intelligent AI-powered chat application that provides users with different levels of responses from UK government documents on cyber security, defence, and business topics. The system offers three distinct search modes to cater to different query types and user needs.

## Features

### Multiple Search Modes
- **Contextual AI**: Maintains conversation context for follow-up questions and natural dialogue
- **Semantic Search**: Finds and returns relevant document passages based on semantic similarity
- **Direct AI**: Provides direct answers without maintaining conversation context

## Endpoints

- `/semantic_query` - Returns responses based on semantic similarity
- `/llm_contextual_search` - Provides contextual AI responses with conversation memory
- `/llm_regular_question` - Delivers direct AI answers without context retention

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies for building, testing and running the react application

### `npm run dev`

Launches the react application on port 5173.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

This produces an application bundle that is suitable to be served over a static hosting service.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
