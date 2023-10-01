import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

function App() {
  return (
    <Chatbot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
    />
  );
}

export default App;
