import React from 'react';

const MessageParser = ({ children, actions }: any) => {

  const parse = (message: string) => {
    // generateResponse is defined in src/ActionProvider.tsx
    actions.generateResponse(message);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
