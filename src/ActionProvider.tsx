import React from 'react';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import {
  initializeAgentExecutorWithOptions,
  AgentExecutor,
} from 'langchain/agents';
import { SerpAPI } from 'langchain/tools';
import { Calculator } from 'langchain/tools/calculator';

const ActionProvider = ({ createChatBotMessage, setState, children }: any) => {
  const executor = React.useRef<AgentExecutor>();

  React.useEffect(() => {
    const init = async () => {
      const model = new ChatOpenAI({
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
        modelName: 'gpt-4',
        temperature: 0,
      });
      const tools = [
        new Calculator(),
        new SerpAPI(import.meta.env.VITE_SERPAPI_API_KEY),
      ];
      executor.current = await initializeAgentExecutorWithOptions(
        tools,
        model,
        {
          agentType: 'openai-functions',
          verbose: true,
        }
      );
    };

    init();
  }, []);

  const generateResponse = async (message: string) => {
    if (executor.current) {
      const response = await executor.current.call({ input: message });
      const botMessage = createChatBotMessage(response.output);

      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            generateResponse,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
