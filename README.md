# HNG Stage 3 - AI Essay Bot Agent

This is an intelligent AI agent built for the HNG Internship (Stage 3). The agent, "EssayBot," is designed to act as an expert academic writing assistant. It understands user requests, writes high-quality essays on any given topic, and maintains conversational memory.

This project is built using **Mastra**, a TypeScript framework for AI agents, and is powered by **Google's Gemini Pro** model. It's designed to be integrated into the **Telex.im** platform using the A2A (Agent-to-Agent) protocol.

## Features

* **Intelligent Essay Generation**: Creates well-structured, multi-paragraph essays on demand.
* **Conversational Memory**: Remembers the context of the conversation using `@mastra/memory` to answer follow-up questions (e.g., "make that shorter," "write one on my favorite topic").
* **Persistent Storage**: Uses `@mastra/libsql` (SQLite) to store conversation history in a `mastra.db` file, allowing memory to persist between server restarts.
* **A2A Protocol Ready**: Exposes a standard A2A endpoint for seamless integration with Telex.im or other A2A-compliant platforms.
* **Custom Instructions**: The agent's behavior is guided by a detailed set of instructions, ensuring a formal tone and helpful, relevant responses.

---

## 1. Technology Stack

* **Framework**: [Mastra](https://mastra.ai/)
* **Language**: TypeScript
* **AI Model**: Google Gemini Pro (`gemini-pro`)
* **Memory**: `@mastra/memory`
* **Database**: `@mastra/libsql` (SQLite)
* **Platform Integration**: [Telex.im](https://telex.im/) (via A2A Webhook)
* **Deployment**: Railway (or any Node.js host)

---

## 2. Setup and Installation (Local)

Follow these steps to run the agent on your local machine.

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Get Google Gemini API Key**:
    * Go to [Google AI Studio](https://ai.google.dev/).
    * Create a new project and generate an API key.

4.  **Create `.env` File**:
    * Create a file named `.env` in the root of the project.
    * Add your Gemini API key to it:
    ```dotenv
    # .env file
    GOOGLE_GENERATIVE_AI_API_KEY=AIza...YOUR_API_KEY_HERE
    ```

---

## 3. Running Locally

Once set up, you can run the agent locally for testing.

1.  **Start the Dev Server**:
    ```bash
    npm run dev
    ```

2.  **Test in Mastra Playground**:
    * Your server will start, and the console will show the Playground URL.
    * Open **`http://localhost:4111`** in your browser.
    * You can now chat directly with your `essayBot` agent in this test environment.

    **Example Test:**
    * **User:** "My favorite topic is the fall of the Roman Empire."
    * *(Wait for response)*
    * **User:** "Please write me a 3-paragraph essay on my favorite topic."
    * *(The agent should use its memory and write the correct essay).*

---

## 4. Telex.im Integration

This agent is designed to be connected to Telex.im.

1.  **Expose Your Local Server (Testing)**:
    * While your server is running, open a **new terminal**.
    * Install and run `ngrok` to get a temporary public URL:
        ```bash
        npm install -g ngrok
        ngrok http 4111
        ```
    * Copy the public `https://...` URL provided by `ngrok`.

2.  **Deploy to Production (Permanent)**:
    * Push your project to GitHub.
    * Deploy it to **Railway**.
    * In your Railway project's **Variables** tab, add your `GOOGLE_GENERATIVE_AI_API_KEY` as a secret.
    * Use your permanent Railway URL (e.g., `https://my-agent.up.railway.app`).

3.  **Configure Telex Workflow**:
    * In Telex.im, create a new workflow and use the following JSON, replacing the `url` with your **ngrok (for testing)** or **Railway (for production)** URL.
    * The A2A endpoint path is `/a2a/agent/essayBot` (from the `name` property in `essay-agent.ts`).

    **Sample Workflow JSON:**
    ```json
    {
      "active": true,
      "category": "utilities",
      "description": "An AI assistant that writes high-quality essays.",
      "id": "essay_bot_agent_01",
      "long_description": "\n      You are \"EssayBot,\" an expert academic writing assistant.\n      Your sole purpose is to write clear, well-structured, and insightful essays on any topic the user provides...\n",
      "name": "EssayBot",
      "nodes": [
        {
          "id": "essay_bot_node_01",
          "name": "Essay Bot Agent",
          "parameters": {},
          "position": [
            800,
            -100
          ],
          "type": "a2a/mastra-a2a-node",
          "typeVersion": 1,
          "url": "https://<YOUR_PUBLIC_URL_HERE>/a2a/agent/essayBot"
        }
      ],
      "pinData": {},
      "settings": {
        "executionOrder": "v1"
      },
      "short_description": "Your personal AI essay writer."
    }