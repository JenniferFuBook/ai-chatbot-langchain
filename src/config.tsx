import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`Let's talk`, {})],
  botName: 'AI Bot',
  customStyles: {
    botMessageBox: {
      backgroundColor: 'royalblue',
    },
    chatButton: {
      backgroundColor: 'gray',
    },
  },
};

export default config;
