import React from 'react';

export default function createContext<V>(initialValue?: V) {
  const Context = React.createContext<V | undefined>(initialValue);

  const useContext = () => {
    const contextValue = React.useContext(Context);
    if (contextValue === undefined) {
      throw Error('useContext must be used inside a Provider with a value');
    }
    return contextValue;
  };

  return [useContext, Context] as const;
}
